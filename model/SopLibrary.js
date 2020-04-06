const mongoose = require("mongoose");

const SopLibrarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  modified: {
    type: Date,
    required: false,
    default: Date.now(),
  },
});

const SOPLibraryModel = mongoose.model("SOPLibraryModel", SopLibrarySchema);

module.exports = SOPLibraryModel;
