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

  //rename file
  rename(file.path, title, sopDetails);
};

const deleteFile = (req, res) => {
  const { title } = req.body;

  mongoSOPS.findOneAndDelete({ title }).then(file => {
    fs.unlinkSync(file.location);
    res.json(title);
  });
};

const getFile = (req, res) => {
  const { name } = req.params;

  mongoSOPS
    .findOne({ title: name })
    .then(item => {
      const file = item.location;
      const data = fs.readFileSync(file);
      res.contentType("application/pdf");
      res.send(data);
    })
    .catch(err => console.log(err));
};

const rename = (path, title, sopDetails) => {
  const indexOfSlash = path.lastIndexOf("/");
  const indexOfDot = path.lastIndexOf(".");

  const prefix = path.substring(0, indexOfSlash + 1);
  const postFix = path.substring(indexOfDot);

  const newName = prefix + title + postFix;

  fs.renameSync(path, newName);

  transformFile(newName, sopDetails);
};

const transformFile = async (path, sopDetails) => {
  const data = await word2pdf(path);

  const indexOfDot = path.lastIndexOf(".");
  const finalName = path.substring(0, indexOfDot + 1) + "pdf";

  let error = false;

  fs.writeFile(finalName, data, err => {
    let success = false;
    if (err) {
      console.log(err);
      error = true;
    } else {
      sopDetails["location"] = finalName;
      const sop = new mongoSOPS(sopDetails);
      sop
        .save()
        .then(data => {
          success = true;
        })
        .catch(err => console.log(err));
    }
  });

  if (error === false) {
    fs.unlinkSync(path);
  }
};

const getFiles = (req, res) => {
  mongoSOPS
    .find()
    .then(files => {
      res.json(files);
    })
    .catch(err => console.log(err));
};

module.exports = {
  addFile,
  getFile,
  deleteFile,
  getFiles
};
