const express = require("express");
const router = express.Router();
const User = require('../models/user')
const Category = require('../models/category')
const Content = require('../models/content')

router.use(function(req, res, next){
    if(!req.userInfo.isAdmin){
        //当前用户是非管理员
        res.send('对不起，只有管理员才可以进入后台管理！！')
        return;
    }
    next();
})

//首页
router.get('/',function(req, res, next){
    res.render("admin/index", {
        userInfo: req.userInfo
    })
})

// 用户管理
router.get('/user',function(req, res, next){
    /**
     * 从数据库中读取所有的用户数据
     * 
     * limit(number) 限制获取的数据条数
     * 
     * skip(number) 忽略数据的条数
     * 每页显示2条
     * 1:1-2 skip:0 -> (当前页-1） * limit
     * 2:3-4 skip:2 -> (当前页-1） * limit
     */

    var page = req.query.page/1 || 1;
    var limit = 2;
    var skip = 0;
    var pages = 0;
    User.count().then((count) => {
        //计算总页数
        pages = Math.ceil(count/limit)

        page = Math.min(page, pages)
        page = Math.max(page,1)
        skip = (page-1)*limit

        User.find().limit(2).skip(skip).then(function(users){
            res.render("admin/user_index", {
                userInfo: req.userInfo,
                users,
                page,
                count,
                pages,
                limit
            })
        })
    })
})

// 分类管理
router.get('/category',function(req, res, next){
    var page = req.query.page/1 || 1;
    var limit = 2;
    var skip = 0;
    var pages = 0;
    Category.count().then((count) => {
        //计算总页数
        pages = Math.ceil(count/limit)

        page = Math.min(page, pages)
        page = Math.max(page,1)
        skip = (page-1)*limit

        Category.find().sort({_id:-1}).limit(2).skip(skip).then(function(cates){
            console.log(cates)
            res.render("admin/category_index", {
                userInfo: req.userInfo,
                cates,
                page,
                count,
                pages,
                limit
            })
        })
    })
})

// 分类添加页面
router.get('/category/add',function(req, res, next){
    res.render("admin/category_add", {
        userInfo: req.userInfo
    })
})

// 分类添加操作
router.post('/category/add',function(req, res, next){
    const name = req.body.name || '';
    //为空判断
    if(name == ''){
        res.render('admin/err',{
            userInfo: req.userInfo,
            message:'分类名称不能为空'
        })
        return;
    }

    // 是否已经存在同名分类
    Category.findOne({
        name
    }).then((rs) => {
        if(rs){
            res.render('admin/err',{
                userInfo: req.userInfo,
                message:'分类名称已经存在'
            })
            return Promise.reject();
        }else{
            return new Category({
                name
            }).save()
        }
    }).then(function(newCate){
        console.log(newCate)
        res.render('admin/success',{
            userInfo: req.userInfo,
            message:'分类保存成功'
        })
    },function(err){
        console.log('处理 分类名已存在')
    })

    
})

//分类修改
router.get('/category/edit',function(req, res, next){
    // 获取要修改的分类的信息 并且用表单的形式展现出来
    var _id= req.query.id || '';
    Category.findOne({_id}).then(function(category){
        if(!category){
            res.render('admin/err',{
                userInfo: req.userInfo,
                message:'分类名称不存在'
            })
        }else{
            res.render('admin/category_edit',{
                userInfo: req.userInfo,
                category
            })
        }
    })
})

// 1、要修改的分类名称是否存在？ 
// 不存在，直接反馈
// 2、存在？ 是否做了修改然后提交？
//   没有做修改提交，直接显示修改成功
// 3、做了修改  修改后的名字在数据库中是否已存在？
//   存在  提示 该分类已经存在
// 4、不存在  则update

router.post('/category/edit',function(req, res, next){
    // 获取要修改的分类的信息 并且用表单的形式展现出来
    var _id= req.query.id || '';
    const name = req.body.name;
    Category.findOne({_id}).then(function(category){
        if(!category){
            res.render('admin/err',{
                userInfo: req.userInfo,
                message:'分类名称不存在'
            })
            return Promise.reject()
        }else{
            // 当用户没有做任何修改提交的时候
            if(name == category.name){
                res.render("admin/success",{
                    userInfo: req.userInfo,
                    message:'修改成功',
                    url:'/admin/category'
                })
                return Promise.reject();
            }else{  //要修改的分类名称是否已经在数据库中存在
               return Category.findOne({
                    _id:{$ne:_id},
                    name
                })
            }
        }
    }).then(function(cate){
        if(!cate){
            return Category.update({
                _id
            },{
                name
            })
        }else{
            res.render('admin/err',{
                userInfo: req.userInfo,
                message:'该分类已经存在'
            })
            return Promise.reject();
        }
    }).then(function(){
        res.render('admin/success',{
            userInfo: req.userInfo,
            message:'修改成功',
            url:'/admin/category'
        })
    })
})

// 分类删除
router.get('/category/delete',function(req, res, next){
    var _id= req.query.id || '';
    Category.remove({_id}).then(function(){
        res.render('admin/success',{
            userInfo: req.userInfo,
            message:'删除成功'
        })
    })
})

// 内容首页
router.get('/content',function(req, res, next){
    var page = req.query.page/1 || 1;
    var limit = 2;
    var skip = 0;
    var pages = 0;
    Content.count().then((count) => {
        //计算总页数
        pages = Math.ceil(count/limit)

        page = Math.min(page, pages)
        page = Math.max(page,1)
        skip = (page-1)*limit

        Content.find().sort({_id:-1}).limit(2).skip(skip).then(function(list){
            res.render("admin/content_index", {
                userInfo: req.userInfo,
                list,
                page,
                count,
                pages,
                limit
            })
        })
    })
})
//内容添加
router.get('/content/add',function(req, res, next){
    Category.find().then(function(categorys){
        res.render('admin/content_add',{
            userInfo: req.userInfo,
            categorys
        })
    })
})

router.post('/content/add',function(req, res, next){
    console.log(req.body)
    const {title, category, description, content} = req.body;
    if(title == '' || description == '' || content == ''){
        res.render('admin/err',{
            userInfo: req.userInfo,
            message:'不能为空'
        })
        return;
    }

    var con = new Content({
        title,
        category,
        description,
        content
    })
    con.save().then(function(){
        res.render('admin/success',{
            userInfo: req.userInfo,
            message:'内容添加成功'
        })
    })
})
module.exports = router;

