const { Router } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const upload = require("../config/cloudinary");

router.patch("/:id", upload.single("profilImage"), (req, res, next) => {
  const userId = req.session.currentUser;

  if (req.file) {
    req.body.profilImage = req.file.path;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((userRes) => {
      res.status(200).json(userRes);
    })
    .catch(next);
});

// router.post("/events/:idEvent/like", (req, res, next) => {});

// router.post("/events/:idEvent/dislike", (req, res, next) => {});

// router.post("/events/:idEvent/rate", (req, res, next) => {});

// router.patch("/events/:idEvent/rate", (req, res, next) => {});

// router.patch("/events/:idEvent/like", (req, res, next) => {});

// router.patch("/events/:idEvent/dislike", (req, res, next) => {});

// router.patch("/follwing/:idUser/", (req, res, next) => {});

// router.patch("/unfollow/:idUser/", (req, res, next) => {});

module.exports = router;
