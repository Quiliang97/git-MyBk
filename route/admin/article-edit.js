// 将文章集合构造函数导入
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    //  标识当前的页面
    req.app.locals.currentLink = 'article';

    // 获取当前地址栏中的参数 判断是添加还是修改操作
    const { message, id } = req.query;
    console.log(id);
    //  如果传递了参数则是修改操作
    if (id) {
        // 修改操作
        let article = await Article.findOne({ _id: id }).populate('author').lean();
        // res.send(article);
        res.render('admin/article-edit', {
            message: message,
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '确认修改'

        });
    } else {
        // 添加操作
        res.render('admin/article-edit', {
            message: message,
            link: '/admin/article-add',
            button: '添加文章'

        });
    }
}