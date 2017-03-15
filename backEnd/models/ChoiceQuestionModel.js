var mongoose = require('mongoose')
var ChoiceQuestionSchema = require('../schemas/TeacherSchema/ChoiceQuestionSchema')
var ChoiceQuestionModel = mongoose.model('choicequestion', ChoiceQuestionSchema)
//mongoose.model('choicequestion', choicequestionSchema)中
module.exports = ChoiceQuestionModel
