var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
const co = require('co');
var CourseModel = require('../../schemas/LessonSchema/CourseSchema')
var MotherPaperModel = require('../../schemas/TeacherSchema/MotherPaperSchema')
var ChoiceQuestionModel = require('../../schemas/TeacherSchema/ChoiceQuestionSchema')
var FITBQuestionModel = require('../../schemas/TeacherSchema/FITBQuestionSchema')
var SAQQuestionModel = require('../../schemas/TeacherSchema/SAQQuestionSchema')
var TeacherCourseModel = require('../../schemas/RelationSchema/TeacherCourseSchema')

module.exports = {
    //通过老师的ID获取老师所教授的课程
    //TeacherCourseModel没有建立的必要，因为LessonModel可以替代
    //推翻楼上的看法，LessonModel中多个课堂表对应一个courseId，返回结果课程会重复。
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
        MotherPaperModel.find({ 'teacherId': teacherId, 'courseId': courseId },
            ["paperTitle","totalScore", "paperDesc", "timeLimit", " _id", "share"])
            .sort({ 'meta.updateAt': -1 })
            .exec(function (err, paperList) {
                res.send({ paperList })
            })
    },
    //通过老师的ID获取老师所教授的课程和第一门课程的所有所有试卷
    initPaperBank: function (req, res) {
        var teacherId = req.body.teacherId
        //var courseId = req.body.courseId
        var courseList = []
        var paperLists = []
        var getCList = function () {//获取老师所教授的课程
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
                  getPaperList(courseList[0].courseId)
                })
        }
        var getPaperList = function (courseId) {//获取老师所教授这门课程的所有所有试卷
            MotherPaperModel.find({ 'teacherId': teacherId, 'courseId': courseId },
                ["paperTitle", "paperDesc", "timeLimit", " _id", "share"])
                .sort({ 'meta.updateAt': -1 })
                .exec(function (err, paperList) {
                    res.send({courseList,paperList})
                })
        }
        getCList()
    },


    //     initPaperBank: function (req, res) {
    //         var teacherId = req.body.teacherId
    //         var courseList = []
    //         var paperLists = []
    //         //获取老师所教授的课程ID和name
    //         TeacherCourseModel
    //             .find({ 'teacherId': teacherId }, ["_id", "courseId"])
    //             .populate(
    //             'courseId',
    //             '_id courseName'
    //             )
    //             .sort({ 'meta.updateAt': -1 })
    //             .exec(function (err, data) {
    //                 // 数据格式化
    //                 console.log(data)
    //                 for (var i = 0; i < data.length; i++) {
    //                     courseList[i] = {}
    //                     courseList[i].courseName = data[i].courseId.courseName
    //                     courseList[i].courseId = data[i].courseId._id
    //                 }
    //                 //通过courseId获取课程下面的所有试卷

    //                 // for in 方法
    //                 for (index in courseList) {
    //                     MotherPaperModel
    //                         .find({ 'teacherId': teacherId, 'courseId': courseList[index].courseId }, ["paperId"])
    //                         .populate(
    //                         'paperId',
    //                         'paperTitle paperDesc timeLimit _id'
    //                         )
    //                         .sort({ 'meta.updateAt': -1 })
    //                         .exec(function (err, paperData) {
    //                             var paperList = []
    //                             for (paperIndex in paperData) {
    //                                 paperList.push(paperData[paperIndex].paperId)
    //                             }
    //                             paperLists.push(paperList)
    //                             console.log(paperList)
    //                         })
    //                 }

    //                 // // promise 方式
    //                 // let promise = new Promise(function (resolve, reject) {
    //                 //     console.log('promise')

    //                 //     for (index in courseList) {
    //                 //         MotherPaperModel
    //                 //             .find({ 'teacherId': teacherId, 'courseId': courseList[index].courseId }, ["paperId"])
    //                 //             .populate(
    //                 //             'paperId',
    //                 //             'paperTitle paperDesc timeLimit _id'
    //                 //             )
    //                 //             .sort({ 'meta.updateAt': -1 })
    //                 //             .exec(function (err, paperData) {
    //                 //                 var paperList = []
    //                 //                 for (paperIndex in paperData) {
    //                 //                     paperList.push(paperData[paperIndex].paperId)
    //                 //                     console.log(paperList)
    //                 //                 }
    //                 //                 paperLists.push(paperList)
    //                 //                 console.log(paperLists)

    //                 //             })
    //                 //     }
    //                 //     resolve()
    //                 // })
    //                 // promise.then(function () {
    //                 //     console.log('send')

    //                 //     res.send(paperLists)
    //                 // })


    //                 // // forEach的遍历方式
    //                 // courseList.forEach(function(c) {
    //                 //     MotherPaperModel
    //                 //         .find({ 'teacherId': teacherId, 'courseId': c.courseId }, ["paperId"])
    //                 //         .populate(
    //                 //         'paperId',
    //                 //         'paperTitle paperDesc timeLimit _id'
    //                 //         )
    //                 //         .sort({ 'meta.updateAt': -1 })
    //                 //         .exec(function (err, paperData) {
    //                 //             var paperList = []
    //                 //             for (paperIndex in paperData) {
    //                 //                 paperList.push(paperData[paperIndex].paperId)
    //                 //             }
    //                 //             paperLists.push(paperList)
    //                 //             console.log(paperList)
    //                 //         })
    //                 // })
    //                 // console.log('send')
    //             })

    // >>>>>>> origin/master
    //     },
    //通过课程的ID和老师的Id获取老师所教授这门课程的所有题目
    getAllQList: function (req, res) {
        var AllQList = []
        var FITBQuestionList = []
        var SAQQuestionList = []
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
                AllQList[0] = { FITBQuestionList, SAQQuestionList, choiceQuestionList }
                res.send({ AllQList })
            }
            ).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },

}

