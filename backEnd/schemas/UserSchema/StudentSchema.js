//AccountSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//学生信息表
var StudentSchema = new Schema({
  //学生姓名
  studentName: {
    type: String,
  },
  //学校
  school: {
    type: String,
  },

  //院系
  yuanXi: {
    type: String,
  },
  //班级
  classId: {
    type: ObjectId,
    ref: 'class',//ref:关联的model
  },
  //学号
  learnNumber: {
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

StudentSchema.pre('save', function (next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

StudentSchema.statics = {
  fetch: function (cb) {//fetch方法取出目前数据库所有数据
    return this
      .find({})
      .sort('meta.updateAt')//按更新时间排序
      .exec(cb)//执行回调方法
  },
  findById: function (id, cb) {
    return this
      .findOne({ _id: id })
      .exec(cb)
  }
}

var StudentModel = mongoose.model('student', StudentSchema)
module.exports = StudentModel