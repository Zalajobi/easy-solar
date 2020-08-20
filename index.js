const task = require("./route/task");
const user = require('./route/user');
const express = require("express");
const { static } = require("express");
const config = require('config');
const app = express();

app.use(express.json());
app.use(static("public"));
app.use(express.urlencoded( { extended: true, } ) );
app.use("/easy-solar/tasks", task.router);
app.use("/easy-solar/user", user);


//Configure JWT secret
if (!config.get('jwtKey')) {
    console.error('JWT Private key not defined!');
    process.exit(1);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));