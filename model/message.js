const mongoose = require("mongoose");
const MessageSchema = require("../schema/message.js");

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
