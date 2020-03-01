const mongoose = require("mongoose");

const DepartmentsSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    unique: true
  }
});

const DepartmentsModel = mongoose.model("DepartmentsModel", DepartmentsSchema);

module.exports = DepartmentsModel;
