import mongoose from "mongoose";
import UserSchema from "../schema/user.js";

const User = mongoose.model('User', UserSchema);

module.exports = User;
