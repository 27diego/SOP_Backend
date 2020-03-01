const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  }
});

const CategoriesModel = mongoose.model("CategoriesModel", CategoriesSchema);

module.exports = CategoriesModel;
