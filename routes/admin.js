const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const uploadCloud = require("../config/cloudinary");
const User = require("../models/User");
const Tag = require("../models/Tag");
const Category = require("../models/Category");
const Event = require("../models/Event");
const uploader = require("../config/cloudinary");

const salt = 10;

/************** ALL RESSOURCES *************/
router.get("/", async (req, res, next) => {
  console.log("GET ALL Ressouces for admin");
  try {
    const users = await User.find({});
    const events = await Event.find({});

    const tags = await Tag.find({});
    const categories = await Category.find({});

    res.status(200).json({
      users,
      categories,
      events,
      tags,
      message: "loaded all ressources",
    });
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json({
      errDb,
      message: "Error to load all ressources",
    });
  }
});

/************** RESSOURCES USERS *************/
router.get("/users", async (req, res, next) => {
  console.log("GET ALL USERS for admin");
  try {
    const users = await User.find({});
    console.log(users);

    res.status(200).json(users);
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(errDb);
  }
});

router.get("/users/:id", (req, res, next) => {
  console.log("get one user for admin");
  User.findById(req.params.id)
    .then((oneUser) => {
      res.status(200).json(oneUser);
    })
    .catch((err) => res.status(500).json(err));
});

// router.post(
//   "/users",
//   uploadCloud.single("profilImage"),
//   async (req, res, next) => {
//     console.log("POST Creata a new USER for admin");
//     console.log(req.body);
//     const user = req.body;
//     if (req.file) {
//       user.profileImage = req.file.path;
//     }

//     try {
//       const cryptedPassword = bcrypt.hashSync(req.body.password, salt);
//       user.password = cryptedPassword;

//       const createdUser = await User.create(user);
//       console.log(createdUser);

//       console.log(user);

//       res.status(200).json(user);
//     } catch (errDb) {
//       console.log(errDb);
//       res.status(500).json(errDb);
//     }
//   }
// );

/************** CREATE A USER  *************/
router.post("/users", uploader.single("profilImage"), (req, res, next) => {
  console.log("============= REQ-BODY ===============>", req.body);
  const {
    email,
    password,
    firstName,
    city,
    age,
    description,
    formattedAddress,
    profilImage,
    gender,
    lastName,
    pseudo,
    address,
  } = req.body;

  User.findOne({ email }).then((userDocument) => {
    if (userDocument) {
      return res.status(400).json({ message: "email already taken" });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = {
      email,
      lastName,
      firstName,
      gender,
      password: hashedPassword,
      pseudo,
      age,
      description,
      address,
      profilImage,
      formattedAddress,
      city,
    };

    if (req.file) {
      newUser.profilImage = req.file.path;
    }

    User.create(newUser)
      .then((userRes) => {
        res.status(200).json(userRes);
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  });
});

router.patch(
  "/users/:id",
  uploadCloud.single("profilImage"),
  async (req, res, next) => {
    console.log("========REQ-BODY==================>>>>>>>>>>>>", req.body);
    console.log(req.params);

    const userId = req.params.id;
    const user = req.body;

    try {
      console.log(user);

      if (req.file) {
        user.profilImage = req.file.path;
      }
      if (user.email === "") {
        delete user.email;
      }

      if (req.body.newPassword) {
        user.password = bcrypt.hashSync(req.body.newPassword, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(userId, user, {
        new: true,
      });
      console.log(updatedUser);
      //
      res
        .status(200)
        .json({ updatedUser, message: "user successfully updated" });
    } catch (errDb) {
      console.log(errDb);
      res.status(500).json(errDb);
    }
  }
);

router.delete("/users/:id", async (req, res, next) => {
  console.log("DELETE A USER for admin");
  console.log(req.body);
  console.log(req.params);

  const userId = req.params.id;

  console.log(userId);
  // console.log(user);

  try {
    // console.log(user);
    const deletedUser = await User.findByIdAndRemove(userId);
    console.log(deletedUser);
    //
    res.status(200).json({ deletedUser, message: "user successfully deleted" });
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(errDb);
  }
});

/************** RESSOURCES TAGS *************/
router.get("/tags", async (req, res, next) => {
  console.log("GET ALL TAGS for admin");

  try {
    const tags = await Tag.find({});
    console.log(tags);
    res.status(200).json(tags);
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(errDb);
  }
});

router.get("/tags/:id", (req, res, next) => {
  console.log("get one tag for admin");
  Tag.findById(req.params.id)
    .then((oneTag) => {
      res.status(200).json(oneTag);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/tags", async (req, res, next) => {
  console.log("CREATE A TAG for admin");

  console.log(req.body);

  try {
    const newTag = req.body;

    const createdTag = await Tag.create(newTag);
    console.log(createdTag);
    res.status(200).json(createdTag);
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(errDb);
  }
});

router.patch("/tags/:id", async (req, res, next) => {
  try {
    console.log("UPDATE TAG for admin");
    console.log(req.body);
    console.log(req.params);

    const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(updatedTag);

    res.status(200).json(updatedTag);
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(errDb);
  }
});

router.delete("/tags/:id", async (req, res, next) => {
  try {
    console.log("DELETE TAG for admin");
    console.log(req.params.id);
    // console.log(req.body.id);

    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTag);
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(deletedTag);
  }
});

/************** RESSOURCES CATEGORY *************/
router.get("/categories", async (req, res, next) => {
  console.log("GET ALL Catgories for admin");

  try {
    const categories = await Category.find({});
    console.log(categories);
    res.status(200).json(categories);
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(errDb);
  }
});

router.get("/category/:id", (req, res, next) => {
  console.log("get one category for admin");
  Category.findById(req.params.id)
    .then((oneCategory) => {
      res.status(200).json(oneCategory);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/categories", async (req, res, next) => {
  console.log("CREATE A CATEGORIES for admin");

  console.log(req.body);

  try {
    const newCategory = req.body;

    const createdCategory = await Category.create(newCategory);
    console.log(createdCategory);
    res.status(200).json(createdCategory);
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(errDb);
  }
});

router.patch("/categories/:id", async (req, res, next) => {
  try {
    console.log("UPDATE categorie for admin");
    console.log(req.body);
    console.log(req.params);

    const updatedCategorie = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(updatedCategorie);

    res.status(200).json(updatedCategorie);
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(errDb);
  }
});

router.delete("/categories/:id", async (req, res, next) => {
  try {
    console.log("delete CATEGORY for admin");
    console.log(req.params.id);
    // console.log(req.body.id);

    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedCategory);
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(deletedCategory);
  }
});

/************** RESSOURCES EVENT *************/
router.get("/events", async (req, res, next) => {
  console.log("GET ALL Events for admin");
  try {
    const events = await Event.find({});
    console.log(events);
    // res.status(200).json({ events, message: "Get all events succefully" });
    res.status(200).json(events);
  } catch (errDb) {
    res.status(500).json({ errDb, message: "error can't get all events" });
  }
});

router.get("/events/:id", (req, res, next) => {
  console.log("get one event for admin");
  Event.findById(req.params.id)
    .then((oneEvent) => {
      res.status(200).json(oneEvent);
    })
    .catch((err) => err.status(500).json(err));
});

router.post(
  "/events",
  uploadCloud.single("mainImageUrl"),
  async (req, res, next) => {
    console.log("POST Create a New Event for admin");
    const event = req.body;
    if (req.file) {
      event.mainImageUrl = req.file.path;
    }

    try {
      const createdEvent = await Event.create(event);
      console.log(createdEvent);
      res
        .status(200)
        .json({ createdEvent, message: "Event created succefully" });
    } catch (errDb) {
      res
        .status(500)
        .json({ errDb, message: "error can't create a new event" });
    }
  }
);

router.patch(
  "/events/:id",
  uploadCloud.single("mainImageUrl"),
  async (req, res, next) => {
    const event = req.body;
    const eventId = req.params.id;
    try {
      if (req.file) {
        event.mainImageUrl = req.file.path;
      }

      const updatedEvent = await Event.findByIdAndUpdate(eventId, event, {
        new: true,
      });

      console.log("MY NEW EVENT ==============>", updatedEvent);
      res.status(200).json(updatedEvent);
    } catch (errDb) {
      res.status(500).json({ errDb, message: "error can't update events" });
    }
  }
);

router.delete("/events/:id", async (req, res, next) => {
  console.log("DELETE a event for admin");
  console.log(req.body);
  console.log(req.params);

  const eventId = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndRemove(eventId);
    console.log(deletedEvent);

    res
      .status(200)
      .json({ deletedEvent, message: "Events succefully deleted" });
  } catch (errDb) {
    res.status(500).json({ errDb, message: "error can't delete events" });
  }
});

/************** RESSOURCES COMMENT *************/
router.get("/comments", (req, res, next) => {
  console.log("GET ALL TAGS for admin");
});

/************** RESSOURCES MESSAGE *************/
router.get("/messages", (req, res, next) => {
  console.log("GET ALL TAGS for admin");
});

module.exports = router;
