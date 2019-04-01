var mongoose = require('mongoose');

var userSchema = require("../schemas/users")

// 使用 userSchema协议，创建一个名为User的数据模型
module.exports = mongoose.model('User',userSchema)