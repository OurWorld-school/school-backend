const mongoose = require("mongoose");

const ScratchcardSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true },
  pin: { type: String, required: true, unique: true },
  name: { type: String },
  // Add other fields as needed
});

const Scratchcard = mongoose.model("Scratchcard", ScratchcardSchema);

module.exports = Scratchcard;
