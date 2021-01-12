// 将文章集合构造函数导入
const { Article } = require('../../model/article');


// 引入formidable模块
const formidable = require('formidable');
const path = require('path');




module.exports = (req,res)=>{
    //  标识当前的页面
    req.app.locals.currentLink = 'article';
     const id = req.query.id;
       // 创建表单解析对象
    const formFn = new formidable.IncomingForm();
    // 设置文件上传路径
    formFn.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 是否保留表单上传文件的扩展名 m默认为 true
    formFn.keepExtensions = true;
    // // 对表单进行解析
    formFn.parse(req, async (err, fields, files) => {
        // err 在解析失败的时候存储错误信息
        // fields 保存普通表单数据
        // files 存储上传的文件信息
        //    files.cover.path.split('public')[1]
      
        await Article.updateOne({_id:id},{
         
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover:files.cover.path.split('public')[1],
            content: fields.content
        })

        
        // files.cover.path.split('public')[1] 
        
         // 将文章重定向到列表页面
        res.redirect('/admin/article');
    });

      
}