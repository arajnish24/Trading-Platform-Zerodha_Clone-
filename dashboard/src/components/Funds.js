import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const Funds = () => {
  const [funds, setFunds] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // UI states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("token");

  const fetchFunds = () => {
    if (!token) return;
    axios
      .post(`${API_URL}/getFunds`, { token })
      .then((res) => {
        setFunds(res.data.funds);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching funds:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  const handleAddFunds = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setErrorMsg("Please enter a valid amount.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/addFunds`, {
        token,
        amount: Number(amount),
      });
      setFunds(res.data.funds);
      setSuccessMsg(`Successfully added ₹${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })} to your account!`);
      setErrorMsg("");
      setAmount("");
      setShowAddForm(false);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error adding funds.");
    }
  };

  const handleWithdrawFunds = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setErrorMsg("Please enter a valid amount.");
      return;
    }

    if (Number(amount) > funds) {
      setErrorMsg("Insufficient funds for this withdrawal.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/withdrawFunds`, {
        token,
        amount: Number(amount),
      });
      setFunds(res.data.funds);
      setSuccessMsg(`Successfully withdrew ₹${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })} from your account!`);
      setErrorMsg("");
      setAmount("");
      setShowWithdrawForm(false);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error withdrawing funds.");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>Loading portfolio balances...</p>;
  }

  return (
    <>
      <div className="funds">
        <p style={{ marginRight: "15px", color: "#888", fontSize: "0.85rem" }}>Instant, zero-cost fund transfers with UPI </p>
        <button 
          className="btn btn-green" 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowWithdrawForm(false);
            setAmount("");
            setErrorMsg("");
          }}
          style={{ border: "none", cursor: "pointer", borderRadius: "3px" }}
        >
          Add funds
        </button>
        <button 
          className="btn btn-blue" 
          onClick={() => {
            setShowWithdrawForm(!showWithdrawForm);
            setShowAddForm(false);
            setAmount("");
            setErrorMsg("");
          }}
          style={{ border: "none", cursor: "pointer", borderRadius: "3px" }}
        >
          Withdraw
        </button>
      </div>

      {/* Message Notifications */}
      {successMsg && (
        <div style={{ padding: "12px", backgroundColor: "#f2faf5", color: "#2e8b57", border: "1px solid #e1f5eb", borderRadius: "4px", margin: "15px 0", fontSize: "0.9rem" }}>
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ padding: "12px", backgroundColor: "#fdf2f2", color: "#ec5959", border: "1px solid #fbe3e3", borderRadius: "4px", margin: "15px 0", fontSize: "0.9rem" }}>
          {errorMsg}
        </div>
      )}

      {/* Interactive Form for Add / Withdraw */}
      {(showAddForm || showWithdrawForm) && (
        <div style={{ background: "#fcfcfc", border: "1px solid #eaeaea", borderRadius: "6px", padding: "20px", margin: "20px 0" }}>
          <h4 style={{ margin: "0 0 15px 0", color: "#424242" }}>{showAddForm ? "Add Funds via UPI/Bank" : "Withdraw Funds to Bank Account"}</h4>
          <form onSubmit={showAddForm ? handleAddFunds : handleWithdrawFunds}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "1.2rem", color: "#555" }}>₹</span>
              <input
                type="number"
                placeholder="Enter amount (e.g. 5000)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "1rem", outline: "none" }}
                required
              />
              <button 
                type="submit"
                className={showAddForm ? "btn btn-green" : "btn-blue btn"}
                style={{ border: "none", cursor: "pointer", borderRadius: "3px", minWidth: "100px" }}
              >
                Confirm
              </button>
              <button 
                type="button" 
                className="btn btn-grey" 
                onClick={() => {
                  setShowAddForm(false);
                  setShowWithdrawForm(false);
                }}
                style={{ border: "none", cursor: "pointer", borderRadius: "3px" }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="row">
        <div className="col">
          <span>
            <p style={{ fontWeight: "600", fontSize: "1.1rem", color: "#424242" }}>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">₹{funds.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">₹0.00</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">₹{funds.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>₹{funds.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>₹0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>₹0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue" style={{ borderRadius: "3px" }}>Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;