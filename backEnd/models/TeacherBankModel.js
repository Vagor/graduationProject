var mongoose = require('mongoose')
var TeacherBankSchema = require('../schemas/TeacherSchema/TeacherBankSchema')
var TeacherBankModel = mongoose.model('teacherbank', TeacherBankSchema)
module.exports = TeacherBankModel