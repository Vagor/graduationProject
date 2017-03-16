var mongoose = require('mongoose')
var FITBQuestionSchema = require('../schemas/TeacherSchema/FITBQuestionSchema')
var FITBQuestionModel = mongoose.model('FITBQuestion', FITBQuestionSchema)

module.exports = FITBQuestionModel
