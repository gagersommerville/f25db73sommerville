const mongoose = require("mongoose")

const mountainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  height: { type: Number, min: 1000, max: 30000 },
  range: { type: String }
});

module.exports = mongoose.model("Mountain", mountainSchema)