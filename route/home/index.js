


// 将文章集合构造函数导入
const { Article } = require('../../model/article')

// 导入mongoose-sex-page 模块 （分页）
const pagination = require('mongoose-sex-page')

module.exports = async (req,res)=>{

  // 接收客户端传递的页码数据
  const page =  req.query.page;
  //  标识当前的页面
  // req.app.locals.currentLink = 'article';
  // page 指定当前页数 
  // size 指定每页显示的数据条数
  // display 指定客户端要显示的页码
  // exec 向数据库中发出查询请求
  // 查询所有文章数据
 let result =  await  pagination(Article).find().page(page).size(4).display(3).populate('author').exec();

 result = JSON.stringify(result);

 result = JSON.parse(result);

  
  res.render('home/index',
  {
    result : result
     
  });


    }