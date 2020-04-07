//load up all variables from enviroment file
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

//express and middleware
const server = express();
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, "public")));
server.use("/file", express.static(path.join(__dirname, "SOPS")));
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("SOPS")) {
      fs.mkdirSync("SOPS", 0744);
    }
    cb(null, "SOPS");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

server.use(multer({ storage: fileStorage }).single("file"));

//connect to mongodb
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("Connected to DB");
});

//controllers and routes
const User = require("./controllers/Users/User");
const Login = require("./controllers/Users/Login");
const Files = require("./controllers/Files/File");
const Departments = require("./controllers/Types/Departments");
const Categories = require("./controllers/Types/Categories");
const SignIn = require("./controllers/Authentication/SignIn");

server.get("/", (req, res) => {
  res.json("Its Working");
});

//-----------Authentication---------
server.post("/signIn", (req, res) => {
  SignIn.handleSignIn(req, res);
});

//--------------USERS--------------

server.post("/user", (req, res) => {
  User.createUser(req, res);
});

server.get("/user", (req, res) => {
  User.getUser(req, res);
});

server.get("/user/all", (req, res) => {
  User.getUsers(req, res);
});

server.delete("/user", (req, res) => {
  User.deleteUser(req, res);
});

//update user
server.put("/user", (req, res) => {
  // switch (req.body.type) {
  //   case "Admin":
  User.updateUser(req, res);
  // default:
  //   return;
  // }
});

//update user credentials
server.put("/login", (req, res) => {
  switch (req.body.type) {
    case "password":
      Login.updateLoginPassword(req, res);
    default:
      return;
  }
});

//---------------TYPES-----------------

server.post("/department", (req, res) => {
  Departments.addDepartment(req, res);
});

server.delete("/department", (req, res) => {
  Departments.deleteDepartment(req, res);
});

server.get("/department/all", (req, res) => {
  Departments.getDepartments(req, res);
});

server.post("/category", (req, res) => {
  Categories.addCategory(req, res);
});

server.delete("/category", (req, res) => {
  Categories.deleteCategory(req, res);
});

server.get("/category/all", (req, res) => {
  Categories.getCategories(req, res);
});

//-----------------FILES----------------

server.post("/file", (req, res) => {
  Files.addFile(req, res);
});

server.delete("/file", (req, res) => {
  Files.deleteFile(req, res);
});

server.get("/file/:name", (req, res) => {
  Files.getFile(req, res);
});
server.get("/files", (req, res) => {
  Files.getFiles(req, res);
});

server.listen(3000 || process.env.PORT);
