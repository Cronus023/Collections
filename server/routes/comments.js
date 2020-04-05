const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

router.get("/getComments", (req, res) => {
    Comment.find({item:req.query.id})
        .populate("sender")
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).send(comments)
        })
});
module.exports = router;


