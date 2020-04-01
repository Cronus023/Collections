const express = require('express');
const router = express.Router();
const { Collection } = require("../models/Collection");
const { Field } = require("../models/Field");
const { Item } = require("../models/Item");
const { Like } = require("../models/Like");
const { auth } = require("../middleware/auth");

router.post("/uploadCollection", auth, (req, res) => {
    const collection = new Collection(req.body)
    collection.save((err) => {
        if (err) returnres.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});
router.post("/getCollections", auth, (req, res) => {
    if (req.user._id != req.query.id && req.user.role != 1)
        return res.status(200).json({
            success: false,
            message: "Вы не имеете доступа к этой странице! Возврат к главной странице..."
        })

    Collection.find({ writer: req.query.id })
        .exec((err, collections) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, collections })
        }
        )
});

router.post("/getAllCollections", auth, (req, res) => {
    Collection.find()
        .exec((err, collections) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, collections })
        })
});


router.get("/collection_by_id", (req, res) => {
    let collectionIds = req.query.id
    Collection.find({ '_id': { $in: collectionIds } })
        .populate('writer')
        .exec((err, collection) => {
            if (err) return req.status(400).send(err)
            return  res.status(200).json({ success: true,collection,writer:collection[0].writer })
        })
});

router.delete("/collection_by_id", (req, res) => {
    let collectionIds = req.query.id
    Item.deleteMany({ collect: collectionIds }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
    });
    Like.deleteMany({ collectionOfLike: collectionIds }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
    });
    Field.deleteMany({ col: collectionIds }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
    });
    Collection.findOneAndDelete({ _id: collectionIds }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    });
});

router.put("/collection_by_id", (req, res) => {
    let collectionIds = req.query.id
    let newc = req.body
    Collection.updateOne({ _id: collectionIds }, { $set: { name: newc.name, topic: newc.topic, description: newc.description, images: newc.images } }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })
});

router.post("/collection_by_id", (req, res) => {
    let collectionIds = req.query.id
    Field.find({ col: collectionIds, name: req.body.name })
        .exec((err, field) => {
            if (err) return res.status(400).json({ success: false, err })
            if (field.length == 0) {
                const field = new Field(req.body)
                field.save((err) => {
                    if (err) return res.status(400).json({ success: false, err })
                    return res.status(200).json({ success: true })
                })
            }
            else {
                const message = "Поле с таким именем уже существует"
                return res.status(200).json({ success: false, message })
            }

        })
});

router.get("/fields_by_id", (req, res) => {
    let collectionIds = req.query.id
    Field.find({ col: collectionIds })
        .exec((err, fields) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, fields })
        })
});
router.put("/upDatefield", (req, res) => {
    let collectionIds = req.query.id
    Field.updateOne({ col: collectionIds, name: req.body.name }, { $set: { value: req.body.value } })
        .exec((err, fields) => {
            if (err) return res.status(400).json({ success: false, err })
        })

    Field.find({ col: collectionIds })
        .exec((err, fields) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, fields: fields })
        })
});
module.exports = router;


