// 创建用户集合的

const mongoose  = require('mongoose');

// 导入bcrypt
const bcrypt = require('bcrypt');


const Joi = require('joi');

// 设定集合规则
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        unique:true, // 值是唯一的，保证不重复
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        // admin 为超级管理员
        // normal 为普通用户
        type:String,
        require:true
    },
    state:{
        type:Number,
        default:0  // 0 启用状态  1 禁用状态
    }
   
    });
    // 创建集合并应用规则
    const User = mongoose.model('User', userSchema); 
    // async function createUser(){
    //     const salt = await bcrypt.genSalt(10);
    //     // 对密码进行加密
    //     const pass = await bcrypt.hash('5200125ZGL', salt);
    //    const user =  User.create({
    //         username:'ZGL',
    //         email:'2524002095@qq.com',
    //         password:pass,
    //         role:'admin',
    //         state:0
    //     });
       
    // }
    
// 验证用户信息
const validateUser = user=>{
     // 定义验证规则
     const schema = {
        username: Joi.string().min(2).max(20).required().error(new Error('请按规则输入用户名!')),
        email: Joi.string().email().error(new Error('请按规则输入邮箱!')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('请按规则输入用密码!')),
        role: Joi.string().valid('normal', 'admin').required(),
        state: Joi.number().valid(0, 1).required()
    };
    return Joi.validate(user, schema);
   
}



    module.exports = {
        //User:User
        User ,// 集合的方式导出
        validateUser
    };

    // createUser();