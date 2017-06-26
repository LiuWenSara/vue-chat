const mongoose = require("mongoose");
const UserSchema = require("../schema/user.js");

const User = mongoose.model('User', UserSchema);

module.exports = User;
