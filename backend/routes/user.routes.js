const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

//registration route
userRouter.post("/register", (req, res) => {
  const { username, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (error, hash) => {
      if (error) {
        res.status(200).json({ error });
      } else {
        const user = new UserModel({ username, email, pass: hash });
        await user.save();
        res.status(200).json({ msg: "New User has been Registered" });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//login route
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(pass, user.pass, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userID: user._id, user: user.username },
          "masai"
        );
        res.status(200).json({ msg: "Logged In", token });
      } else {
        res.status(200).json({ msg: "Invalid Paaword" });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = { userRouter };
