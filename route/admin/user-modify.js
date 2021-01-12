// 修改用户信息

// 导入用户集合构造函数
const { User } = require('../../model/user')

// 加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    // 接收客户端传来的请求参数
    const {username, email, password, role, state}= req.body;
    console.log(req.body);
    // 要修改的用户id
    const id = req.query.id;
    console.log(id);

    // 查询要修改的用户
    let user = await User.findOne({ _id: id })

    //  密码比对 需要用到加密模块
    const isValue = await bcrypt.compare(password, user.password);
    if (isValue) {
        //    密码比对成功
        // 将用户数据更新到数据库

       await User.updateOne({_id:id},{
            username: username,
            email:email,
            role: role,
            state: state
        });
        // 页面重定向到用户列表页面
        res.redirect('/admin/user');

    } else {
        //    密码比对失败
        let obj = {
            path: '/admin/user-edit',
            message: '密码比对失败，不能修改！',
            id: id
        }
        next(JSON.stringify(obj));
    }

};