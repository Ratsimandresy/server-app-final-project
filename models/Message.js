const mongoose = require("mongoose");
const Scehma = mongoose.Schema;

const messageSchema = new Schema({
  content: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
