var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var TeacherLessonModel = require('../../models/TeacherLessonModel')
var LessonModel = require('../../models/LessonModel')
var CourseModel = require('../../schemas/LessonSchema/CourseSchema')
var MotherPaperModel = require('../../schemas/TeacherSchema/MotherPaperSchema')
var ChoiceQuestionModel = require('../../models/ChoiceQuestionModel')
var FITBQuestionModel = require('../../models/FITBQuestionModel')
var SAQQuestionModel = require('../../models/SAQQuestionModel')
var TeacherCourseModel = require('../../schemas/RelationSchema/TeacherCourseSchema')
var CoursePaperModel = require('../../schemas/RelationSchema/CoursePaperSchema')


module.exports = {
    //通过老师的ID获取老师所教授的课程
    getCList: function (req, res) {
        var teacherId = req.body.teacherId
        LessonModel
            .find({ 'teacherId': teacherId }, ["-_id", 'lessonCode', 'name'], function (err, data) {
                var courseList = []
                for (var i = 0; i < data.length; i++) {
                    courseList[i] = {}
                    var name = data[i].name
                    var lessonCode = data[i].lessonCode
                    courseList[i].courseName = name
                    courseList[i].courseId = lessonCode
                }
                res.send({ courseList })
            }
            ).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },
    //通过课程的ID和老师的ID获取老师所教授这门课程的所有所有试卷
    getPaperList: function (req, res) {
        var teacherId = req.body.teacherId
        var courseId = req.body.courseId
        MotherPaperModel
            .find({ 'teacherId': teacherId, "courseId": courseId }, ["_id", 'paperTitle'],
            function (err, data) {
                var paperList = []
                for (var i = 0; i < data.length; i++) {
                    paperList[i] = {}
                    paperList[i].paperName = data[i].paperTitle
                    paperList[i].paperId = data[i]._id
                }
                res.send({ paperList })
            }
            ).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },

    //通过老师的ID获取老师所教授的课程和所教授这门课程的所有所有试卷
    initPaperBank: function (req, res) {
        var teacherId = req.body.teacherId
        var courseList = []
        var paperLists = []
        //获取老师所教授的课程ID和name
        TeacherCourseModel
            .find({ 'teacherId': teacherId }, ["_id", "courseId"])
            .populate(
            'courseId',
            '_id courseName'
            )
            .sort({ 'meta.updateAt': -1 })
            .exec(function (err, data) {
                // 数据格式化
                for (var i = 0; i < data.length; i++) {
                    courseList[i] = {}
                    courseList[i].courseName = data[i].courseId.courseName
                    courseList[i].courseId = data[i].courseId._id
                }
                //通过courseId获取课程下面的所有试卷
                for (index in courseList) {
                    CoursePaperModel
                        .find({ 'teacherId': teacherId, 'courseId': courseList[index].courseId }, ["paperId"])
                        .populate(
                        'paperId',
                        'paperTitle paperDesc timeLimit _id'
                        )
                        .sort({ 'meta.updateAt': -1 })
                        .exec(function (err, paperData) {
                            var paperList = []
                            for (paperIndex in paperData) {
                                paperList.push(paperData[paperIndex].paperId)
                            }
                            console.log('paperList:' + paperList)
                            paperLists.push(paperList)
                            if (index + 1 == courseList.length) {
                                res.send(paperLists)
                            }
                        })
                }
            })

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
                FITBQuestionList = data
            }
            ).sort({ 'meta.updateAt': -1 }) //按更新时间排
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
                AllQList[0] = { FITBQuestionList, SAQQuestionLis, choiceQuestionList }
                res.send({ AllQList })
            }
            ).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },

}

