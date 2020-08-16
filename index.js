const task = require("./route/task");
const express = require("express");
const { static } = require("express");
const joi = require("joi");
const app = express();

app.use(express.json());
app.use(static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/easy-solar/tasks", task.router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
