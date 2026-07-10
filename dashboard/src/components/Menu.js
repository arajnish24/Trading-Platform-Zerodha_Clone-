import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FRONTEND_URL } from "../config";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = `${FRONTEND_URL}/signup`;
  };

  const username = localStorage.getItem("username") || "User";
  const avatarInitials = username.substring(0, 2).toUpperCase();

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick} style={{ position: "relative" }}>
          <div className="avatar">{avatarInitials}</div>
          <p className="username">{username}</p>
          
          {isProfileDropdownOpen && (
            <div className="profile-dropdown" style={dropdownStyle}>
              <div style={dropdownHeaderStyle}>
                <strong style={{ display: "block", color: "#333", fontSize: "0.85rem" }}>{username}</strong>
                <span style={{ fontSize: "0.75rem", color: "#888", display: "block" }}>Trader</span>
              </div>
              <hr style={{ margin: "5px 0", border: "0", borderTop: "1px solid #eee", height: "0" }} />
              <button onClick={handleLogout} style={logoutButtonStyle}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const dropdownStyle = {
  position: "absolute",
  top: "40px",
  right: "0",
  backgroundColor: "#fff",
  border: "1px solid #eaeaea",
  borderRadius: "6px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  padding: "10px",
  zIndex: 10,
  minWidth: "120px",
  textAlign: "left",
};

const dropdownHeaderStyle = {
  paddingBottom: "5px",
};

const logoutButtonStyle = {
  width: "100%",
  padding: "8px 10px",
  backgroundColor: "#ec5959",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "0.8rem",
  transition: "background-color 0.2s",
};

export default Menu;
