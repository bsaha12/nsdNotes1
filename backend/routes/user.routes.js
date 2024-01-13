const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

//registration route
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *        type: object
 *        properties:
 *           id:
 *              type: string
 *              description: The auto generated id fo the user
 *           name:
 *              type: string
 *              description: The user name
 *           email:
 *              type: string
 *              description: The user name
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Add a new User
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#/components/schemas/User"
 *   responses:
 *    200:
 *     description: Successfully added a user
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *              msg:
 *                 type: string
 *                 description: Confirmation message
 */
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
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               pass:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Confirmation message
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       200:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       400:
 *         description: Bad request. Check the request payload.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
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
