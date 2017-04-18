var mongoose = require('mongoose')
var TeacherLessonSchema = require('../schemas/RelationSchema/TeacherLessonSchema')
var TeacherLessonModel = mongoose.model('teacherlesson', TeacherLessonSchema)

module.exports = TeacherLessonModel