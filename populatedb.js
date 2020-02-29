#! /usr/bin/env node

console.log(
  "This script populates some test users, logins, and categories instances into the database. Specified database as argument - e.g.: populatedb mongodb+srv://divegamaravilla:Salinas_22@mmsop-68taz.mongodb.net/sop_index?retryWrites=true&w=majority"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");

const Users = require("./model/Users");
const Logins = require("./model/Logins");
const Types = require("./model/Types");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let users = [];
let logins = [];
let typesArr = [];

const userCreate = (first_name, last_name, username, admin, cb) => {
  userdetails = { first_name, last_name, username, admin };
  const user = new Users(userdetails);
  user.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New User: ${first_name} ${last_name}`);
    users.push(user);
  });
};

const loginCreate = (username, password, cb) => {
  loginDetails = { username, password };
  const login = new Logins(loginDetails);
  login.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Login: ${username} ${password}`);
    logins.push(login);
  });
};

const typesCreate = (departments, categories, cb) => {
  typesDetails = { departments, categories };
  const types = new Types(typesDetails);
  types.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("new types created");
    typesArr.push(types);
  });
};

function createUsers(cb) {
  //first_name, last_name, username, admin, cb

  async.series(
    [
      function(callback) {
        userCreate("Diego", "Vega", "diego_vega", true, callback);
      },
      function(callback) {
        userCreate("Maritza", "Acevedo", "macevedo", true, callback);
      }
    ],
    // optional callback
    cb
  );
}

function createLogins(cb) {
  //username, password, cb
  async.series(
    [
      function(callback) {
        loginCreate("diego_vega", "montmush", callback);
      },
      function(callback) {
        loginCreate("macevedo", "montmush", callback);
      }
    ],
    // optional callback
    cb
  );
}

function createTypes(cb) {
  async.series(
    [
      function(callback) {
        typesCreate(
          ["QA", "Packing", "Growing"],
          ["chemical", "cleaning"],
          callback
        );
      }
    ],
    // optional callback
    cb
  );
}

async.series(
  [createUsers, createLogins, createTypes],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Instances: " + typesArr);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
