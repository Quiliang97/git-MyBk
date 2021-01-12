// 用来验证密码

// 导入模块
const Joi = require('joi');

// 定义验证规则
const schema = {
    username:Joi.string().min(2).max(4).required().error(new Error('请按规则输入用户名!')),
    email:string().required().error(new Error('请按规则输入邮箱!')),
    password:string().required().error(new Error('请按规则输入密码!')),
    role:string(),
    state:
};

// 使用定义的规则进行验证


async function run() {
    try{
        await Joi.validate({
            username:'20d000'
        },schema);
    }catch(ex){
        console.log(ex.message);
        return;

    }
    console.log("验证通过");
  
};
run();