const guard = (req,res,next)=>{
    // 判断用户是否是登录页面
    // 判断用户的登录状态
    if(req.url!='/login' && !req.session.username){
        res.redirect('/admin/login')
    }else{
        // 如果是普通用户直接跳转主页 并阻止向下运行
        if(req.session.role == 'normal'){
           return res.redirect('/home/')
        }
        next();
    }
};
module.exports = guard;