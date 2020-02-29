const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");

const server = express();

server.use(bodyParser.json());
// server.use(multer({storage: "/SOPs", }))

server.get("/", (req, res) => {
  res.json("Its Working");
});

server.listen(3000 || process.env.PORT);
