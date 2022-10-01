const mongoose = require("mongoose");

module.exports = mongoose.model(
  "register",
  new mongoose.Schema({
    discord_id: String,
    username: String,
    password: String,
    userid: String,
    logined: Boolean,
    money: Number
  },
  {
  timestamps: true 
  })
);
