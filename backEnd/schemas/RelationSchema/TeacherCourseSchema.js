//AnswerPaperCollectionSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//同一母卷做卷集合信息表
var TeacherCourseSchema = new Schema({
//教师id
teacherId: {
    type: ObjectId,
     ref: 'teacher'
},
//课堂id
courseId: {
    type: ObjectId,
    ref: 'course'//var CourseModel = mongoose.model('course', CourseSchema)中'course'
},
//额外属性
attr: {
//TODO
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

var TeacherCourseModel = mongoose.model('teachercourse', TeacherCourseSchema)
module.exports = TeacherCourseModel