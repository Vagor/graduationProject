var mongoose = require('mongoose')
var ChoiceQuestionSchema = require('../schemas/TeacherSchema/ChoiceQuestionSchema')
var ChoiceQuestionModel = mongoose.model('choicequestion', ChoiceQuestionSchema)

module.exports = ChoiceQuestionModel
