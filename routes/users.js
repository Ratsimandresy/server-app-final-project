const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const upload = require("../config/cloudinary");

router.get("/", (req, res, next) => {
  User.find()
    .then((userRes) => res.status(200).json(userRes))
    .catch((err) => {
      res.status(200).json(err);
    });
});

router.get("/:id/user", (req, res, next) => {
  const userID = req.params.id;
  User.findById(userID)
    .then((userRes) => {
      res.status(200).json(userRes);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

router.post("/create", (req, res, next) => {
  User.create(req.body)
    .then((userRes) => {
      res.status(200).json(userRes);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

router.patch("/:id/edit", (req, res, next) => {
  const userId = req.params.id;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((userRes) => {
      res.status(200).json(userRes);
    })
    .catch(next);
});

// Like an event

// router.patch("/events/:id/Like", async (req, res, next) => {
//   console.log("=======>>>>>> LIKE EVENT======>>>>>");
//   try {
//     const userID = "5f871935e9454c288a52dd12";
//     const eventID = req.params.id;
//     const eventFound = await Event.findById(eventID);
//     const userInEvent = eventFound.likes.find(like => {
//         if (likes.includes(userID)) {
//             console.log("<============found USRID ==========>")
//         } else {
//             console.log("noooooo user founddd!!!!!!!!")
//         }
//     })
//   } catch {
//     (err) => {
//       next(err);
//     };
//   }
// });

module.exports = router;
