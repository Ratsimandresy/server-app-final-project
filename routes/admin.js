const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const uploadCloud = require("../config/cloudinary");
const User = require("../models/User");
const Tag = require("../models/Tag");
const Category = require("../models/Category");
const Event = require("../models/Event");

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

router.post(
  "/users",
  uploadCloud.single("profilImage"),
  async (req, res, next) => {
    console.log("POST Creata a new USER for admin");
    console.log(req.body);
    const user = req.body;
    if (req.file) {
      user.profileImage = req.file.path;
    }

    try {
      const cryptedPassword = bcrypt.hashSync(req.body.password, salt);
      user.password = cryptedPassword;

      const createdUser = await User.create(user);
      console.log(createdUser);

      console.log(user);

      res.status(200).json(user);
    } catch (errDb) {
      console.log(errDb);
      res.status(500).json(errDb);
    }
  }
);

router.patch("/users/:id", async (req, res, next) => {
  console.log("POST Creata a new USER for admin");
  console.log(req.body);
  console.log(req.params);

  const userId = req.params.id;
  const user = console.log(req.body);

  console.log(userId);
  console.log(user);

  try {
    console.log(user);
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    console.log(updatedUser);
    //
    res.status(200).json({ updatedUser, message: "user successfully updated" });
  } catch (errDb) {
    console.log(errDb);
    res.status(500).json(errDb);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  console.log("POST Creata a new USER for admin");
  console.log(req.body);
  console.log(req.params);

  const userId = req.params.id;

  console.log(userId);
  console.log(user);

  try {
    console.log(user);
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
    console.log("UPDATE TAG for admin");
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
  Category
    .findById(req.params.id)
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
    res.status(200).json({ events, message: "Get all events succefully" });
  } catch (errDb) {
    res.status(500).json({ errDb, message: "error can't get all events" });
  }
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
    console.log("PATCH update Event for admin");
    const event = req.body;
    const eventId = req.params.id;

    if (req.file) {
      event.mainImageUrl = req.file.path;
    }

    try {
      const updatedEvent = await Event.findByIdAndUpdate(eventId, even, {
        new: true,
      });
      console.log(updatedEvent);
      res
        .status(200)
        .json({ updatedEvent, message: "Events succefully updated" });
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
