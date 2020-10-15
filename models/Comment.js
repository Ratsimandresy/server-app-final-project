const mongoose = require("mongoose");
const Scehma = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
