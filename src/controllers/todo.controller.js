const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");
const Todo = require("../models/todo.model");

router.post("", authenticate, async (req, res) => {
  req.body.user_id = req.user._id;
  try {
    const todo = await Todo.create(req.body);
    return res.status(200).send(todo);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const todo = await Todo.find();
    return res.status(200).send(todo);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).lean().exec();
    return res.status(200).send(todo);
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

router.patch(
  "/:id",
  authenticate,
  authorise(["admin", "user"]),
  async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).send(todo);
    } catch (err) {
      return res.status(401).send({ message: err.message });
    }
  }
);

router.delete(
  "/:id",
  authenticate,
  authorise(["admin", "user"]),
  async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id, {
        new: true,
      });
      return res.status(200).send(todo);
    } catch (err) {
      return res.status(401).send(err.message);
    }
  }
);

module.exports = router;
