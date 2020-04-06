const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = mongoose.Schema({
    itemOfLike: {
        type:Schema.Types.ObjectId,
        ref:'Item'
    },
    userOfLike: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    collectionOfLike:{
        type:Schema.Types.ObjectId,
        ref:'Collection'
    }
})
const Like = mongoose.model('Like', LikeSchema);

module.exports = { Like }