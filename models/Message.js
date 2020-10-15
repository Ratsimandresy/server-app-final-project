const mongoose = require("mongoose");
const Scehma = mongoose.Schema;

const messageSchema = new Schema({
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
