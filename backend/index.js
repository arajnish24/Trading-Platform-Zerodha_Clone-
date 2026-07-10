const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "zerodha_clone_secret_key_123";

const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/addHoldings", async (req, res) => {
//   try {
//     const tempHoldings = [
//       {
//         name: "BHARTIARTL",
//         qty: 2,
//         avg: 538.05,
//         price: 541.15,
//         net: "+0.58%",
//         day: "+2.99%",
//       },
//       {
//         name: "HDFCBANK",
//         qty: 2,
//         avg: 1383.4,
//         price: 1522.35,
//         net: "+10.04%",
//         day: "+0.11%",
//       },
//       {
//         name: "HINDUNILVR",
//         qty: 1,
//         avg: 2335.85,
//         price: 2417.4,
//         net: "+3.49%",
//         day: "+0.21%",
//       },
//       {
//         name: "INFY",
//         qty: 1,
//         avg: 1350.5,
//         price: 1555.45,
//         net: "+15.18%",
//         day: "-1.60%",
//         isLoss: true,
//       },
//       {
//         name: "ITC",
//         qty: 5,
//         avg: 202.0,
//         price: 207.9,
//         net: "+2.92%",
//         day: "+0.80%",
//       },
//       {
//         name: "KPITTECH",
//         qty: 5,
//         avg: 250.3,
//         price: 266.45,
//         net: "+6.45%",
//         day: "+3.54%",
//       },
//       {
//         name: "M&M",
//         qty: 2,
//         avg: 809.9,
//         price: 779.8,
//         net: "-3.72%",
//         day: "-0.01%",
//         isLoss: true,
//       },
//       {
//         name: "RELIANCE",
//         qty: 1,
//         avg: 2193.7,
//         price: 2112.4,
//         net: "-3.71%",
//         day: "+1.44%",
//       },
//       {
//         name: "SBIN",
//         qty: 4,
//         avg: 324.35,
//         price: 430.2,
//         net: "+32.63%",
//         day: "-0.34%",
//         isLoss: true,
//       },
//       {
//         name: "SGBMAY29",
//         qty: 2,
//         avg: 4727.0,
//         price: 4719.0,
//         net: "-0.17%",
//         day: "+0.15%",
//       },
//       {
//         name: "TATAPOWER",
//         qty: 5,
//         avg: 104.2,
//         price: 124.15,
//         net: "+19.15%",
//         day: "-0.24%",
//         isLoss: true,
//       },
//       {
//         name: "TCS",
//         qty: 1,
//         avg: 3041.7,
//         price: 3194.8,
//         net: "+5.03%",
//         day: "-0.25%",
//         isLoss: true,
//       },
//       {
//         name: "WIPRO",
//         qty: 4,
//         avg: 489.3,
//         price: 577.75,
//         net: "+18.08%",
//         day: "+0.32%",
//       },
//     ];

//     // Clear existing data (optional)
//     await HoldingsModel.deleteMany({});

//     // Convert percentage strings to numbers
//     const holdings = tempHoldings.map((item) => ({
//       ...item,
//       net: parseFloat(item.net),
//       day: parseFloat(item.day),
//     }));

//     await HoldingsModel.insertMany(holdings);

//     res.send("Holdings added successfully.");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err.message);
//   }
// });

// app.get("/addPositions", async (req, res) => {
//   try {
//     const tempPositions = [
//       {
//         product: "CNC",
//         name: "EVEREADY",
//         qty: 2,
//         avg: 316.27,
//         price: 312.35,
//         net: "+0.58%",
//         day: "-1.24%",
//         isLoss: true,
//       },
//       {
//         product: "CNC",
//         name: "JUBLFOOD",
//         qty: 1,
//         avg: 3124.75,
//         price: 3082.65,
//         net: "+10.04%",
//         day: "-1.35%",
//         isLoss: true,
//       },
//     ];

//     await PositionsModel.deleteMany({});

//     const positions = tempPositions.map((item) => ({
//       ...item,
//       net: parseFloat(item.net),
//       day: parseFloat(item.day),
//     }));

//     await PositionsModel.insertMany(positions);

//     res.send("Positions added successfully.");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err.message);
//   }
// });



// ----------------------
// GET ALL HOLDINGS
// ----------------------

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching holdings" });
  }
});

// ----------------------
// GET ALL POSITIONS
// ----------------------
app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching positions" });
  }
});

// ----------------------
// POST New Orders
// ----------------------
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode, token } = req.body;
    
    if (!name || qty === undefined || price === undefined || !mode) {
      return res.status(400).send("Missing required order fields");
    }

    const orderQty = Number(qty);
    const orderPrice = Number(price);
    const stockName = name.toUpperCase();
    const totalCost = orderQty * orderPrice;

    // 1. Authenticate user (token is required)
    if (!token) {
      return res.status(401).send("Authentication required to place orders");
    }

    let user = null;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      user = await UserModel.findById(decoded.userId);
    } catch (err) {
      return res.status(401).send("Invalid or expired session. Please log in again.");
    }

    if (!user) {
      return res.status(404).send("User profile not found.");
    }

    if (user.funds === undefined || user.funds === null) {
      user.funds = 100000;
      await user.save();
    }

    // 2. Validate and adjust funds
    if (mode === "BUY") {
      if (user.funds < totalCost) {
        return res.status(400).send("Insufficient funds to execute this trade. Total cost: ₹" + totalCost.toFixed(2));
      }
      user.funds -= totalCost;
      await user.save();
    } else if (mode === "SELL") {
      user.funds += totalCost;
      await user.save();
    }

    // 3. Save the transaction log (associated with userId)
    let newOrder = new OrdersModel({
      name: stockName,
      qty: orderQty,
      price: orderPrice,
      mode,
      userId: user._id,
    });
    await newOrder.save();

    // 4. Update holdings or positions in database to reflect ownership
    if (mode === "BUY") {
      // Check if user already has it in Holdings
      let holding = await HoldingsModel.findOne({ name: stockName });
      if (holding) {
        const oldTotalCost = holding.avg * holding.qty;
        const newTotalCost = oldTotalCost + (orderPrice * orderQty);
        holding.qty += orderQty;
        holding.avg = newTotalCost / holding.qty;
        await holding.save();
      } else {
        // If not in Holdings, check Positions
        let position = await PositionsModel.findOne({ name: stockName });
        if (position) {
          const oldTotalCost = position.avg * position.qty;
          const newTotalCost = oldTotalCost + (orderPrice * orderQty);
          position.qty += orderQty;
          position.avg = newTotalCost / position.qty;
          await position.save();
        } else {
          // If neither, create a new Position
          const newPos = new PositionsModel({
            product: "CNC",
            name: stockName,
            qty: orderQty,
            avg: orderPrice,
            price: orderPrice,
            net: 0,
            day: 0,
            isLoss: false
          });
          await newPos.save();
        }
      }
    } else if (mode === "SELL") {
      // Check if stock exists in Positions
      let position = await PositionsModel.findOne({ name: stockName });
      if (position && position.qty > 0) {
        if (position.qty >= orderQty) {
          position.qty -= orderQty;
          if (position.qty === 0) {
            await PositionsModel.deleteOne({ name: stockName });
          } else {
            await position.save();
          }
        }
      } else {
        // If not in Positions, update/decrease from Holdings
        let holding = await HoldingsModel.findOne({ name: stockName });
        if (holding && holding.qty > 0) {
          if (holding.qty >= orderQty) {
            holding.qty -= orderQty;
            if (holding.qty === 0) {
              await HoldingsModel.deleteOne({ name: stockName });
            } else {
              await holding.save();
            }
          }
        }
      }
    }

    res.send("Order placed successfully");
  } catch (err) {
    console.error("Order processing error:", err);
    res.status(500).send("Error placing order: " + err.message);
  }
});

// ----------------------
// GET ALL ORDERS
// ----------------------
app.post("/allOrders", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const allOrders = await OrdersModel.find({ userId: decoded.userId });
    res.json(allOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// ----------------------
// USER AUTHENTICATION
// ----------------------

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, username, email, password, mobile } = req.body;

    if (!name || !username || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists (by email, username, or mobile)
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username, Email, or Mobile number already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new UserModel({
      name,
      username,
      email,
      mobile,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Signup successful",
      token,
      username: newUser.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error during signup" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email, username, or mobile number
    const user = await UserModel.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername },
        { mobile: emailOrUsername }
      ],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error during login" });
  }
});

// Verify Token Route
app.post("/verifyToken", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ valid: false, message: "Token is required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ valid: true, username: decoded.username, userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
});

// ----------------------
// FUNDS MANAGEMENT
// ----------------------

// Get Funds Route
app.post("/getFunds", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.funds === undefined || user.funds === null) {
      user.funds = 100000;
      await user.save();
    }

    res.status(200).json({ funds: user.funds });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Add Funds Route
app.post("/addFunds", async (req, res) => {
  try {
    const { token, amount } = req.body;
    if (!token || amount === undefined) {
      return res.status(400).json({ message: "Token and amount are required" });
    }

    const fundAmount = Number(amount);
    if (isNaN(fundAmount) || fundAmount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.funds === undefined || user.funds === null) {
      user.funds = 100000;
      await user.save();
    }

    user.funds += fundAmount;
    await user.save();

    res.status(200).json({ message: "Funds added successfully", funds: user.funds });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Withdraw Funds Route
app.post("/withdrawFunds", async (req, res) => {
  try {
    const { token, amount } = req.body;
    if (!token || amount === undefined) {
      return res.status(400).json({ message: "Token and amount are required" });
    }

    const withdrawAmount = Number(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.funds === undefined || user.funds === null) {
      user.funds = 100000;
      await user.save();
    }

    if (user.funds < withdrawAmount) {
      return res.status(400).json({ message: "Insufficient funds for withdrawal" });
    }

    user.funds -= withdrawAmount;
    await user.save();

    res.status(200).json({ message: "Funds withdrawn successfully", funds: user.funds });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Serve static frontend and dashboard build directories

const frontendBuildPath = path.join(__dirname, "../frontend/build");
const dashboardBuildPath = path.join(__dirname, "../dashboard/build");

// Serve assets
app.use(express.static(frontendBuildPath));
app.use("/dashboard", express.static(dashboardBuildPath));

// Dashboard fallback
app.get("/dashboard/*splat", (req, res) => {
  res.sendFile(path.join(dashboardBuildPath, "index.html"));
});

// Frontend fallback
app.get("*splat", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });