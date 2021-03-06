const mongoose = require("mongoose");

//create a schema that mongoose will map out to a mongodb model
const UsersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: false,
    unique: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  department: {
    type: String,
    default: ""
  }
});

//Virtual for user's full name
UsersSchema.virtual("name").get(() => {
  let fullName = "";
  if (this.first_name && this.last_name) {
    fullName = this.first_name + " " + this.last_name;
  } else {
    fullName = "";
  }
  return fullName;
});

//create the model -> 1st=name 2nd=schema
const UsersModel = mongoose.model("UsersModel", UsersSchema);

//export for future use
module.exports = UsersModel;
