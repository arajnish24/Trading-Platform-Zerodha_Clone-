import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { API_URL, FRONTEND_URL } from "../config";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      // 1. Check for token in URL query params (passed after signup/login from frontend)
      const queryParams = new URLSearchParams(window.location.search);
      const urlToken = queryParams.get("token");

      let token = localStorage.getItem("token");

      if (urlToken) {
        // If token in URL, save it and clear the query parameters to keep URL clean
        localStorage.setItem("token", urlToken);
        token = urlToken;
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // 2. If no token found anywhere, redirect to frontend login
      if (!token) {
        setErrorMessage("Authentication required. Redirecting to login...");
        setTimeout(() => {
          window.location.href = `${FRONTEND_URL}/Signup`;
        }, 1500);
        return;
      }

      // 3. Verify the token with backend
      try {
        const response = await axios.post(`${API_URL}/verifyToken`, { token });
        if (response.data.valid) {
          setIsAuthenticated(true);
          localStorage.setItem("username", response.data.username);
        } else {
          throw new Error("Invalid token");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setErrorMessage("Session expired. Redirecting to login...");
        setTimeout(() => {
          window.location.href = `${FRONTEND_URL}/Signup`;
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading || errorMessage) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <h2 style={styles.loadingText}>
          {errorMessage || "Securing your trading environment..."}
        </h2>
        <p style={styles.subText}>Kite Trade Terminal • Zerodha Security Gateway</p>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

const styles = {
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#ffffff",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "3px solid #f3f3f3",
    borderTop: "3px solid #387ed1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  loadingText: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#424242",
    margin: "0 0 8px 0",
  },
  subText: {
    fontSize: "0.88rem",
    color: "#9b9b9b",
    margin: 0,
  },
  // Keyframes defined globally or in index.css
};

export default Home;