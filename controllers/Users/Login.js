const mongoLogin = require("../../model/Logins");
const bcrypt = require("bcrypt");

const createLogin = (username, password) => {
  let loginDetails = {};
  if (username !== "" && password !== "") {
    const hashP = bcrypt.hashSync(password, 10);
    loginDetails = { username, password: hashP };
  } else {
    res.json("invalid form fields");
  }

  const login = new mongoLogin(loginDetails);

  login.save().catch((err) => {
    console.log(err);
    return false;
  });

  return true;
};

const deleteLogin = (username) => {
  mongoLogin
    .findOneAndDelete({ username })
    .then((login) => {
      console.log("deleted login");
    })
    .catch((err) => console.log(err));
};

const updateLoginPassword = (username, password) => {
  const hashP = bcrypt.hashSync(password, 10);
  mongoLogin
    .findOneAndUpdate(
      { username },
      { password: hashP },
      { new: true, useFindAndModify: false }
    )
    .then((user) => {
      console.log("Updated password");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createLogin,
  deleteLogin,
  updateLoginPassword,
};
