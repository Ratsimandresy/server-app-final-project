const mongoose = require("mongoose");
const Scehma = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
