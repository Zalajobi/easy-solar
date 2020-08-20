const mongoose = require('mongoose');

mongoose
    .connect("mongodb://localhost:27018/easy-solar", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .catch((err) => console.error("Could not connect to mongoDB", err));

module.exports.mongoose = mongoose;