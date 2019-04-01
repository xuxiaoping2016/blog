/**
 * 应用程序入口文件
 */

const express = require("express");
const swig = require("swig");
const Cookies = require("cookies")

const User = require('./models/user')
// 加载数据库模块
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();

// 设置静态文件托管 当用户访问的url以/public开始，
// 那么直接返回对应的__dirname+"/public"下得文件
app.use(
    '/public',
    express.static(__dirname+"/public")
)

// 为什么判断是不是管理员放在这里 而不是在设置cookie的时候？
// 用户修改cookie来修改用户权限
app.use(function(req,res,next){
    req.cookies = new Cookies(req,res);
    // 解析登录用户的登录信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch(e){
            next();
        }

    } else {
        next();
    }
})


// 配置应用模板
// 定义当前应用所使用的模板阴影
// 第一个删除，模板引擎的名称， 同事也可以是模板文件的后缀，第二个参数表示用于处理末班内容
app.engine('html',swig.renderFile);
app.set('views','./views');
// 第二个参数必须与app.engin定义的模板引擎名称必须一致
app.set('view engine','html')
swig.setDefaults({
    cache:false
})

app.use(bodyParser.urlencoded({
    extended:true
}))

/**
 * 根据不同的功能划分模块
 */
app.use('/admin',require('./routes/admin'))
app.use('/api',require('./routes/api'))
app.use('/', require('./routes/main'))

mongoose.connect('mongodb://localhost:27018',function(err){
    if(err){
        console.log('数据库连接失败')
    }else{
        app.listen(8082)
        console.log('数据库连接成功')
        console.log("listening to localhost:8082")
    }
})