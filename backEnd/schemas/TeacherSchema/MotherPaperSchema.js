//MatherPaperSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

//母卷信息表
var MotherPaperSchema = new Schema({
  //老师id
  teacherId: {
    type: ObjectId,
    ref: 'teacher'
  },
  //课程id
  courseId: {
    type: ObjectId,
    ref: 'course'//var CourseModel = mongoose.model('course', CourseSchema)中'course'
  },
  //标题
  paperTitle: String,

  //简介
  paperDesc: String,

  //限时：
  timeLimit: Number,

  //是否共享
  share: {
    type: Boolean,
    default: 1,
  },

  //总分
  totalScore: Number,

  //题数：
  questioNum: Number,

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

MotherPaperSchema.pre('save', function (next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

MotherPaperSchema.statics = {
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

var MotherPaperModel = mongoose.model('motherpaper', MotherPaperSchema)
module.exports = MotherPaperModel