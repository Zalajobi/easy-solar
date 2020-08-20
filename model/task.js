// const mongoose = require("mongoose");
const mongoose = require('../connection')

//set the model of our Task
const taskSchema = mongoose.mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The Name of the Task is required'],
        minlength: [5, 'Name too short'],
        maxLength: [50, 'Name too long']
    },
    description: {
        type: String,
        required: [true, 'Description of Task is required'],
        minlength: [20, `Description of 'Task' is too 'Short'`]
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    //Set the current Date as default, only to be updated when the user updates a task
    updated_at: {
        type: Date,
        default: null
    },

    //Set the current Date as default, only to be updated when the user deletes a task
    deleted_at: {
        type: Date,
        default: null
    },
});

module.exports.taskSchema = taskSchema;
module.exports.mongoose = mongoose;