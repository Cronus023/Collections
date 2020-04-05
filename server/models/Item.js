const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = mongoose.Schema({
    name:{type:String },
    tag:{type:String},
    collect: {
        type:Schema.Types.ObjectId,
        ref:'Collection'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    fields: {
        type:Array,
        default:[]
    },
},{timestamps:true})

ItemSchema.index({'$**': "text"});

const Item = mongoose.model('Item', ItemSchema);

module.exports = { Item }