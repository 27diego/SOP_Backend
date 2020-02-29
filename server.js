//load up all variables from enviroment file
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//express and middleware
const server = express();
server.use(bodyParser.json());

//connect to mongodb
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => {
  console.log(error);
});
db.once("open", () => {
  console.log("Connected to DB");
});

//controllers and routes
const User = require("./controllers/Users/User");

server.get("/", (req, res) => {
  res.json("Its Working");
});

server.post("/user", (req, res) => {
  User.createUser(req, res);
});

server.listen(3000 || process.env.PORT);
