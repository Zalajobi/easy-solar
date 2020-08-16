const express = require("express");
const {
  type
} = require("os");
const task_model = require("../model/task");
const Joi = require("joi");
const router = express.Router();
express().use(express.json());


//Handle post request
router.post("/", (req, res) => {
  // validateSchema(req.body);
  
  createTask(req.body)
      .then(res.status(200).send('Task has successfully been added'))
      .catch(err => console.log(err));
});

async function createTask(body) {
  const TaskModel = task_model.mongoose.model('task', task_model.taskSchema);

  body.forEach((element, index) => {
    const task = new TaskModel({
      name: element.name,
      description: element.description
    });
      task.save();
  });
}

module.exports.router = router;