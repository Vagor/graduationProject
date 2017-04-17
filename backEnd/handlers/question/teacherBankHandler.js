var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var TeacherBankModel = require('../../models/TeacherBankModel')
var TeacherLessonModel = require('../../models/TeacherLessonModel')
var LessonModel = require('../../models/LessonModel')
var MotherPaperModel = require('../../models/MotherPaperModel')
var ChoiceQuestionModel = require('../../models/ChoiceQuestionModel')
var FITBQuestionModel = require('../../models/FITBQuestionModel')
var SAQQuestionModel = require('../../models/SAQQuestionModel')


module.exports = {
    //通过老师的ID获取老师所教授的课程
    getCList: function (req, res) {

        var teacherId = req.body.teacherId
        LessonModel
            .find({ 'teacherId': teacherId }, ["-_id", 'lessonCode', 'name'], function (err, data) {
                var courseList = []
                for (var i = 0; i < data.length; i++) {
                    courseList[i] ={}
                    var name = data[i].name
                    var lessonCode = data[i].lessonCode
                    courseList[i].courseName = name
                    courseList[i].courseId = lessonCode
                    
                }
                res.send({ courseList })
            }
            ).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },
    // TeacherLessonModel
    //     .find({ 'teacherId': teacherId }, { _id: 0 })
    //     .populate(
    //     'lessonId',
    //     '-_id lessonCode name'
    //     )
    //     .sort({ 'meta.updateAt': -1 })
    //     .exec(function (err, courseList) {
    //         res.send({ courseList })
    //     })

    //通过课程的ID和老师的ID获取老师所教授这门课程的所有所有试卷
    getPaperList: function (req, res) {

        var teacherId = req.body.teacherId
        var courseId = req.body.courseId

        MotherPaperModel
            .find({ 'teacherId': teacherId, "courseId": courseId }, ["_id", 'name'], function (err, data) {
                var paperList = []
                for (var i = 0; i < data.length; i++) {

                    paperList[i] ={}
                    paperList[i].paperName = data[i].name
                    paperList[i].paperId = data[i]._id
                }
                res.send({ paperList })
            }
            ).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },

    //通过课程的ID和老师的Id获取老师所教授这门课程的所有题目
    getAllQList: function (req, res) {
      var AllQList = []
      var FITBQuestionList = []
      var SAQQuestionLis = []
        var teacherId = req.body.teacherId
        var courseId = req.body.courseId
        FITBQuestionModel
            .find({ 'teacherId': teacherId, "courseId": courseId },
             ["_id", 'stem', 'chapter'], 
             function (err, data) {

                  FITBQuestionList =data
            }
            ).sort({ 'meta.updateAt': -1 }) //按更新时间排序

        SAQQuestionModel
            .find({ 'teacherId': teacherId, "courseId": courseId },
             ["_id", 'stem', 'chapter'],
              function (err, data) {

                  SAQQuestionList = data
            }
            ).sort({ 'meta.updateAt': -1 }) //按更新时间排序

        ChoiceQuestionModel
            .find({ 'teacherId': teacherId, "courseId": courseId }, 
            ["_id", 'stem', 'chapter'],
             function (err, choiceQuestionList) {
         AllQList[0] = {FITBQuestionList ,SAQQuestionLis, choiceQuestionList }
                res.send({AllQList })
            }
            ).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },

}


