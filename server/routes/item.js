const express = require('express');
const router = express.Router();
const { Collection } = require("../models/Collection");
const { Field } = require("../models/Field");
const { Item } = require("../models/Item");
const { Like } = require("../models/Like");
const { Comment } = require("../models/Comment");
const { auth } = require("../middleware/auth");

router.post("/latestitems", (req, res) => {
    let term = req.body.searchTerm;
    if (term) {
      Item
      .find({ $text: { $search: term } })
      .exec((err, items) => {
          if (err) return res.status(400).json({ success: false, err })
          res.status(200).json({ success: true, items })
      })
    }
    else{
        Item.find()
            .exec((err, items) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, items })
        })
    }
});

router.post("/item_by_id", auth, (req, res) => {
    Item.find({ _id: req.query.id })
        .exec((err, item) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, item, userId: req.user.name })
        })
});
router.post("/items", auth, (req, res) => {
    req.query.items++
    Collection.updateOne({ _id: req.body.collect }, { $set: { items: req.query.items } })
        .exec((err, fields) => {
            if (err) return res.status(400).json({ success: false, err })
        })
    const item = new Item(req.body)
    item.save((err) => {
        if (err) returnres.status(400).json({ success: false, err })
        Field.updateMany({ col: req.body.collect }, { $set: { value: "" } })
            .exec((err, fields) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true })
            })
    })
});
router.get("/items", auth, (req, res) => {
    Item.find({ collect: req.query.id })
        .exec((err, items) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, items })
        })
});

router.delete("/delete", auth, (req, res) => {
    req.query.length--
    Collection.updateOne({ _id: req.query.collection }, { $set: { items: req.query.length } })
        .exec((err) => { if (err) return res.status(400).json({ success: false, err }) })
    Like.deleteMany({ itemOfLike: req.query.id })
        .exec((err) => { if (err) return res.status(400).json({ success: false, err }) })
    Comment.deleteMany({ item: req.query.id })
        .exec((err) => { if (err) return res.status(400).json({ success: false, err }) })
    Item.findOneAndDelete({ _id: req.query.id })
        .exec((err, r) => {
            if (err) return res.status(400).json({ success: false, err })
            if (r) {
                Item.find({ collect: r.collect })
                    .exec((err, items) => {
                        if (err) return res.status(400).json({ success: false, err })
                        return res.status(200).json({ success: true, items })
                    })
            }
        })
});

router.put("/upDatefield", auth, (req, res) => {
    Item.find({ _id: req.query.id })
        .exec((err, item) => {
            if (err) return res.status(400).json({ success: false, err })
            if (item) {
                item[0].fields[req.query.i].value = req.query.value
                Item.updateOne({ _id: req.query.id }, { $set: { fields: item[0].fields } })
                    .exec((err, e) => {
                        if (err) return res.status(400).json({ success: false, err })
                        return res.status(200).json({ success: true })
                    })
            }
        }
        )
});

router.post("/upDatefield", auth, (req, res) => {
    Item.updateOne({ _id: req.query.id }, { $set: { name: req.query.name, tag: req.query.tag } })
        .exec((err, e) => {
            if (err) return res.status(400).json({ success: false, err })
            Item.find({ collect: req.query.col })
                .exec((err, items) => {
                    if (err) return res.status(400).json({ success: false, err })
                    return res.status(200).json({ success: true, items })
                })
        })
});

module.exports = router;


