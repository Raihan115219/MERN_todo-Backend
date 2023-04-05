const ToDoModel = require("../models/ToDoModel");

module.exports.getToDo = async (req, res) => {
  const todo = await ToDoModel.find();
  res.send(todo);
};

module.exports.saveToDo = (req, res) => {
  const { text, description } = req.body;

  ToDoModel.create({ text, description })
    .then((data) => {
      console.log("Added Successfully...");
      console.log("from backend", data);
      res.send(data);
    })
    .catch((err) => console.log(err));
};

module.exports.deleteToDo = (req, res) => {
  const { _id } = req.body;

  console.log("id ---> ", _id);

  ToDoModel.findByIdAndDelete(_id)
    .then(() => res.set(201).send("Deleted Successfully..."))
    .catch((err) => console.log(err));
};

module.exports.updateToDo = (req, res) => {
  const { _id, text, description } = req.body;

  ToDoModel.findByIdAndUpdate(_id, { text, description })
    .then(() => res.set(201).send("Updated Successfully..."))
    .catch((err) => console.log(err));
};
