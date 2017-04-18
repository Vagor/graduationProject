var mongoose = require('mongoose')
var MotherPaperSchema = require('../schemas/TeacherSchema/MotherPaperSchema')
var MotherPaperModel = mongoose.model('motherpaper', MotherPaperSchema)

module.exports = MotherPaperModel
