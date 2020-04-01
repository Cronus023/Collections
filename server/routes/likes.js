const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { auth } = require("../middleware/auth");
const { authlc } = require("../middleware/authlc");
router.post("/getlikes", authlc, (req, res) => {
    Like.find({ itemOfLike: req.query.id })
        .exec((err, likes) => {
            if (err) return res.status(400).json({ success: false, err })
            if (req.user != undefined) return res.status(200).json({ success: true, likes: likes, userId: req.user._id })
            else return res.status(200).json({ success: true, likes: likes })
        })
});
router.post("/upLike", auth, (req, res) => {
    const like = new Like({ itemOfLike: req.query.id, userOfLike: req.user._id })
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true })
    })
});
router.post("/unLike", auth, (req, res) => {
    Like.findOneAndDelete({ itemOfLike: req.query.id, userOfLike: req.user._id })
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
})

module.exports = router;