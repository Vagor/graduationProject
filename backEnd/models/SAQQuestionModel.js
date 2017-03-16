var mongoose = require('mongoose')
var SAQQuestionSchema = require('../schemas/TeacherSchema/SAQQuestionSchema')
var SAQQuestionModel = mongoose.model('SAQQuestion', SAQQuestionSchema)

module.exports = SAQQuestionModel
