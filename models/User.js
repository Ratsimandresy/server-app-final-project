const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  pseudo: String,
  age: Number,
  description: String,
  profilImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
  },
  address: String,
  gender: { type: String, enum: [male, female, other] },
  role: { type: String, enum: [adimn, user] },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
