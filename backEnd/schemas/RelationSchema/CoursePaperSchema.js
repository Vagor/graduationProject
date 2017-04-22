var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//课程试卷关系表
var CoursePaperSchema = new Schema({
//老师id
teacherId:{
    type: ObjectId,
    ref: 'teacher'
},
//课程id
courseId: {
    type: ObjectId,
    ref: 'course'//var CourseModel = mongoose.model('course', CourseSchema)中'course'
},
paperId:{
    type: ObjectId,
    ref: 'motherpaper'
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

var CoursePaperModel = mongoose.model('coursepaper', CoursePaperSchema)
module.exports = CoursePaperModel