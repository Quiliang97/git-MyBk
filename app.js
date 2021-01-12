// 导入框架
const express =  require('express');
const path = require('path');

// 创建服务器
const app = express();

// 连接数据库
require('./model/connect');

// 导入express-session模块
const session =  require('express-session');

// 导入mrogan 这第三方模块 打印客户端发送过来的请求
const morgan =  require('morgan')

// 导入config模块
const config =  require('config')

// 告诉express框架模板存放的位置是什么
app.set('views', path.join(__dirname, 'views'))
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 渲染art文件时使用的模板引擎是什么
app.engine('art', require('express-art-template'))

// 导入dateformat 这个时间格式处理模块
 const dateFormat =  require('dateformat')
//  导入art-template
 const template =  require('art-template')
//  向模板内部导入 dateFormat变量 我们就可以直接在art模板文件中直接使用这个方法了
 template.defaults.imports.dateFormat = dateFormat;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))

// 配置session
app.use(session({
    secret: 'secret'
    // name: 'sid',
    // 'resave': false,
    // saveUninitialized: true,
    // cookie: {
    //   maxAge: 30 * 60 * 1000
    // }
  }));


// 引入路由模块
const home = require('./route/home.js')
const admin = require('./route/admin.js')


// 实现静态资源访问功能
app.use(express.static(path.join(__dirname, 'public')))


 console.log(config.get('title'));

// 获取系统环境变量，返回一个对象 其中的NODE.ENV 存储的就是之前设置的标记
const ENV =process.env.NODE_ENV;
if(ENV =='development'){
console.log("**************开发环境运行**************");
  // 在开发环境中，将客户端发送给服务器的请求打印到控制台
  app.use(morgan('dev'))
}else{
console.log("**************生产环境运行**************");
}


// 拦截请求 判断用户登录状态
const guard = require('./middleware/loginGuard');
app.use('/admin',guard);

// 为路由匹配路由对象
app.use('/home',home);
app.use('/admin',admin);

app.use((err, req, res, next) => {
  const result = JSON.parse(err);
  console.log(result);
  let params = [];

  for (let arrt in result) {
    if (arrt != 'path') {
      params.push(arrt + '=' + result[arrt]);
    }
  };
console.log(params);
  res.redirect(`${result.path}?${params.join('&')}`);
});

// 监听端口
app.listen(80);
console.log("服务器启动成功！");