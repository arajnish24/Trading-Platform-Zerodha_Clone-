const { model } = require("mongoose");
const { UserSchema } = require("../schemas/UserSchema");

const UserModel = new model("users", UserSchema);

module.exports = { UserModel };
