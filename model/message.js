import mongoose from "mongoose";
import MessageSchema from "../schema/message.js";

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
