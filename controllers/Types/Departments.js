const mongoDepartments = require("../../model/Departments");

const addDepartment = (req, res) => {
  const { department } = req.body;

  mongoDepartments
    .findOne({ department })
    .then(data => {
      if (data) {
        res.json("department already exists");
      } else {
        const Department = new mongoDepartments({ department });
        Department.save()
          .then(data => {
            res.json("Department saved");
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

const deleteDepartment = (req, res) => {
  const { department } = req.body;

  mongoDepartments
    .findOneAndDelete({ department })
    .then(user => res.json("user deleted"))
    .catch(err => console.log(err));
};

const getDepartments = (req, res) => {
  mongoDepartments
    .find()
    .then(deps => {
      const departments = deps.map(item => item["department"]);
      res.json(departments);
    })
    .catch(err => console.log(err));
};

module.exports = {
  addDepartment,
  deleteDepartment,
  getDepartments
};
