var mongoose = require('mongoose');

var contentSchema = require("../schemas/content")

// 使用 userSchema协议，创建一个名为User的数据模型
module.exports = mongoose.model('Content',contentSchema)