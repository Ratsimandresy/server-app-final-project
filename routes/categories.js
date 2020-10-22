const express = require("express");
const router = express.Router();
const Category = require("../models/Category");


/************* GET ALL CATEGORIES *************/
router.get("/", async (req, res, next) => {

    try {
        const categoriesList = await Category.find({});
        res.status(200).json(categoriesList);
       
    } catch(errDb) {
        console.log(errDb);
        res.status(500).json(errDb);
    }
});

module.exports = router;