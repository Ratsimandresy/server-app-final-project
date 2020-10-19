const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.get("/", (req, res, next) => {
  console.log("allcoment here ======>>>>>");
  Comment.find()
    .then((allComment) => {
      res.status(200).json(allComment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res, next) => {
  Comment.findById(req.params.id)
    .populate("Event")
    .populate("User")
    .then((oneComment) => {
      res.status(200).json(oneComment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/******* GET THE EVENTS OF A SPECIFIC USER ******/
router.get("/ofAgivenUser/:id", (req, res, next) => {
  console.log("I am here for specific user", req.params.id);
  Event.find({ userId: req.params.id })
    .then((ofAgivenUser) => {
      res.status(200).json(ofAgivenUser);
    })
    .catch((err) => res.status(500).json(err));
});

/************CREATE A COMMENT******************* */
router.post("/", (req, res, next) => {
  console.log("THE BODYYYYYYYYYY", req.body);
  const newComment = req.body;
  Comment.create(newComment)
    .then((newComm) => {
      console.log(newComment);
      res.status(200).json(newComm);
    })
    .catch((err) => {
      console.log(err);
      //   res.status(500).json(err);
    });
});

/************UPDATE A COMMENT******************* */
router.patch("/:id", (req, res, next) => {
  console.log("THE BODYYYYYYYYYY", req.body);
  Comment.create(req.params.id, req.bodys, { new: true })
    .then((res) => {
      console.log(comment);
      res.status(200).json(res);
    })
    .catch((err) => {
      console.log(err);
      // res.status(500).json(err);
    });
});

module.exports = router;
