var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var MotherPaperModel = require('../../schemas/TeacherSchema/MotherPaperSchema')
var LessonModel = require('../../schemas/LessonSchema/LessonSchema')
var AnswerPaperCollectionModel = require('../../schemas/LessonSchema/AnswerPaperCollectionSchema')
var ChoiceQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerChoiceQCollectionSchema')
var FillQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerFillQCollectionSchema')
var ShortQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerShortQCollectionSchema')

module.exports = {
    //通过老师id和courseId获取课堂列表
    getLessonList: function (req, res) {
        var teacherId = req.body.teacherId
        var courseId = req.body.courseId
        LessonModel
            .find({ "teacherId": teacherId, 'courseId': courseId }, ["lessonName", "studentNumber"],
            function (err, lessonList) {
                res.send({ lessonList })
            }).sort({ 'meta.updateAt': -1 })
    },
    //通过lessonId和paperIds将试卷发布到选中的课堂
    //待修改PaperLessonModel可不要，建立的AnswerPaperCollectionSchema可代替
    releasePaper: function (req, res) {
        //传入的数据
        var lessonList = req.body.lessonList
        //测试数据
        // var lessonList = [{ "lessonId": '58c73c5879534a10c243fa11', "studentNumber": 28 },
        // { "lessonId": '58f9dd5b57f99a18d870e3cc', "studentNumber": 23 }]
        var paperId = req.body.paperId
        var TeacherId = req.body.teacherId
        var paperTitle = req.body.paperTitle
        var totalScore = req.body.totalScore
        var choiceQList = req.body.choiceQList
        // var choiceQList = [
        //     {
        //         "choiceQuestionId": '58c73c5879534a10c243fa11',
        //         "stem": "sssss",
        //         "answerOptions": [0, 2],
        //         "questionScore": 5,
        //         "chapter": 2,
        //         "options": [
        //             "1answerOption",
        //             "2answerOption",
        //             "3answerOption",
        //             "4answerOption"
        //         ]
        //     },
        //     {
        //         "choiceQuestionId": '58c73c5879534a10c243fa11',
        //         "stem": "ddddd",
        //         "answerOptions": [0, 1],
        //         "questionScore": 6,
        //         "chapter": 7,
        //         "options": [
        //             "7nswerOption",
        //             "7nswerOption",
        //             "7nswerOption",
        //             "7nswerOption"
        //         ]
        //     }

        // ]
        var fillQList = req.body.fillQList
        // var fillQList = [
        //     {
        //         "fillQuestionId": '58c73c5879534a10c243fa11',
        //         "stem": "sssss",
        //         "questionScore": 5,
        //         "chapter": 2,
        //         "answerOptions": [
        //             "1answerOption",
        //             "2answerOption",
        //             "3answerOption",
        //             "4answerOption"
        //         ]
        //     },
        //     {
        //         "fillQuestionId": '58c73c5879534a10c243fa11',
        //         "stem": "ddddd",
        //         "questionScore": 6,
        //         "chapter": 7,
        //         "answerOptions": [
        //             "7nswerOption",
        //             "7nswerOption",
        //             "7nswerOption",
        //             "7nswerOption"
        //         ]
        //     }

        // ]
        var shortQList = req.body.shortQList
        // var shortQList = [
        //     {
        //         "shortQuestionId": '58c73c5879534a10c243fa11',
        //         "stem": "sssss",
        //         "questionScore": 5,
        //         "chapter": 2,
        //         "answer":
        //         "1answerOption",
        //     },
        //     {
        //         "shortQuestionId": '58c73c5879534a10c243fa11',
        //         "stem": "ddddd",
        //         "questionScore": 6,
        //         "chapter": 7,
        //         "answer":
        //         "7nswerOption",
        //     }

        // ]

        //第一步建立起lesson的做卷集合表
        var createAnswerPaperC = function () {
            for (Index in lessonList) {
                var AnswerPaperCollectionEnTity = new AnswerPaperCollectionModel({
                    "lessonId": lessonList[Index].lessonId,
                    "studentNumber": lessonList[Index].studentNumber,
                    "paperId": paperId,
                    "TeacherId": TeacherId,
                    "paperTitle": paperTitle,
                    "totalScore": totalScore
                })
                AnswerPaperCollectionEnTity.save(function (err, answerpapercollection) {
                    if (err) {
                        console.log(err)
                        // res.json({ "success": 0 })
                    }
                    else {
                        console.log("ok1")
                        createAnswerChoiceQC(answerpapercollection)
                        createAnswerFillQC(answerpapercollection)
                        createAnswerShortQC(answerpapercollection)

                    }
                })
            }
        }
        //第二步建立起三种题型的做题集合表
        var createAnswerChoiceQC = function (answerpapercollection) {
            for (ChoiceIndex in choiceQList) {
                choiceQList[ChoiceIndex].answerPaperCollectionId = answerpapercollection._id
                choiceQList[ChoiceIndex].studentNumber = answerpapercollection.studentNumber
                var ChoiceQuestionCEnTity = new ChoiceQuestionCollectionModel(choiceQList[ChoiceIndex])
                ChoiceQuestionCEnTity.save(function (err, choicequestioncollection) {
                    if (err) {
                        console.log(err)
                        // res.json({ "success": 0 })

                    }
                    else {
                        console.log("ok2")
                    }
                })
            }
        }
        var createAnswerFillQC = function (answerpapercollection) {
            for (fillIndex in fillQList) {
                fillQList[fillIndex].answerPaperCollectionId = answerpapercollection._id
                fillQList[fillIndex].studentNumber = answerpapercollection.studentNumber
                var fillQuestionCEnTity = new FillQuestionCollectionModel(fillQList[fillIndex])
                fillQuestionCEnTity.save(function (err, fillquestioncollection) {
                    if (err) {
                        console.log(err)
                        // res.json({ "success": 0 })
                    }
                    else {
                        console.log("ok")
                    }
                })
            }
        }
        var createAnswerShortQC = function (answerpapercollection) {
            for (shortIndex in shortQList) {
                shortQList[shortIndex].answerPaperCollectionId = answerpapercollection._id
                shortQList[shortIndex].studentNumber = answerpapercollection.studentNumber
                var shortQuestionCEnTity = new ShortQuestionCollectionModel(shortQList[shortIndex])
                shortQuestionCEnTity.save(function (err, shortquestioncollection) {
                    if (err) {
                        console.log(err)
                        // res.json({ "success": 0 })
                    }
                    else {
                        console.log("ok")
                    }
                })
            }
        }
        createAnswerPaperC()
        res.json({ "success": 1 })
    }
}
