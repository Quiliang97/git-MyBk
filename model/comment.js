// 1.引入mongoose
const mongoose  = require('mongoose');

const commentSchema = new mongoose.Schema({
    //  文章id
    aid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    },
    // 评论人id
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // 时间
    time:{
        type:Date
    },
    // 内容
    content:{
        type:String
    }
});
const Comment =  mongoose.model('Comment',commentSchema);

module.exports = {
    Comment 
}