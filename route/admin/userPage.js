// 导入用户集合构造函数
const { User } = require('../../model/user')

module.exports = async (req, res) => {
    //  标识当前的页面
    req.app.locals.currentLink = 'user';
   
    // 数据分页
    // 接收客户端传来的当前页数 设置默认为 1
    let page = req.query.page || 1;
    // 定义每一页显示的数据条数
    let pagesize = 5;
    // 查询数据的总条数  countDocuments({}) 可查询到到数据的总数 需要传入一个参数
    let count = await User.countDocuments({})
    // 总页数 除不尽的向大取整
    let total = Math.ceil(count / pagesize);
    // 页码对应的开始位置
    let start = (page-1)*pagesize


    // 将用户信息从数据库中查询出来
    // limit(pagesize) 限制查询的数量
    // skip() 要跳过查询的数据索引 从0 开始
    let users = await User.find({}).limit(pagesize).skip(start)
    // 渲染模板
    res.render('admin/user', {
        users: users,
        page:page,
        total:total,
        count:count
    });


};