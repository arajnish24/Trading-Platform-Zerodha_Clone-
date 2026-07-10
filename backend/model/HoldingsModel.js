const {model} = require("mongoose");

const {HoldingsSchema} = require("../schemas/HoldingsSchema");

const HoldingsModel = new model("holdings", HoldingsSchema);

module.exports = { HoldingsModel };

// const mongoose = require("mongoose");

// const HoldingsSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   qty: {
//     type: Number,
//     required: true,
//   },
//   avg: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   net: {
//     type: Number,
//     required: true,
//   },
//   day: {
//     type: Number,
//     required: true,
//   },
//   isLoss: {
//     type: Boolean,
//     default: false,
//   },
// });

// const HoldingsModel = mongoose.model("holdings", HoldingsSchema);

// module.exports = { HoldingsModel };