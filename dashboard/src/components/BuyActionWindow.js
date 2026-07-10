import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import { API_URL } from "../config";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const stock = watchlist.find((s) => s.name.toUpperCase() === uid.toUpperCase());
  const singleSharePrice = stock ? stock.price : 0.0;

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(singleSharePrice);
  const generalContext = useContext(GeneralContext);

  const handleQtyChange = (e) => {
    const qtyVal = Number(e.target.value);
    setStockQuantity(qtyVal);
    // Automatically calculate and set total price in input field based on qty
    setStockPrice(qtyVal * singleSharePrice);
  };

  const handleBuyClick = () => {
    // Back-calculate the single share price to store standard values in the DB
    const customSinglePrice = stockQuantity > 0 ? (Number(stockPrice) / stockQuantity) : singleSharePrice;

    axios.post(`${API_URL}/newOrder`, {
      name: uid,
      qty: stockQuantity,
      price: customSinglePrice,
      mode: "BUY",
      token: localStorage.getItem("token"),
    }).then(() => {
      generalContext.triggerRefresh();
      generalContext.closeBuyWindow();
    }).catch((err) => {
      console.error("Error placing buy order:", err);
      generalContext.closeBuyWindow();
    });
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={handleQtyChange}
              value={stockQuantity}
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
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{Number(stockPrice).toFixed(2)}</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;