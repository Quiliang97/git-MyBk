// 将评论数据库 构造函数导入
const { Comment }  =   require('../../model/comment')

module.exports = async (req,res)=>{
 const {content, uid, aid } = req.body;
 await Comment.create({
    content:content,
    uid:uid,
    aid:aid
 });
//  重定向到当前页面
res.redirect('/home/article?id='+aid);
}