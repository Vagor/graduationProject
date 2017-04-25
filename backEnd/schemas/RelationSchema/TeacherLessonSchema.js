//AnswerPaperCollectionSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//老师课堂关系表
var TeacherLessonSchema = new Schema({
//教师id
teacherId: {
    type: ObjectId,
    ref: 'teacher'
},
//课堂id
lessonId: {
    type: ObjectId,
    ref: 'lesson'//var LessonModel = mongoose.model('lesson', LessonSchema)中'lesson'
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

var TeacherLessonModel = mongoose.model('teacherlesson', TeacherLessonSchema)
module.exports = TeacherLessonModel
