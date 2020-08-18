const express = require("express");
const { type } = require("os");
const task_model = require("../model/task");
const Joi = require("joi");
const bodyParser = require('body-parser');
const router = express.Router();
// express().use(express.json());


express().use(bodyParser.urlencoded({extended: true}))
express().use(bodyParser.json);

const TaskModel = task_model.mongoose.model('task', task_model.taskSchema);

//Handle post request
router.post("/", (req, res) => {
  createTask(req.body, res);
});

router.get("/", (req, res) => {
  getAllCourses(req, res).then(r => console.log('Task Sent'));
});

router.get("/:name", (req, res) => {
  getTask(req)
      .then(result => res.status(200).send(result))
      .catch(err => res.status(404).send(`There is no Task with ${req.params.name}`));
});

router.put("/:id", (req, res) => {
  updateTask(req, res)
      .then(result => res.status(200).send('Task has been updated'))
      .catch(err => res.status(404).send('Error updating Task'))
});

router.delete("/:id", (req, res) => {
  removeTask(req)
})

async function getAllCourses(req, res) {
  return TaskModel.find()
      .sort('-name')
      .select('name')
      .then(tasks => { res.status(200).send(tasks) })
      .catch(err => res.status(404).send('Task is Empty', err));

  // return tasks;
}

async function createTask(body, res) {
  body.forEach((element, index) => {

    //Add new Task to model
    const task = new TaskModel({
      name: element.name,
      description: element.description
    });

    saveTask(task)
        .catch(exception => {
      for (let field in exception.errors) {
        res.status(400).send(exception.errors[field].message);
      }
    });
  });
}

async function saveTask(task) {
  await task.save();
}

async function getTask(req) {
  return await TaskModel.find({name: req.params.name});
}

async function updateTask(req, res) {
  let name = null;
  let description = null;
  const taskToUpDate = await TaskModel.findById(req.params.id);

  if (!taskToUpDate)
    res.status(404).send('Task not found!');


  //Parse the JSON and get the Task Name and Description
  await req.body.forEach((element, index) => {
    name = element.name != null ? element.name : taskToUpDate.name;
    description = element.description != null ? element.description : taskToUpDate.description;
  });


  //Set the update values and Update
  taskToUpDate.set( {
    name: name,
    description: description ,
    updated_at: Date.now()
  });
  await taskToUpDate.save().catch(err => {
    for (let field in err.errors) {
      res.status(400).send(err.errors[field].message);
    }
  });
}

async function removeTask(req) {
  await TaskModel.findByIdAndRemove(req.params.id);
}

module.exports.router = router;