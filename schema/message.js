import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  username: String,
  roomid: String,
  imgSrc: String,
  time: {
    type: Date,
    default: Date.now()
  },
  text: {
    type: String,
    default: ''
  }
});

UserSchema.static = {
  fetch: function (callback) {
    return this.find({}).sort('time').exec(callback);
  },
  findById: function (id, callback) {
    return this.findOne({_id: id}).exec(callback);
  }
};

