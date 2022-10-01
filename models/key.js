const mongoose = require("mongoose");

module.exports = mongoose.model(
  "key",
  new mongoose.Schema({
    key: String
  })
);