const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.json("Its Working");
});

server.listen(3000 || process.env.PORT);
