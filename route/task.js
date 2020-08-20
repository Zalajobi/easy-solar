const express = require("express");
const mid_auth = require('../middleware/auth');
const { type } = require("os");
const mongoose = require('mongoose');
const task_model = require("../model/task");
const Joi = require("joi");
const bodyParser = require('body-parser');
const router = express.Router();


express().use(bodyParser.urlencoded( { extended: true }));
express().use(bodyParser.json());

const TaskModel = task_model.mongoose.mongoose.model('tasks', task_model.taskSchema);

//Handle post request
router.post("/", mid_auth, async (req, res) => {
  const task = new TaskModel({
    name: req.body.name,
    description: req.body.description
  });

  //Save Task
  await task.save()
      .then(res.status(200).send('New Task Added'))
      .catch(exception => {
        for (let field in exception.errors) {
          res.status(400).send(exception.errors[field].message);
        }
      });
});

router.get("/", async (req, res) => {
  TaskModel.find()
      .sort('-name')
      .select('name')
      .then(tasks => { res.status(200).send(tasks) })
      .catch(err => res.status(404).send('Task is Empty', err));
});

router.get("/:name", async (req, res) => {
  await TaskModel.find({ name: req.params.name })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(404).send(`There is no Task with ${req.params.name}`));
});

router.put("/:id", async (req, res) => {
  let name = req.body.name;
  let description = req.body.description;

  //Get the Task to update
  const taskToUpdate = await TaskModel.findById(req.params.id);

  //Check if task Exist
  if (!taskToUpdate) return res.status(404).send(`Task with the id of ${req.params.id} found`);

  //Check for changes and Update Task
  taskToUpdate.set({
    name: name != null ? name : taskToUpdate.name,
    description: description != null ? description : taskToUpdate.description,
    updated_at: Date.now()
  })

  await taskToUpdate.save()
    .then(result => res.status(200).send('Task has been updated'))
      .catch(err => {
        for (let field in err.errors) {
          res.status(400).send(err.errors[field].message);
        }
      });
});

router.delete("/:id", async (req, res) => {
  await TaskModel.findByIdAndRemove(req.params.id);
});


module.exports.router = router;