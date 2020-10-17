const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const uploader = require("../config/cloudinary");


/************** GET ALL EVENTS *************/
router.get("/", (req, res, next) => {
    Event.find().then((eventsList) => {
        res.status(200).json(eventsList);
    }).catch(err => res.status(500).json(err))
})



/******* GET THE TOP 10 EVENTS => TESTED WITH POSTMAN AND DOESN'T WORK ******/
router.get("/sortedbyrate", (req, res, next) => {
    console.log("I am here for sorted event")
    var mysort = { noteAverage: -1 };
    Event
        .find().sort(mysort).limit(10)
        .then((sortedEvent) => {
            res.status(200).json(sortedEvent);
        })
        .catch(err => res.status(500).json(err))
})



/************** CREATE AN EVENT *************/
router.post("/", uploader.single("mainImageUrl"), async (req, res, next) => {

    try{
        const newEvent = req.body;
        
        console.log(req.body);
        if (req.file) {
            newEvent.mainImageUrl = req.file.path;
        }

        if(newEvent.tags) {
            console.log(newEvent.tags)
            newEvent.tags = JSON.parse(newEvent.tags);
        }
        console.log(newEvent.tags);

        newEvent.userId = req.session.currentUser;
        
        const createdEvent = await Event.create(newEvent);
        console.log(createdEvent);

        res.status(200).json({
            createdEvent,
            message: "Event created successFully"
        });
       
    }catch(errDb) {
        console.log(errDb);
        res.status(500).json(errDb);
    }
})


/************** GET JUST ONE EVENT *************/
router.get("/:id", (req, res, next) => {
    Event.findById(req.params.id).then((oneEvent) => {
        res.status(200).json(oneEvent);
    }).catch(err => res.status(500).json(err))
})


/************** UPDATE AN EVENT *************/
router.patch("/:id", uploader.single("image"), (req, res, next) => {
    const updatedEvent = req.body;

    if (req.file) {
        updatedEvent.image = req.file.path;
    }

    Event.findByIdAndUpdate(req.params.id, updatedEvent, {new: true}).then(eventDoc => {
        res.status(200).json(eventDoc);
    }).catch(err => res.status(500).json(err))
})


/************** DELETE AN EVENT *************/
router.delete("/:id", (req, res, next) => {
    Event.findByIdAndRemove(req.params.id).then((deletedEvent) => {
        res.sendStatus(204).json(deletedEvent);
    }).catch(err => res.status(500).json(err))
})


module.exports = router;
