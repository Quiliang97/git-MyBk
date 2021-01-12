// 退出登录
module.exports = (req, res) => {
    // 删除session
    req.session.destroy(function () {
        console.log('session删除成功');
        // 删除cookie
        res.clearCookie('connect.sid')
        // 清除模板中的用户信息
        req.app.locals.userInfo = null;
        // 重定向登录页
        res.redirect('/admin/login');
    });

};