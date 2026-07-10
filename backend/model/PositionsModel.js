const {model} = require("mongoose");

const { PositionsSchema } = require("../schemas/PositionsSchema");

const PositionsModel = new model("positions", PositionsSchema);

module.exports = { PositionsModel };

// const mongoose = require("mongoose");

// const PositionsSchema = new mongoose.Schema({
//   product: String,
//   name: String,
//   qty: Number,
//   avg: Number,
//   price: Number,
//   net: Number,
//   day: Number,
//   isLoss: {
//     type: Boolean,
//     default: false,
//   },
// });

// const PositionsModel = mongoose.model("positions", PositionsSchema);

// module.exports = { PositionsModel };