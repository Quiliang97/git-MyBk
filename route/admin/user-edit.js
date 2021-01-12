// 导入用户集合构造函数
const { User } = require('../../model/user')


module.exports = async (req,res)=>{

    //  标识当前的页面
    req.app.locals.currentLink = 'user';
    
    // 获取当前地址栏中的参数 判断是添加还是修改操作
    const {message,id} = req.query;
    // 如果传递了参数则是修改操作
    if(id){
        // 修改操作
       let user =  await User.findOne({_id:id})
       res.render('admin/user-edit',{
        message:message,
        user:user,
        link:'/admin/user-modify?id='+id,
        button:'修改'
        

    });

    }else{
        // 添加操作
        res.render('admin/user-edit',{
            message:message,
            link:'/admin/user-edit',
            button:'添加'
    
        });
    }
    
}