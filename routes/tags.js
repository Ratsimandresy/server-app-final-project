const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");


/************* GET ALL TAGS *************/
router.get("/", async (req, res, next) => {
    try {
        const tags = await Tag.find({});
        res.status(200).json({
            tags,
            message:"tags successfully loaded"
        }); 
    }catch(errDb) {
        console.log(errDb);
        res.status(500).json({
            error: errDb,
            message: 'Error, fail loading tags'
        });
    };
})

module.exports = router;