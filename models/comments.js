const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blog",
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
