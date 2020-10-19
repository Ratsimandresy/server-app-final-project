const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const uploader = require("../config/cloudinary");

/************** GET ALL EVENTS *************/
router.get("/", (req, res, next) => {
    Event.find().populate("tags").populate("category").populate("userId").then((eventsList) => {
        res.status(200).json(eventsList);
    }).catch((err) => res.status(500).json(err));
});

/******* GET THE TOP 10 EVENTS ******/
router.get("/sortedbyrate", (req, res, next) => {
    console.log("I am here for sorted event");
    var mysort = {
        noteAverage: -1
    };
    Event.find().sort(mysort).limit(10).populate("tags").populate("category").then((sortedEvent) => {
        res.status(200).json(sortedEvent);
    }).catch((err) => res.status(500).json(err));
});

/******* GET THE EVENTS OF A SPECIFIC USER ******/
router.get("/ofaspecificuser/:id", (req, res, next) => {
    console.log("I am here for specific user", req.params.id)
    Event.find({"userId": req.params.id}).then((specificUser) => {
        res.status(200).json(specificUser);
    }).catch(err => res.status(500).json(err))
})


/************** CREATE AN EVENT *************/
router.post("/", uploader.single("mainImageUrl"), async (req, res, next) => {
    console.log(req.body);
    console.log(req.body.category);

    try {
        const newEvent = req.body;

        if (req.file) {
            newEvent.mainImageUrl = req.file.path;
        }

        if (newEvent.category === "") {
            delete newEvent.category;
        }

        newEvent.userId = req.session.currentUser;

        newEvent.userId = req.session.currentUser;

        const createdEvent = await Event.create(newEvent);
        console.log(createdEvent);

        res.status(200).json({createdEvent, message: "Event created successFully"});
    } catch (errDb) {
        console.log(errDb);
        res.status(500).json({errDb, message: "Can't create a new event"});
    }
});

/************** GET JUST ONE EVENT *************/

router.get("/:id", (req, res, next) => {
    console.log("Get One Event");
    Event.findById(req.params.id).populate("tags").populate("category").populate("userId").then((oneEvent) => {
        res.status(200).json(oneEvent);
    }).catch((err) => res.status(500).json(err));
});

/************** UPDATE AN EVENT *************/
router.patch("/:id", uploader.single("mainImageUrl"), async (req, res, next) => {
    console.log("PATCH update a event");
    try {
        const eventToUpdate = req.body;
        const eventId = req.params.id;
        if (req.file) {
            eventToUpdate.mainImageUrl = req.file.path;
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, eventToUpdate, {new: true});
        console.log(updatedEvent);

        res.status(200).json(updatedEvent);
    } catch (errDb) {
        console.log(errDb);
        res.status(500).json(errDb);
    }
});

/************** DELETE AN EVENT *************/
router.delete("/:id", (req, res, next) => {
    Event.findByIdAndRemove(req.params.id).then((deletedEvent) => {
        res.sendStatus(204).json(deletedEvent);
    }).catch((err) => res.status(500).json(err));
});

module.exports = router;
