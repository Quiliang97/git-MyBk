// 导入框架
const express = require('express');
const session = require('express-session');




const admin = express.Router()
// 渲染登录页面
admin.get('/login',require('./admin/loginPage'));


// 实现登录
const login = require('./admin/login');
admin.post('/login', login);

// 渲染用户列表页面 
admin.get('/user', require('./admin/userPage'));

//  用户编辑页面 路由
admin.get('/user-edit',require('./admin/user-edit'))

//  用户编辑页面 信息验证  路由
admin.post('/user-edit',require('./admin/user-edit-fn'))

//  用户修改页面  路由
admin.post('/user-modify',require('./admin/user-modify'))

//  删除用户 、文章 路由
admin.get('/delete',require('./admin/user-delete'))

// 文章管理页面路由
admin.get('/article',require('./admin/article'));
// 文章编辑页面路由
admin.get('/article-edit',require('./admin/article-edit'));

// 添加文章的路由
admin.post('/article-add',require('./admin/article-add'));


//  用文章改页面  路由
admin.post('/article-modify',require('./admin/article-modify'))






// 退出登录
admin.get('/logout',require('./admin/logout'));



module.exports = admin; 