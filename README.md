# Zerodha Clone (MERN Stack)

A premium, full-stack clone of **Zerodha**, one of India's leading stock broking platforms. This application replicates the client-facing marketing landing page (promotional site) and the interactive trading terminal (**Kite** clone). 

It is built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack, featuring robust JWT session guards, real-time transaction logging, dynamic funds deposits/withdrawals, user-specific portfolios, and context-driven auto-refresh events.

---

## 🏗️ Project Architecture & Hosting Models

This project supports two execution modes: **Local Development** (multi-port concurrent servers) and **Production Monolith** (a single unified server serving static assets, optimized for free cloud tiers like Render).

### 1. Production Monolith Architecture (Single Port)
In production, the Express backend serves as both the API server and the static file host for both React builds. This eliminates cross-origin resource sharing (CORS) complexities, reduces memory footprint, and binds to a single port.

```text
                        +----------------------------+
                        |  User Browser (Client)     |
                        +----------------------------+
                         /                          \
            Serves '/'  /                            \ Serves '/dashboard'
                       /                              \
         +--------------------------+    +--------------------------+
         |     frontend (Build)     |    |    dashboard (Build)     |
         |    (Marketing Pages)     |    |   (Kite Trading Portal)  |
         +--------------------------+    +--------------------------+
                       \                              /
                        \                            / REST API Requests
                         v                          v
                        +----------------------------+
                        |   Express Backend Server   |
                        |      (Single Port)         |
                        +----------------------------+
                                      |
                                      | Mongoose Queries
                                      v
                        +----------------------------+
                        |   MongoDB Atlas Database   |
                        +----------------------------+
```

### 2. Services Breakdown
1. **`frontend` (Public Marketing Portal)**: Recreates Zerodha's main landing pages (Home, About, Products, Pricing, Support, Sign Up / Log In).
2. **`dashboard` (Kite Trading Terminal)**: Recreates the trading portal where users monitor watchlist stocks, check holdings charts, track day positions, view orders, and manage funds.
3. **`backend` (API Server)**: Manages database connections, processes auth requests, performs order book transactions, and dynamically modifies wallets.

---

## 🌟 Key Features

### 🔐 1. Authentication & Route Guards
* **Secure Registration**: Signup form collects Full Name, Email, Username, Mobile Number, and Password (with client-side telephone formats and password confirmation matches).
* **BCrypt Password Hashing**: Passwords are securely hashed using `bcryptjs` before storage in MongoDB.
* **JWT Session Tokens**: Success logins issue a JSON Web Token (`jsonwebtoken`). Session tokens are passed securely to the dashboard console via URL parameters on redirection and saved in local storage.
* **Authentication Guards**: A route gate inside `Home.js` intercepts dashboard requests. If the token is invalid or missing, it alerts the user and redirects them back to the login page, blocking unauthorized access.

### 📈 2. Interactive Watchlist & Modals
* **Market Monitor**: Dynamic watchlist tracks stock changes (like `INFY`, `TCS`, `RELIANCE`) with color-coded percentage indices.
* **Instant Buy / Sell Modals**: Hovering watchlist stock cards opens Kite-style action sheets.
* **Smart Cost Calculators**: Entering the transaction quantity automatically computes and pre-fills the total transaction price inside the price input based on the stock's Last Traded Price (LTP).
* **Custom Limit Orders**: Users can manually override the calculated price. The modal back-calculates the price-per-share before posting it to the database to preserve standard portfolio averages.

### 💼 3. User-Specific Portfolio Management
* **User-Filtered Orders**: The **Orders** page fetches only the logged-in user's transaction history using their decoded JWT ID.
* **Welcome Screen for New Users**: If a new user signs up, the orders table is empty and renders a fallback welcome screen (`"You haven't placed any orders today"`).
* **Asset Holdings Visualizer**: The holdings page retrieves portfolio assets and generates a dynamic visual distribution bar chart using `Chart.js`.
* **Day Positions Ledger**: Day trades summary, daily returns, and P&L tracking.
* **Portfolio Check on Sell**: The Sell modal queries holdings and positions for the current user. It verifies ownership and restricts selling more shares than the user currently owns.

### 💰 4. Interactive Wallet & Funds Manager
* **Available Margins**: Balance tracking displaying disponible margins and cash limits in Indian Rupee format (`₹XX,XX,XXX.XX`).
* **Add Funds Portal**: Form to instantly deposit mock cash into the MongoDB user document.
* **Withdrawals Portal**: Form to withdraw funds. Validates withdraw limits to block withdrawing more cash than available.
* **Auto-Deductions**: Buying stocks automatically deducts the cash from the user's wallet. Selling stocks credits the proceeds back to their balance.
* **Self-Healing Wallets**: Automatically migrates and populates the starting balance (`₹1,00,000.00`) on older test accounts that don't have the `funds` field.

### 🔄 5. Context-Driven Auto Refresh
* Wrapped the entire dashboard router inside a unified React context provider (`GeneralContext.js`).
* Placing an order increments a global `refreshTrigger` state once the backend returns a `200` success response.
* The `Orders` and `Holdings` sections subscribe to this context trigger, automatically refreshing their tables instantly without requiring a full browser page reload.

---

## 📊 Mongoose Database Schemas

### 1. User Schema (`users` Collection)
```javascript
const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  funds: { type: Number, default: 100000 },
});
```

### 2. Orders Schema (`orders` Collection)
```javascript
const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  userId: { type: String, required: true },
});
```

### 3. Holdings Schema (`holdings` Collection)
```javascript
const HoldingsSchema = new Schema({
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: Number,
  day: Number,
});
```

### 4. Positions Schema (`positions` Collection)
```javascript
const PositionsSchema = new Schema({
  product: String,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: Number,
  day: Number,
  isLoss: Boolean,
});
```

---

## 🚀 Execution & Setup Guide

### Prerequisites
* **Node.js** (v16.x or higher)
* **MongoDB** (Atlas account or local instance)

### 1. Local Development Mode (Multi-Port Dev Servers)
Run this mode to enable hot-reloading for the frontend, dashboard, and backend:

1. **Clone the project** and navigate to the directory:
   ```bash
   npm install
   ```
2. **Setup environment variables**:
   Create a `.env` file in the `backend/` folder:
   ```env
   PORT=3002
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_signing_secret_key
   ```
3. **Launch the dev environment**:
   ```bash
   npm run dev
   ```
   This concurrently runs:
   * **Marketing Site** on `http://localhost:3000`
   * **Kite Trading Dashboard** on `http://localhost:3001` (configured with `BROWSER=none` to suppress duplicate browser tabs)
   * **Express Server** on `http://localhost:3002`

---

## ☁️ Render Production Deployment (Monolith Setup)

To deploy the entire project as a single Web Service on Render:

1. **Create a Render Web Service**:
   * **Root Directory**: Leave blank (root folder).
   * **Build Command**: `npm run build`
     *(This runs the root build script which recursively installs subfolder packages and generates production builds for the React apps).*
   * **Start Command**: `npm start`
     *(This runs `node backend/index.js` which serves the compiled static builds).*

2. **Add Environment Variables**:
   * `MONGO_URL`: *Your MongoDB Connection String*
   * `JWT_SECRET`: *A secure secret key for JSON Web Tokens*
   * `REACT_APP_API_URL`: *Leave blank (falls back to relative path)*
   * `REACT_APP_FRONTEND_URL`: *Leave blank (falls back to relative path)*
   * `REACT_APP_DASHBOARD_URL`: *Leave blank (falls back to `/dashboard`)*
