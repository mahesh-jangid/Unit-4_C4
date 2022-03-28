const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updateddAt: {
      type: Date,
      default: new Date(),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("todo", todoSchema);
