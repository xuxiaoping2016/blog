
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
    // 分类名称
    name: String,
});

module.exports = Category;