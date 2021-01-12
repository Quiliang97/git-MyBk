// 删除用户

// 导入用户集合构造函数
const { User } = require('../../model/user');
// 将文章集合构造函数导入
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    //  获取要删除的用户的id
    let { id, currentLink } = req.query;
    // currentLink用来标记是删除用户还是删除文章

    if (currentLink == 'article') {
        // 删除用户
        await Article.findOneAndDelete({ _id: id });
        // 重定向到用户列表页面
        res.redirect('/admin/article');
        console.log('文章删除成功！');
    } else {
        // 删除用户
        await User.findOneAndDelete({ _id: id });
        // 重定向到用户列表页面
        res.redirect('/admin/user');
        console.log('用户删除成功！');
    }


};
