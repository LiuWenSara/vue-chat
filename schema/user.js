const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_NUM = 10;
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  password: String,
  imgsrc: String,
  meta :{
    createAt: {
      default: Date.now(),
      type: Date
    },
    updateAt: {
      default: Date.now(),
      type: Date
    }
  }
});

UserSchema.pre('save',function (next) {
  const self = this;
  if(this.isNew){
    this.createAt = this.updateAt = Date.now();
  } else {
    this.updateAt = Date.now();
  }
  bcrypt.genSalt(SALT_NUM, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(self.password, salt, function(err, hash) {
      if (err) return next(err);
      self.password = hash;
      next();
    });
  });
});

UserSchema.methods = {
  isRight: function (_password, callback) {
    bcrypt.compare(_password, this.password, function (err, isMatch) {
      if (err) callback(err);
      callback(null, isMatch);
    })
  }
};
UserSchema.statics = {
  fetch: function (callback) {
    return this.find({}).sort('meta.updateAt').exec(callback);
  },
  findById: function (id, callback) {
    return this.findOne({_id: id}).exec(callback);
  }
};

module.exports = UserSchema
