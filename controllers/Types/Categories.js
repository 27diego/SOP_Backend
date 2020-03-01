const mongoCategories = require("../../model/Categories");

const addCategory = (req, res) => {
  const { category } = req.body;

  mongoCategories
    .findOne({ category })
    .then(data => {
      if (data) {
        res.json("category already exists");
      } else {
        const Category = new mongoCategories({ category });
        Category.save()
          .then(data => res.json("category was saved"))
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

const deleteCategory = (req, res) => {
  const { category } = req.body;

  mongoCategories
    .findOneAndDelete({ category })
    .then(data => res.json("Category was deleted"))
    .catch(err => console.log(err));
};

const getCategories = (req, res) => {
  mongoCategories
    .find()
    .then(data => res.json(data))
    .catch(err => console.log(err));
};

module.exports = {
  addCategory,
  deleteCategory,
  getCategories
};
