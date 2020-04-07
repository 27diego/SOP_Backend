const mongoUsers = require("../../model/Users");
const Login = require("./Login");

const createUser = (req, res) => {
  const {
    first_name,
    last_name,
    username,
    password,
    admin,
    department,
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
      username: username,
    })
    .then((user) => {
      if (user) {
        res.json("User Exists");
      } else {
        const user = new mongoUsers(userDetails);
        const success = Login.createLogin(username, password);

        if (success) {
          user
            .save()
            .then((user) => {
              res.json(user);
            })
            .catch((err) => console.log(err));
        } else {
          res.json("error, user not created");
        }
      }
    })
    .catch((err) => console.log(err));
};

const deleteUser = (req, res) => {
  const { first_name, last_name, username } = req.body;
  mongoUsers
    .findOneAndDelete({ first_name, last_name, username })
    .then((user) => {
      res.json(user.username);
      Login.deleteLogin(username);
    })
    .catch((err) => console.log(err));
};

const updateUser = (req, res) => {
  const {
    first_name,
    last_name,
    username,
    password,
    admin,
    department,
  } = req.body;
  mongoUsers
    .findOneAndUpdate(
      { username },
      {
        first_name: first_name,
        last_name: last_name,
        admin: admin,
        department: department,
      },
      { new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => console.log(err));

  if (password !== "") {
    Login.updateLoginPassword(username, password);
  }
};

const getUser = (req, res) => {
  mongoUsers
    .findOne({ last_name: req.body.last_name })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
};

const getUsers = (req, res) => {
  mongoUsers
    .find()
    .sort({ last_name: 1 })
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getUsers,
};
