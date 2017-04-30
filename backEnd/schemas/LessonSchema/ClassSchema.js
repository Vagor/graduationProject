var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//班级信息表
var ClassSchema = new Schema({
  
  //班级名
  className:{
    type: String,
  },
  
  //班级代号
  classCode:{
     type: Number,
  },
  
  //所属课堂id
  teacherId:{
   type: ObjectId,
  },
   
  //班长id
  monitorId:{
   type: ObjectId,
  },
  
  //班级学生数
  studentNumber: Number,

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

ClassSchema.pre('save', function(next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

ClassSchema.statics = {
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

var ClassModel = mongoose.model('class', ClassSchema)
module.exports = ClassModel
