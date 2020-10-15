const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Tag = require("../models/Tag");


/************** ALL RESSOURCES *************/
router.get("/", (req, res, next) => {
    console.log('GET ALL USERS for admin');
});


/************** RESSOURCES USERS *************/
router.get("/users", (req, res, next) => {
    console.log('GET ALL USERS for admin');
});


/************** RESSOURCES TAGS *************/
router.get("/tags", async (req, res, next) => {
    console.log('GET ALL TAGS for admin');

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
    console.log('CREATE A TAG for admin');

    console.log(req.body);

    try {
        const newTag = req.body;

        const createdTag = await Tag.create(newTag);
        console.log(createdTag);
        res.status(200).json(createdTag)

    } catch (errDb) {
        console.log(errDb);
        res.status(500).json(errDb)
    }

});

router.patch("/tags/:id", async (req, res, next) => {
    try {
        console.log('UPDATE TAG for admin');
        console.log(req.body);
        console.log(req.params);

        const updatedTag = await Tag.findByIdAndUpdate(req.params._id, req.body, {new: true});
        console.log(updatedTag);

        res.status(200).json(updatedTag);

    } catch (errDb) {
        console.log(errDb);
        res.status(500).json(errDb);
    }

});

router.delete("/tags/:id", async (req, res, next) => {
    try {
        console.log('UPDATE TAG for admin');
        console.log(req.params.id);
        //console.log(req.body.id);

        const deletedTag = await Tag.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTag);
    } catch (errDb) {
        console.log(errDb);
        res.status(500).json(deletedTag);
    }
});


/************** RESSOURCES CATEGORY *************/
router.get("/categories", (req, res, next) => {
    console.log('GET ALL TAGS for admin');
});


/************** RESSOURCES EVENT *************/
router.get("/events", (req, res, next) => {
    console.log('GET ALL TAGS for admin');
});

/************** RESSOURCES COMMENT *************/
router.get("/comments", (req, res, next) => {
    console.log('GET ALL TAGS for admin');
});

/************** RESSOURCES MESSAGE *************/
router.get("/comments", (req, res, next) => {
    console.log('GET ALL TAGS for admin');
});

module.exports = router;
