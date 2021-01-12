// 导入框架
const express =  require('express');

const home = express.Router()

// 首页
home.get('/',require('./home/index'));

// 文章详情展示页面
home.get('/article',require('./home/article'))

// 评论功能路由
home.post('/comment',require('./home/comment'))


module.exports = home;