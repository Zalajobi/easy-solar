const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27018/easy-solar", {
        useNewUrlParser: true
    })
    .catch((err) => console.error("Could not connect to mongoDB", err));


//set the model of our Task
const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Task name is required'],
        minlength: [10, 'Name too short'],
        maxLength: [50, 'Name too long']
    },
    description: {
        type: String,
        required: [true, 'Description of Task is required'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    //Set the current Date as default, only to be updated when the user updates a task
    updated_at: {
        type: Date,
        default: Date.now()
    },

    //Set the current Date as default, only to be updated when the user deletes a task
    deleted_at: {
        type: Date,
        default: Date.now()
    },
});

module.exports.taskSchema = taskSchema;
module.exports.mongoose = mongoose;