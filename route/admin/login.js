// 登录模块

//  导入创建数据库用户模块
const { User } = require('../../model/user');

// 导入bcrypt 加密模块
const bcrypt = require('bcrypt');

const login =  async (req, res) => {
    // 接收请求参数

    // 解构邮件名和密码组成的对象
    const { email, password } = req.body;
    //  在服务端再次对用户输入进行判断
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).send("<h4>邮件地址或者密码错误!</h4>")
    };

    // 如果查到了用户，user的值是对象类型 没有查到则是空
    let user = await User.findOne({ email: email });
    // 用户输入密码与加密密码是否一致
    let isValid = await bcrypt.compare(password, user.password)
    

    // 将用户传来的密码和用户密码与数据库中的进行对比判断
    if (isValid) {
        // 登录成功
        // 向sess对象中 存入了一个username 数据
        req.session.username = user.username;

        // 将用户角色存入session中
        req.session.role = user.role;

        // 将用户的信息对象存入公共位置 req的下面有个app属性，就是app.js里的app
        // 方便在其他的地方调用
        req.app.locals.userInfo = user;

        // 对用户角色进行判断
        if(user.role == 'admin'){
            // res.send("登录成功！")
        // 重定向到用户列表页面
            res.redirect('/admin/user')
        }else{
            res.redirect('/home/')
        }

        
       

    }
    else {
        // 没有查询到
        return res.status(400).send("<h4>邮件地址或者密码错误!</h4>")
    }
};
module.exports = login;