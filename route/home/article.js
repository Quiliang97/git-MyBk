// 将文章集合构造函数导入
const { Article } = require('../../model/article')
// 将评论数据库 构造函数导入
const { Comment } = require('../../model/comment')


module.exports = async (req, res) => {
    const id = req.query.id;
    let article = await Article.findOne({ _id: id }).populate('author').lean();

    //    查询当前文章对应的评论信息
    let comments = await Comment.find({ aid: id }).populate('uid').lean();
    // return res.send(comments)


    res.render('home/article.art', {
        article: article,
        comments: comments
    })
}