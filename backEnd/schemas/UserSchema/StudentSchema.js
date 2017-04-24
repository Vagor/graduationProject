//AccountSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//学生信息表
var StduentSchema = new Schema({
  //学生姓名
  StduentName:{  
  	type: String,
  },
  //学校
  school:{  
  	type: String,
  },
  
  //院系
  yuanXi:{
  	type: String,
  },
   
   //学号
  learnNumber:{
  	type: String,
  },
  
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

StduentSchema.pre('save', function(next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

StduentSchema.statics = {
  fetch: function(cb) {//fetch方法取出目前数据库所有数据
    return this
      .find({})
      .sort('meta.updateAt')//按更新时间排序
      .exec(cb)//执行回调方法
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = StduentSchema