var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//课堂信息表
var LessonSchema = new Schema({

  //课堂名
  lessonName: {
    type: String,
  },

  //课堂代号
  lessonCode: {
    type: Number,
  },

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
  //课程名称
  courseName: String,
  
  //课堂学生数
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

LessonSchema.pre('save', function (next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

LessonSchema.statics = {
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

var LessonModel = mongoose.model('lesson', LessonSchema)
module.exports = LessonModel