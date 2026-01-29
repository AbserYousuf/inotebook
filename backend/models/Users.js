const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Recovery_Email: {
    type: String,
    lowercase: true,
    unique:true,
    trim: true,
  },
  resetOTP: {
    type: String,
  },
  resetOTPExpire: {
    type: Date,
  },
  resetOTPAttempts: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("user", UserSchema);
