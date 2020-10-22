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
  console.log('Route Me me');
  try {
    const userId = req.session.currentUser;
    console.log(userId);
    const currentUser = await User.findById(userId).populate("events").populate("favorites");
    if (currentUser.events !== null) {
      currentUser.events.forEach(event => {
        Event.populate(event, {
          "path": "tags",
          "path": "category"
        });
      });
    }
    if (currentUser.favorites !== null) {
      currentUser.favorites.forEach(event => {
        Event.populate(event, {
          "path": "tags",
          "path": "category"
        });
      });
    }
    // const userEvents = await Event.find({userId: userId}).populate("tags").populate("category");
    console.log(currentUser);
    // console.log(userEvents);
    res.status(200).json(currentUser);
  } catch (errDb) {
    console.log(errDb)
    res.status(500).json(errDb);
  }
});

router.get("/me/favevents", async (req, res, next) => {
  try {
    const userId = req.session.currentUser;
    const currentUser = await User.findById(userId);
    console.log(currentUser);

    res.status(200).json(currentUser);
  } catch (errDb) {
    res.status(500).json(currentUser);
  }
});

// router.post("/create", (req, res, next) => {
//     User.create(req.body).then((userRes) => {
//         res.status(200).json(userRes);
//     }).catch((err) => {
//         res.status(200).json(err);
//     });
// });

router.post("/create", (req, res, next) => {
  console.log("============= REQ-BODY ===============>", req.body);
  const {
    email,
    password,
    firstName,
    gender,
    lastName,
    pseudo,
    address
  } = req.body;

  User.findOne({email}).then((userDocument) => {
    if (userDocument) {
      return res.status(400).json({message: "email already taken"});
    }

    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = {
      email,
      lastName,
      firstName,
      gender,
      password: hashedPassword,
      pseudo,
      address
    };

    User.create(newUser).then((userRes) => {
      res.status(200).json(userRes);
    }).catch((err) => {
      res.status(200).json(err);
    });
  });
});

router.patch("/fav-event", async (req, res, next) => {
  console.log("PATCH Favorite event for a user");
  console.log(req.body);
  try {

    userId = req.session.currentUser;
    const newFavEvts = req.body.favorites;
    console.log('New Fav Events ---------:', newFavEvts);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      favorites: newFavEvts
    }, {new: true});
    // console.log(uploadUser);

    // const uploadUserFav = uploadUser.favorites;
    // console.log(uploadUserFav);


    // const objectuploadUserFav = uploadUserFav.toObject({ getters: true});


    // console.log(objectuploadUserFav);

    // const updatedUser = await User.findByIdAndUpdate(userId, {favorites: objectuploadUserFav}, {new: true});

    console.log('----------------------', updatedUser);

    // console.log(favEventsUser);
    // const objFavevents = favEventsUser.toObject();
    // console.log(objFavevents);

    res.status(200).json(updatedUser);
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(errDb);
  }

});

router.patch("/:id/edit", (req, res, next) => {
  const userId = req.params.id;

  User.findByIdAndUpdate(userId, req.body, {new: true}).then((userDocument) => {
    res.status(200).json(userDocument);
  }).catch(next);
});

router.patch("/update", uploadCloud.single("profilImage"), async (req, res, next) => {
  console.log("PATCH /update udate a user profile");
  console.log(req.body);
  userId = req.session.currentUser;

  try {
    const user = req.body;
    if (req.file) {
      user.profilImage = req.file.path;
    }
    if (user.email === "") {
      delete user.email;
    }

    if (req.body.newPassword) {
      user.password = bcrypt.hashSync(req.body.newPassword, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, user, {new: true});
    console.log(updatedUser);
    req.session.currentUser = updatedUser._id;
    res.status(200).json({updatedUser, message: "user updated successfully"});
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json({errDb, message: "Error, can't update this user"});
  }
});


router.get("/:id", (req, res, next) => {
  const userID = req.params.id;
  User.findById(userID).populate("events").then((userRes) => {
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

// router.patch("/events/:id/Like", async (req, res, next) => {
// console.log("=======>>>>>> LIKE EVENT======>>>>>");
// try {
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
// } catch {
//     (err) => {
//       next(err);
//     };
// }
// });

module.exports = router;
