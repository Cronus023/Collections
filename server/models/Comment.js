const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
    sender: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    message: {
        type:String,
    },
    item:{
        type:Schema.Types.ObjectId,
        ref:'Item'
    },
    collect:{
        type:Schema.Types.ObjectId,
        ref:'Collection'
    }
},{timestamps:true})
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment }