const mongoose = require("mongoose")

const mountainSchema = new mongoose.Schema({
  name: String,
  height: Number,
  range: String
});

module.exports = mongoose.model("Mountain", mountainSchema)