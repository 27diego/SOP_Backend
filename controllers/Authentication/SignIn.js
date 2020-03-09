const mongoUsers = require("../../model/Users");
const mongoLogin = require("../../model/Logins");
const bcrypt = require("bcrypt");

const handleSignIn = (req, res) => {
  const { username, password } = req.body;

  mongoLogin
    .findOne({ username })
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        mongoUsers
          .findOne({ username })
          .then(data => {
            res.json(data);
          })
          .catch(err => console.log(err));
      } else {
        res.json("invalid credentials");
      }
    })
    .catch(err => {
      console.log(err);
      res.json("user not found");
    });
};

module.exports = {
  handleSignIn
};
