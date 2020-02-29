const mongoUsers = require("../../model/Users");
const Login = require("./Login");

const createUser = (req, res) => {
  const { first_name, last_name, username, password, admin } = req.body;
  let userDetails = {};

  //check fields are filled up
  if (
    first_name !== "" &&
    last_name !== "" &&
    username !== "" &&
    password !== ""
  ) {
    userDetails = { first_name, last_name, username, admin };
  }

  const user = new mongoUsers(userDetails);
  user
    .save()
    .then(user => {
      console.log("created user");
    })
    .catch(err => console.log(err));

  const success = Login.createLogin(username, password);

  if (success) {
    res.json("User created");
  } else {
    res.json("error, user not created");
  }
};

const deleteUser = (req, res) => {};

const updateUser = (req, res) => {};

module.exports = {
  createUser
};
