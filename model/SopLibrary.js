const mongoose = require("mongoose");

const SopLibrarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["chemical", "cleaning"],
    required: true
  },
  department: {
    type: String,
    enum: ["QA", "Packing", "Maintenance", "Safety", "Harvesting", "Growing"],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  modified: {
    type: Date,
    default: Date.now()
  }
});

const SOPLibraryModel = mongoose.model("SOPLibraryModel", SopLibrarySchema);

module.exports = SOPLibraryModel;
