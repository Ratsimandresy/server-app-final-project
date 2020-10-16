const express = require("express");
const router = express.Router();
const Category = require("../models/Category");


/************* GET ALL CATEGORIES *************/
router.get("/", (req, res, next) => {
    Category
        .find()
        .then((categoriesList) => {
            console.log("here",categoriesList)
        res.status(200).json(categoriesList);
            })
        .catch(err => res.status(500).json(err))
})

module.exports = router;