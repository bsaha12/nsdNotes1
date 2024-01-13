const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { NoteModel } = require("../model/note.model");

const noteRouter = express.Router();

// auth middleware
noteRouter.use(auth);

// POST method
/**
 * @swagger
 * /notes/create:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Note"
 *     responses:
 *       200:
 *         description: New note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Confirmation message
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
noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).json({ msg: "A new note has been created" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// GET method
noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ userID: req.body.userID });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//PATCH method
noteRouter.patch("/update/:noteID", async (req, res) => {
  const noteID = req.params.noteID;
  const payload = req.body;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (note && note.userID === payload.userID) {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, payload);
      res.status(200).json({ msg: "Note has been updated" });
    } else {
      res.status(200).json({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

//DELETE method
noteRouter.delete("/delete/:noteID", async (req, res) => {
  const noteID = req.params.noteID;
  try {
    const note = await NoteModel.findOne({ _id: noteID });
    if (note && note.userID === req.body.userID) {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.status(200).json({ msg: "Note has been deleted" });
    } else {
      res.status(400).json({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = {
  noteRouter,
};
