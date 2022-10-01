const mongoose = require("mongoose");

module.exports = mongoose.model(
  "auth",
  new mongoose.Schema({
    discord_id: String,
    logined: Boolean,
    userid: String
  })
);
