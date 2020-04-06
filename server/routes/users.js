const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Like } = require("../models/Like");
const { Collection } = require("../models/Collection");
const { Comment } = require("../models/Comment");
const { Field } = require("../models/Field");
const { Item } = require("../models/Item");
const { auth } = require("../middleware/auth");

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});
router.post("/getUsers", (req, res) => {
    User.find()
        .exec((err, users) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, users })
        })
});
router.post("/block_by_id", (req, res) => {
    User.updateOne({ _id: req.query.id }, { $set: { isBlocked: req.query.block, token: "", tokenExp: "" } })
        .exec((err) => {
            if (err) return res.status(400).json({ success: false, err })
            User.find()
                .exec((err, users) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).json({ success: true, users })
                })
        })
});
router.post("/delete_by_id", (req, res) => {
    let id = req.query.id
    Like.deleteMany({ userOfLike: id }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
    });
    Field.deleteMany({ user: id }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
    });
    Item.deleteMany({ user: id }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
    });
    Collection.deleteMany({ writer: id }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
    });
    Comment.deleteMany({ sender: id }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
    });
    User.deleteOne({ _id: id })
        .exec((err) => {
            if (err) return res.status(400).json({ success: false, err })
            User.find()
                .exec((err, users) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).json({ success: true, users })
                })
        })
});
router.post("/admin_by_id", (req, res) => {
    User.updateOne({ _id: req.query.id }, { $set: { role: 1 } })
        .exec((err) => {
            if (err) return res.status(400).json({ success: false, err })
            User.find()
                .exec((err, users) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).json({ success: true, users })
                })
        })
});
router.post("/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    if (req.body.SocialNetworks) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (!user) {
                const newuser = new User(req.body);
                newuser.save((err, doc) => {
                    if (err) return res.json({ success: false, err })
                    doc.generateToken((err, new1) => {
                        if (err) return res.status(400).send(err);
                        res.cookie("w_authExp", new1.tokenExp);
                        res
                            .cookie("w_auth", new1.token)
                            .status(200)
                            .json({
                                loginSuccess: true, userId: new1._id
                            })
                    })
                });
            }
            else {
                if (user.isBlocked)
                    return res.json({
                        loginSuccess: false,
                        message: "You are blocked, sorry("
                    });
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    res.cookie("w_authExp", user.tokenExp);
                    res
                        .cookie("w_auth", user.token)
                        .status(200)
                        .json({
                            loginSuccess: true, userId: user._id
                        });
                });
            }
        })
    }
    else {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (!user)
                return res.json({
                    loginSuccess: false,
                    message: "Auth failed, check out your Account or Password again"
                });
            if (user.isBlocked)
                return res.json({
                    loginSuccess: false,
                    message: "You are blocked, sorry("
                });
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch)
                    return res.json({ loginSuccess: false, message: "Wrong password" });
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    res.cookie("w_authExp", user.tokenExp);
                    res
                        .cookie("w_auth", user.token)
                        .status(200)
                        .json({
                            loginSuccess: true, userId: user._id
                        });
                });
            });
        })
    }
})

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;
