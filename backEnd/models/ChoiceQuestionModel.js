var mongoose = require('mongoose')
var ChoiceQuestionSchema = require('../schemas/TeacherSchema/ChoiceQuestionSchema')
var ChoiceQuestionModel = mongoose.model('choiceQuestion', ChoiceQuestionSchema)

module.exports = ChoiceQuestionModel
