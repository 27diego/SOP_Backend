const mongoose = require("mongoose");

const TypesSchema = new mongoose.Schema({
  departments: {
    type: [String]
  },
  categories: {
    type: [String]
  }
});

const TypesModel = mongoose.model("TypesModel", TypesSchema);

module.exports = TypesModel;
