var mongoose = require('mongoose')
var LessonSchema = require('../schemas/LessonSchema/LessonSchema')
var LessonModel = mongoose.model('lesson', LessonSchema)
module.exports = LessonModel