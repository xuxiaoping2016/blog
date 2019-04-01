const express = require("express");
const router = express.Router();
const User = require('../models/user')

var responseData;
router.use(function(req, res, next){
    responseData = {
        code: 0,
        message: ''
    }
    next();
})
/**
 * 用户名注册
 * 用户名不能为空
 * 秘密不能为空，2次输入密码必须一致
 * 用户名是否已经注册 数据库查寻
 */
router.post('/user/register',function(req, res, next){
    const { username, password, repassword } = req.body;
    //为空判断
    if(username == ''){
       responseData.code = 1;
       responseData.message = '用户名不能为空' 
       res.json(responseData)
       return;
    }
    if(password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空' 
        res.json(responseData)
        return;
     }
     if(password != repassword){
        responseData.code = 3;
        responseData.message = '2次输入的密码不一致' 
        res.json(responseData)
        return;
     }

     // 用户名是否已经被注册了，如果数据库中已经存在和我们要
     // 注册的名称相同的数据，则代表已经被注册了

     // findOne 查找到了则返回找到的json数据，没有则返回null
     User.findOne({username }).then(function(userInfo){
       if(userInfo){
        responseData.code = 4;
        responseData.message = '用户名已被注册' 
        res.json(responseData)
        return;
       }
       // 保存用户注册信息保存到数据库中
       const user = new User({
          username,
          password,
       })
       return user.save();
     }).then(function(newUserInfo){
        console.log(newUserInfo)
        responseData.message = "注册成功"
        res.json(responseData)
     }) 
})



/**
 * 用户名注册
 * 用户名不能为空
 * 秘密不能为空，2次输入密码必须一致
 * 用户名是否已经注册 数据库查寻
 */
router.post('/user/login',function(req, res, next){
    const { username, password } = req.body;

     if(username == '' || password == ''){
         responseData.code = 1;
         responseData.message = '用户名和密码不能为空' 
         res.json(responseData)
         return;
      }

    User.findOne({username,password }).then(function(userInfo){
        if(!userInfo){
            responseData.code = 2;
            responseData.message = '用户名或密码错误' 
            res.json(responseData)
            return;
        }
         responseData.message = '登录成功' 
         responseData.data = {
             _id: userInfo._id,
             username: userInfo.username
            };
        
        req.cookies.set('userInfo',JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
           }))
         res.json(responseData)
    })
})


// 退出
router.post('/user/logout',function(req, res, next){
    req.cookies.set('userInfo',null)
    responseData.message= "退出成功"
    res.json(responseData)
})

module.exports = router;

