const fs = require("fs");
const word2pdf = require("word2pdf");

const mongoSOPS = require("../../model/SopLibrary");
const multer = require("multer");

const addFile = (req, res) => {
  const { title, category, department } = req.body;
  const file = req.file;

  if ((title === "" || category === "", department === "")) {
    res.json("invalid form");
    return;
  }

  if (!file) {
    res.json("invalid file");
    return;
  }

  const location = file.path;

  sopDetails = { title, category, department, location };
  const sop = new mongoSOPS(sopDetails);

  sop
    .save()
    .then(data => {
      res.json("File Saved!");
    })
    .catch(err => console.log(err));

  //rename file

  rename(file.path, title);
};

const deleteFile = (req, res) => {
  const { title } = req.body;

  mongoSOPS.findOneAndDelete({ title }).then(user => fs.unlinkSync(user.path));
};

const getFile = (req, res) => {
  const { title } = req.body;

  mongoSOPS.findOne({ title }).then(user => {
    res.json(user);
  });
};

const rename = (path, title) => {
  const indexOfSlash = path.lastIndexOf("/");
  const indexOfDot = path.lastIndexOf(".");

  const prefix = path.substring(0, indexOfSlash + 1);
  const postFix = path.substring(indexOfDot);

  const newName = prefix + title + postFix;

  fs.renameSync(path, newName);

  transformFile(newName);
};

const transformFile = async path => {
  const data = await word2pdf(path);

  const indexOfDot = path.lastIndexOf(".");
  const finalName = path.substring(0, indexOfDot + 1) + "pdf";

  let error = false;

  fs.writeFileSync(finalName, data, err => {
    if (err) {
      console.log(err);
      error = true;
    }
  });

  if (error == false) {
    fs.unlinkSync(path);
  }
};

module.exports = {
  addFile,
  getFile
};
