const mongoLogin = require("../../model/Logins");
const bcrypt = require("bcrypt");

const createLogin = (username, password) => {
  let loginDetails = {};
  if (username !== "" && password !== "") {
    loginDetails = { username, password };
  }

  const login = new mongoLogin(loginDetails);

  login.save().catch(err => {
    console.log(err);
    return false;
  });

  return true;
};

module.exports = {
  createLogin
};
