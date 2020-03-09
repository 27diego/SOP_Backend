const mongoUsers = require("../../model/Users");
const Login = require("./Login");

const createUser = (req, res) => {
  const {
    first_name,
    last_name,
    username,
    password,
    admin,
    department
  } = req.body;

  let userDetails = {};

  //check fields are filled up
  if (
    first_name !== "" ||
    last_name !== "" ||
    username !== "" ||
    password !== ""
  ) {
    userDetails = { first_name, last_name, username, admin, department };
  }

  mongoUsers
    .findOne({
      last_name: last_name,
      first_name: first_name,
      username: username
    })
    .then(user => {
      if (user) {
        res.json("User Exists");
      } else {
        const user = new mongoUsers(userDetails);
        const success = Login.createLogin(username, password);

        if (success) {
          res.json("User created");
          user
            .save()
            .then(user => {
              console.log("created user");
            })
            .catch(err => console.log(err));
        } else {
          res.json("error, user not created");
        }
      }
    })
    .catch(err => console.log(err));
};

const deleteUser = (req, res) => {
  const { first_name, last_name, username } = req.body;
  mongoUsers
    .findOneAndDelete({ first_name, last_name, username })
    .then(user => {
      res.json("deletion successful");
      Login.deleteLogin(username);
    })
    .catch(err => console.log(err));
};

const updateUserAdmin = (req, res) => {
  const { username, admin } = req.body;

  mongoUsers
    .findOneAndUpdate({ username }, { admin: admin }, { new: true })
    .then(user => res.json(user))
    .catch(err => {
      console.log(err);
    });
};

const getUser = (req, res) => {
  mongoUsers
    .findOne({ last_name: req.body.last_name })
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
};

const getUsers = (req, res) => {
  mongoUsers
    .find()
    .sort({ last_name: 1 })
    .then(users => res.json(users))
    .catch(err => console.log(err));
};

module.exports = {
  createUser,
  deleteUser,
  updateUserAdmin,
  getUser,
  getUsers
};
