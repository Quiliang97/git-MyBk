// 连接数据库

// 导入config模块
const config =  require('config')

const mongoose  = require('mongoose');

mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,{useNewUrlParser:true,useUnifiedTopology:true} )
.then(() => console.log('数据库连接成功'))
.catch(err => console.log('数据库连接失败', err));
mongoose.set('useCreateIndex', true); //设置useCreateIndex全局选项以选择使用Mongoose createIndex()。
