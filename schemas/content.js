
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Content = new Schema({
    category: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Category'
    },
    title: String,
    description:{
        type: String,
        default:''
    },
    content:{
        type:String,
        default:''
    }
});

module.exports = Content;