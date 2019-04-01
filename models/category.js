var mongoose = require('mongoose');

var categorySchema = require("../schemas/category")

// 使用 userSchema协议，创建一个名为User的数据模型
module.exports = mongoose.model('Category',categorySchema)