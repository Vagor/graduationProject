var mongoose = require('mongoose')
var SAQoiceQuestionSchema = require('../schemas/TeacherSchema/SAQQuestionSchema')
var SAQQuestionModel = mongoose.model('choicequestion', SAQQuestionSchema)

module.exports = SAQQuestionModel
