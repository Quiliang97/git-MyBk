// 1.引入mongoose
const mongoose  = require('mongoose');

// 2.创建文章集合规则

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        minlength:4,
        maxlength:20,
        required:[true,'请插入标题！']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'请填写作者名！']
    },
    publishDate:{
        // 时间
        type:Date,
        default:Date.now
    },
    cover:{
        // 封面
        type:String,
        default:null
    },
    content:{
        // 内容
        type:String
    }
});
// 3.根据规则创建集合
const Article =  mongoose.model('Article',articleSchema);
// 4.将集合规则作为模块成员进行导出
module.exports = {
    Article
}