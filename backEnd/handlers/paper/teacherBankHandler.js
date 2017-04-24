var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var CourseModel = require('../../schemas/LessonSchema/CourseSchema')
var MotherPaperModel = require('../../schemas/TeacherSchema/MotherPaperSchema')
var ChoiceQuestionModel = require('../../schemas/TeacherSchema/ChoiceQuestionSchema')
var FITBQuestionModel = require('../../schemas/TeacherSchema/FITBQuestionSchema')
var SAQQuestionModel = require('../../schemas/TeacherSchema/SAQQuestionSchema')
var TeacherCourseModel = require('../../schemas/RelationSchema/TeacherCourseSchema')
var CoursePaperModel = require('../../schemas/RelationSchema/CoursePaperSchema')


module.exports = {
    //通过老师的ID获取老师所教授的课程
    getCList: function (req, res) {
        var teacherId = req.body.teacherId
        var courseList = []
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
                res.send({ courseList })
            })
    },
    //通过课程的ID和老师的ID获取老师所教授这门课程的所有所有试卷
    getPaperList: function (req, res) {
        var teacherId = req.body.teacherId
        var courseId = req.body.courseId
        CoursePaperModel
            .find({ 'teacherId': teacherId, 'courseId': courseId }, ["paperId"])
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
                res.send({ paperList })
            })
    },
    //通过老师的ID获取老师所教授的课程和所教授这门课程的所有所有试卷
    initPaperBank: function (req, res) {
        var teacherId = req.body.teacherId
        var courseList = []
        var paperLists = []

        // 新建一个promise
        //获取老师所教授的课程ID和name
        TeacherCourseModel
            .find({ 'teacherId': teacherId }, ["_id", "courseId"])
            .populate(
            'courseId',
            '_id courseName'
            )
            .sort({ 'meta.updateAt': -1 })
            .exec(function (err, data) {
                var promise = new Promise(function (resolve, reject) {
                    // 数据格式化
                    for (var i = 0; i < data.length; i++) {
                        courseList[i] = {}
                        courseList[i].courseName = data[i].courseId.courseName
                        courseList[i].courseId = data[i].courseId._id
                    }
                    //通过courseId获取课程下面的所有试卷
                    for (index in courseList) {
                        MotherPaperModel
                            .find({ 'teacherId': teacherId, 'courseId': courseList[index].courseId }, ["paperId"])
                            .populate(
                            'paperId',
                            'paperTitle paperDesc timeLimit _id'
                            )
                            .sort({ 'meta.updateAt': -1 })
                            .exec(function (err, paperData) {
                                var paperList = []
                                new Promise(function (resolve, reject) {
                                    for (paperIndex in paperData) {
                                        paperList.push(paperData[paperIndex].paperId)
                                    }
                                })
                                    .then(function () {
                                        console.log('paperList:' + paperList)
                                        paperLists.push(paperList)
                                    })
                                    .then(function () {
                                        if ((index + 1) == courseList.length) {
                                            console.log('paperLists:' + paperLists)
                                             res.send({ paperLists })
                                        }
                                    })        
                            

                            })

                }
                
            })
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

