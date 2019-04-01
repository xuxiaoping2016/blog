const express = require("express");
const router = express.Router();

const Category = require('../models/category')


router.get('/',function(req, res, next){
    Category.find().then(function(categorys){
        console.log("main.js", categorys)
        res.render('main/index',{
            userInfo: req.userInfo,
            categorys
        })
    })
})

module.exports = router;

