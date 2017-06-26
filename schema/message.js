const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  username: String,
  roomid: String,
  imgsrc: String,
  time: {
    type: Date,
    default: Date.now()
  },
  text: {
    type: String,
    default: ''
  }
});

MessageSchema.static = {
  fetch: function (callback) {
    return this.find({}).sort('time').exec(callback);
  },
  findById: function (id, callback) {
    return this.findOne({_id: id}).exec(callback);
  }
};

module.exports = MessageSchema
