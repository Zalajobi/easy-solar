const mongoose = require("../connection");
const config = require('config');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.mongoose.Schema({
    username: {
        type: String,
        required: [true, `Username can't be empty`],
        minlength: [5, `Username must be at least 5 character long`],
        unique: [true, `User already exist, Please sign in`]
    },
    email: {
        type: String,
        required: [true, `email can't be empty`],
        unique: [true, "User With this email already exist"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 5,
        maxlength: 1024,
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, _username: this._username, _email: this._email}, config.get('jwtKey'));
    return token;
}
const User = mongoose.mongoose.model("users", userSchema);

exports.User = User;