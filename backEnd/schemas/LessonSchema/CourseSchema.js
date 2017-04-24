var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//课程信息表
var CourseSchema = new Schema({
  
  //课程名
  courseName:{
    type: String,
  },
  
  //课程老师id
  teacherId:{
   type: ObjectId,
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

CourseSchema.pre('save', function(next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

CourseSchema.statics = {
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

var CourseModel = mongoose.model('course', CourseSchema)
module.exports = CourseModel