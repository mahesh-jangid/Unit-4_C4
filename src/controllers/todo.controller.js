const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");
const Product = require("../models/todo.model");

router.post("", authenticate, async (req, res) => {
  req.body.user_id = req.user._id;
  try {
    const product = await Product.create(req.body);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    return res.status(200).send(product);
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
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).send(product);
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
      const product = await Product.findByIdAndDelete(req.params.id, {
        new: true,
      });
      return res.status(200).send(product);
    } catch (err) {
      return res.status(401).send(err.message);
    }
  }
);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const Todo = require("../models/todo.model.js");

// router.get("", async (req, res) => {
//   try {
//     const todo = await Todo.find().lean().exec();
//     return res.status(200).send(todo);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });
// router.post("", async (req, res) => {
//   try {
//     const post = await Post.create(req.body);
//     return res.status(200).send(post);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// router.get("/:_id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params._id)
//       .populate({
//         path: "userId",
//         select: { name: 1, email: 1 },
//       })
//       .lean()
//       .exec();
//     return res.status(200).send(post);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// router.patch("/:_id", async (req, res) => {
//   try {
//     const post = await Post.findByIdAndUpdate(req.params._id, req.body);
//     return res.status(200).send(post);
//   } catch (err) {
//     return res.status(500).res.send(err.message);
//   }
// });

// router.delete("", async (req, res) => {
//   try {
//     const post = await Post.findByIdAndDelete(req.params.id);
//     return res.status(200).send(post);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// module.exports = router;
