const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FieldSchema = mongoose.Schema({
    col: {
        type:Schema.Types.ObjectId,
        ref:'Collection'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    name: {
        type:String,
        maxlength: 50
    },
    type:{
        type:String
    },
    value:{
        type:String
    }
})
const Field = mongoose.model('Field', FieldSchema);

module.exports = { Field }