const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const uploader = require("../config/cloudinary");


// get all the events
router.get("/", (req, res, next) => {
    Event.find().then((eventsList) => {
        res.status(200).json(eventsList);
    }).catch(err => res.status(500).json(err))
})


// get just one event
router.get("/:id", (req, res, next) => {
    Event.findById(req.params.id).then((oneEvent) => {
        res.status(200).json(oneEvent);
    }).catch(err => res.status(500).json(err))
})


// get the top 10 events // tested with Postman => doesn't work
router.get("/sortedbyrate", (req, res, next) => {

    Event.find()
    // ???????????????
    // .find({ $sort: { "noteAverage" : 1} }).then((toto) => {
        res.status(200).json(toto);
    }).catch(err => res.status(500).json(err))
})


// create an event
router.post("/", uploader.single("image"), (req, res, next) => {
    const newEvent = req.body;

    if (req.file) {
        newEvent.image = req.file.path;
    }

    Event.create(newEvent).then((eventDoc) => {
        res.status(201).json(eventDoc)
    }).catch(err => res.status(500).json(err))
})


// update an event
router.patch("/:id", uploader.single("image"), (req, res, next) => {
    const updatedEvent = req.body;

    if (req.file) {
        updatedEvent.image = req.file.path;
    }

    Event.findByIdAndUpdate(req.params.id, updatedEvent, {new: true}).then(eventDoc => {
        res.status(200).json(eventDoc);
    }).catch(err => res.status(500).json(err))
})


// delete an event
router.delete("/:id", (req, res, next) => {
    Event.findByIdAndRemove(req.params.id).then((deletedEvent) => {
        res.sendStatus(204).json(deletedEvent);
    }).catch(err => res.status(500).json(err))
})


module.exports = router;
