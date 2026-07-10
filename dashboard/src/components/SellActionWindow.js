import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import { API_URL } from "../config";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const stock = watchlist.find((s) => s.name.toUpperCase() === uid.toUpperCase());
  const initialPrice = stock ? stock.price : 0.0;

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(initialPrice);
  const [ownedQty, setOwnedQty] = useState(0);
  const [loading, setLoading] = useState(true);
  const [validationError, setValidationError] = useState("");
  
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const [holdingsRes, positionsRes] = await Promise.all([
          axios.get(`${API_URL}/allHoldings`),
          axios.get(`${API_URL}/allPositions`)
        ]);

        const holdings = holdingsRes.data || [];
        const positions = positionsRes.data || [];

        // Sum quantities for the current stock
        const holdingItem = holdings.find(h => h.name.toUpperCase() === uid.toUpperCase());
        const positionItem = positions.find(p => p.name.toUpperCase() === uid.toUpperCase());

        const hQty = holdingItem ? holdingItem.qty : 0;
        const pQty = positionItem ? positionItem.qty : 0;
        const totalOwned = hQty + pQty;

        setOwnedQty(totalOwned);
        
        if (totalOwned === 0) {
          setValidationError(`You do not own ${uid}. Sell option is disabled.`);
        } else {
          setValidationError("");
        }
      } catch (err) {
        console.error("Error verifying holdings/positions:", err);
      } finally {
        setLoading(false);
      }
    };

    checkOwnership();
  }, [uid]);

  const handleQtyChange = (val) => {
    const qty = Number(val);
    setStockQuantity(qty);
    // Automatically calculate and set total price in input field based on qty
    setStockPrice(qty * initialPrice);

    if (qty <= 0) {
      setValidationError("Quantity must be at least 1.");
    } else if (qty > ownedQty) {
      setValidationError(`Insufficient holdings. You only own ${ownedQty} shares of ${uid}.`);
    } else {
      setValidationError("");
    }
  };

  const handleSellClick = (e) => {
    if (validationError || stockQuantity > ownedQty || stockQuantity <= 0) {
      e.preventDefault();
      return;
    }

    // Back-calculate the single share price to store standard values in the DB
    const customSinglePrice = stockQuantity > 0 ? (Number(stockPrice) / stockQuantity) : initialPrice;

    axios.post(`${API_URL}/newOrder`, {
      name: uid,
      qty: stockQuantity,
      price: customSinglePrice,
      mode: "SELL",
      token: localStorage.getItem("token"),
    }).then(() => {
      generalContext.triggerRefresh();
      generalContext.closeSellWindow();
    }).catch((err) => {
      console.error("Error placing sell order:", err);
      generalContext.closeSellWindow();
    });
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="container sell-container" id="sell-window" draggable="true">
      <div className="header sell-header">
        <h3>Sell {uid}</h3>
        <div className="market-options">
          <label>CNC</label>
          <label>MIS</label>
        </div>
      </div>
      
      <div className="regular-order">
        {loading ? (
          <p style={{ textAlign: "center", color: "#888", fontSize: "0.9rem" }}>Checking holdings...</p>
        ) : (
          <>
            <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "10px" }}>
              Owned Quantity: <strong>{ownedQty}</strong> shares
            </div>

            {validationError && (
              <div style={{ color: "#ff5722", fontSize: "0.82rem", fontWeight: "600", marginBottom: "12px" }}>
                ⚠️ {validationError}
              </div>
            )}

            <div className="inputs">
              <fieldset>
                <legend>Qty.</legend>
                <input
                  type="number"
                  name="qty"
                  id="qty"
                  min="1"
                  max={ownedQty}
                  onChange={(e) => handleQtyChange(e.target.value)}
                  value={stockQuantity}
                  disabled={ownedQty === 0}
                />
              </fieldset>
              <fieldset>
                <legend>Price (Total)</legend>
                <input
                  type="number"
                  name="price"
                  id="price"
                  step="0.05"
                  onChange={(e) => setStockPrice(Number(e.target.value))}
                  value={stockPrice}
                  disabled={ownedQty === 0}
                />
              </fieldset>
            </div>
          </>
        )}
      </div>

      <div className="buttons">
        <span>Margin credit ₹{Number(stockPrice).toFixed(2)}</span>
        <div>
          <button 
            className="btn btn-red" 
            onClick={handleSellClick}
            disabled={loading || !!validationError || ownedQty === 0}
            style={{ opacity: (loading || !!validationError || ownedQty === 0) ? 0.5 : 1, cursor: (loading || !!validationError || ownedQty === 0) ? "not-allowed" : "pointer" }}
          >
            Sell
          </button>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
