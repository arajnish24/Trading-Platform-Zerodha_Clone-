import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_URL } from "../config";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshTrigger } = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post(`${API_URL}/allOrders`, { token })
      .then((res) => {
        setAllOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, [refreshTrigger]);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>Loading orders...</p>;
  }

  return (
    <div className="orders">
      {allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <h3 className="title">Orders ({allOrders.length})</h3>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Instrument</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Mode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order, index) => {
                  const modeClass = order.mode === "BUY" ? "profit" : "loss";
                  return (
                    <tr key={index}>
                      <td style={{ textAlign: "left", fontWeight: "500" }}>{order.name}</td>
                      <td>{order.qty}</td>
                      <td>₹{Number(order.price).toFixed(2)}</td>
                      <td className={modeClass} style={{ fontWeight: "600" }}>{order.mode}</td>
                      <td style={{ color: "#4caf50", fontWeight: "500" }}>Executed</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;