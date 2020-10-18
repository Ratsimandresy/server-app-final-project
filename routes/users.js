const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const Tag = require("../models/Tag");
const uploadCloud = require("../config/cloudinary");
const bcrypt = require("bcrypt");
const salt = 10;

router.get("/", (req, res, next) => {
    User.find().then((userRes) => res.status(200).json(userRes)).catch((err) => {
        res.status(200).json(err);
    });
});



router.get("/me", async (req, res, next) => {
  try{
    const userId = req.session.currentUser;
    console.log(userId);
    const currentUser = await User.findById(userId);
    const userEvents = await Event.find({userId: userId}).populate('tags').populate('category');
    console.log(currentUser);
    console.log(userEvents);
    res.status(200).json({
      currentUser,
      userEvents
    });
  }catch(errDb){
    res.status(500).json(currentUser);
  }
});

router.post("/create", (req, res, next) => {
    User.create(req.body).then((userRes) => {
        res.status(200).json(userRes);
    }).catch((err) => {
        res.status(200).json(err);
    });
});

router.patch("/:id/edit", (req, res, next) => {
    const userId = req.params.id;

    User.findByIdAndUpdate(userId, req.body, {new: true}).then((userDocument) => {
        res.status(200).json(userDocument);
    }).catch(next);
});

router.patch("/update", uploadCloud.single("profilImage"), async (req, res, next) => {
  console.log(req.session);
  userId = req.session.currentUser;
  
  try {
    const user = req.body;
    console.log(req.file);
    if(req.file){
      user.profilImage = req.file.path;
    }
    if(req.body.newPassword) {
      user.password =  bcrypt.hashSync(req.body.newPassword, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, user, {new: true});
    req.session.currentUser = updatedUser._id;
    res.status(200).json({
      updatedUser, 
      message: "user updated successfully"
    });
  }catch(errDb){
    console.log(errDb);
    res.status(500).json({
      errDb,
      message: "Error, can't update this user"
    });
  }
 
});

router.get("/:id", (req, res, next) => {
  const userID = req.params.id;
  User.findById(userID).then((userRes) => {
      res.status(200).json(userRes);
  }).catch((err) => {
      res.status(200).json(err);
  });
});

router.delete("/:id", (req, res, next) => {
    User.findByIdAndDelete(req.params.id).then((userRes) => {
        res.status(200).json(userRes);
    }).catch(next);
});

// Like an event

module.exports = router;
