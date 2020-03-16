const mongoSOPS = require("../../model/SopLibrary");
const multer = require("multer");

const addFile = (req, res) => {
  const { title, category, department } = req.body;
  const file = req.file;

  if ((title === "" || category === "", department === "" || modified === "")) {
    res.json("invalid form");
    return;
  }

  if (!file) {
    res.json("invalid file");
    return;
  }

  const location = file.path;

  sopDetails = { title, category, department, location, modified };
  const sop = new mongoSOPS(sopDetails);

  sop
    .save()
    .then(data => {
      res.json("File Saved!");
    })
    .catch(err => console.log(err));
};

const getFile = (req, res) => {};

module.exports = {
  addFile,
  getFile
};
