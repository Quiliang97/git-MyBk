
// 导入模块
const e = require('express');



const {User,validateUser} = require('../../model/user')

// 加密模块
const bcrypt = require('bcrypt');

// **************************************************************************************************************************
// 信息验证
module.exports = async (req, res ,next) => {
    // 对接收到的对象进行验证
   
    // 使用规则 实施验证
    try {
        await validateUser(req.body);
        console.log("验证通过");
    } catch (e) {
        // 出现错误的情况下：
        // 1.重定向到 页面
        // return res.redirect('/admin/user-edit?message='+e.message) // ? 后面代表传递的参数
        // 2.在网页中显示错误信息
        // 在user-edit 路由页面吧此处的错误信息渲染到页面
        // JSON.stringify()可以将数据类型转换为字符串数据类型
      
        return next(JSON.stringify({path:'/admin/user-edit',message:e.message}));
       
    };

//  *********************************************************************************************************************  
// 添加到数据库
   
// 验证通过后 再查询数据库中是否存在当前的邮箱
    let user = await User.findOne({email:req.body.email});
    // 如果邮箱存在，则已经被其他人占用
    if(user){
         // 1.重定向到 页面
         return res.redirect('/admin/user-edit?message=此邮箱已被占用！') // ? 后面代表传递的参数
    };
    // 对密码进行加密
    const salt = await bcrypt.genSalt(10);
    // 将原密码跟改成加密后的密码
    req.body.password = await bcrypt.hash(req.body.password, salt);
    
    // 将信息添加到数据库中
    await User.create(req.body);
    // 重定向到用户列表页面
    res.redirect('/admin/user');
};