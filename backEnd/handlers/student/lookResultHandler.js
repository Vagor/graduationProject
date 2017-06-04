var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var StudentModel = require('../../schemas/UserSchema/StudentSchema')
var AnswerChoiceQModel = require('../../schemas/StudentSchema/AnswerChoiceQSchema')
var AnswerFillQModel = require('../../schemas/StudentSchema/AnswerFillQSchema')
var AnswerShortQModel = require('../../schemas/StudentSchema/AnswerShortQSchema')
var AnswerPaperModel = require('../../schemas/StudentSchema/AnswerPaperSchema')
module.exports = {
    //获取已批改试卷成绩
    getCheckAnswerPaperScore: function (req, res) {
        var studentId = req.body.studentId
        var lessonId = req.body.lessonId
        //var paperId = req.body.paperId
        var answerPaperId = req.body.answerPaperId
        var findAnswerShortQ = function () {
            var shortQScore = 0
            AnswerShortQModel
                .find({ "studentId": studentId, "answerPaperId": answerPaperId },
                ["_id", "getScore"],
                function (err, answerSQuestionList) {
                    for (SIndex in answerSQuestionList) {
                        shortQScore = shortQScore + answerSQuestionList[SIndex].getScore
                    }
                    console.log("shortQScore: " + shortQScore)
                    findAnswerChoiceQ(shortQScore)
                }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
        }
        var findAnswerChoiceQ = function (shortQScore) {
            var choiceQScore = 0
            AnswerChoiceQModel
                .find({ "studentId": studentId, "answerPaperId": answerPaperId },
                ["_id", "getScore"],
                function (err, answerCQuestionList) {
                    for (CIndex in answerCQuestionList) {
                        choiceQScore = choiceQScore + answerCQuestionList[CIndex].getScore
                    }
                    console.log("choiceQScore: " + choiceQScore)
                    findAnswerFillQ(choiceQScore, shortQScore)
                }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
        }
        var findAnswerFillQ = function (choiceQScore, shortQScore) {
            var fillQScore = 0
            AnswerFillQModel
                .find({ "studentId": studentId, "answerPaperId": answerPaperId },
                ["_id", "getScore"],
                function (err, answerFQuestionList) {
                    for (FIndex in answerFQuestionList) {
                        fillQScore = fillQScore + answerFQuestionList[FIndex].getScore
                    }
                    console.log("fillQScore: " + fillQScore)
                    var totalGetScore = choiceQScore + fillQScore + shortQScore
                    updateanswerPaper(totalGetScore)
                }).sort({ 'meta.updateAt': -1 }) //按更新时间排序  
        }
        var updateanswerPaper = function (totalGetScore) {
            console.log("totalGetScore: " + totalGetScore)
            var Pconditions =
                { "_id": answerPaperId }
            var Pupdate = {
                $set: {
                    getScore: totalGetScore,
                    checkOrNot: 2
                }
            }
            var Poptions = {
                upsert: true
            }
            AnswerPaperModel.update(Pconditions, Pupdate, Poptions, function (error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('update Answerpaper ok!')
                    // res.send({ "success": 1 })
                    findAnswerPaper()
                }
            })
        }
        var findAnswerPaper = function () {
            AnswerPaperModel
                .find({ "_id": answerPaperId },
                ["getScore", "totalScore"],
                function (err, data) {
                    var answerPaper = data[0]
                    res.send({ answerPaper })
                })
        }
        findAnswerShortQ()
    },
    //获取学生选择题的答题信息
    getACQList: function (req, res) {
        var answerPaperId = req.body.answerPaperId
        AnswerChoiceQModel
            .find({ "answerPaperId": answerPaperId },
            ["_id", "stem", "options", "answerOption", "getScore", "questionScore"],
            function (err, choiceQList) {
                res.send({choiceQList})
            }).sort({ 'meta.updateAt': -1 }) //按更新时间排序

    },
    //获取学生填空题的答题信息
    getAFQList: function (req, res) {
        var answerPaperId = req.body.answerPaperId
        AnswerFillQModel
            .find({ "answerPaperId": answerPaperId },
            ["_id", "stem",  "answerOptions", "getScore", "questionScore"],
            function (err, FQList) {
                res.send({FQList})
            }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },
    //获取学生简答题的答题信息
    getASQList: function (req, res) {
        var answerPaperId = req.body.answerPaperId
        AnswerShortQModel
            .find({ "answerPaperId": answerPaperId },
            ["_id", "stem",  "answer", "getScore", "questionScore"],
            function (err, sQList) {
                res.send({sQList})
            }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },
}
