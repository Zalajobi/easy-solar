const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require('../middleware/auth');
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const {validate} = require("../model/user");


express().use(bodyParser.urlencoded( { extended: true }));
express().use(bodyParser.json());

router.post("/signup" , async (req, res) => {
  let user = await User.User.findOne({email: req.body.email});
  if (user) return res.status(400).send("User Already Registered");
  const salt = await bcrypt.genSalt(10);
    user = new User.User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt)
    });

    await user.save()
        .then(rsult => {
            const token = user.generateAuthToken();
            res.header('x-auth-token', token).send();
        })
        .catch(exception => {
          for (let field in exception.errors) {
            res.status(400).send(exception.errors[field].message);
          }
        });
});

router.post("/login", async (req, res) => {
    console.log("HELLO")
    let user = await User.User.findOne({email: req.body.email});

    if (!user) return res.status(400).send("Invalid Email or Password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid Email or Password");

    const token = user.generateAuthToken();
    res.send(token);
});

router.get("/me", auth, async (req, res) => {
    const user = await User.User.findById(req.user._id).select('-password');
    res.status(200).send(user );
});

module.exports = router;