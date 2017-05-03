var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var AnswerPaperModel = require('../../schemas/StudentSchema/AnswerPaperSchema')
var AnswerPaperCollectionModel = require('../../schemas/LessonSchema/AnswerPaperCollectionSchema')
var AnswerChoiceQModel = require('../../schemas/StudentSchema/AnswerChoiceQSchema')
var AnswerFillQModel = require('../../schemas/StudentSchema/AnswerFillQSchema')
var AnswerShortQModel = require('../../schemas/StudentSchema/AnswerShortQSchema')
// var AnswerChoiceQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerChoiceQCollectionSchema')
// var AnswerFillQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerFillQCollectionSchema')
var AnswerShortQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerShortQCollectionSchema')
module.exports = {
    //获取老师选中课堂下待批改试卷列表
    getWaitCheckPaperList: function (req, res) {
        //  var teacherId = req.body.teacherId
        var lessonId = req.body.lessonId
        AnswerPaperCollectionModel
            .find({ "lessonId": lessonId }, ["_id", "paperId", "paperTitle"],
            function (err, waitCheckPaperCollectionList) {
                res.send({ waitCheckPaperCollectionList })
            }).sort({ 'meta.updateAt': -1 }) //按更新时间排序

    },
    //通过answerPaperCollectionId获取选中的待批改试卷中简答题试题集合列表
    getWCPaperSQCollectionList: function (req, res) {
        var answerPaperCollectionId = req.body.answerPaperCollectionId
        AnswerShortQuestionCollectionModel
            .find({ "answerPaperCollectionId": answerPaperCollectionId },
            ["_id", "shortQuestionId", "stem", "chapter", "answer", "questionScore"],
            function (err, shortQCollectionList) {
                res.send({ shortQCollectionList })
            }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },
    //获取选定简答题学生答题列表
    getAnswerShortQCollection: function (req, res) {
        var answerSQuestionCollectionId = req.body.answerSQuestionCollectionId
        AnswerShortQModel
            .find({ "answerSQuestionCollectionId": answerSQuestionCollectionId },
            ["_id", "answerPaperId", "studentName", "studentAnswer"],
            function (err, answerSQuestionList) {
                res.send({ answerSQuestionList })
            }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },
    //保存老师对该学生此简答题打分
    saveAnswerSQScore: function (req, res) {
        var answerSQuestionId = req.body.answerSQuestionId
        var answerPaperId = req.body.answerPaperId
        var getScore = req.body.getScore
        var questionType = req.body.questionType
        var updateAnswerShortQ = function () {
            var conditions = {
                _id: answerSQuestionId
            }
            var update = {
                $set: {
                    getScore: getScore,
                    checkOrNot: 2
                }
            }
            var options = {
                upsert: true
            }
            AnswerShortQModel.update(conditions, update, options, function (error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('update AnswerShortQ ok!')
                    //若此题是试卷中最后一题questionType为1，（开始对此学生answerPaper统计打分，并把是否批改改为批改）
                    if (questionType == 1) {
                        findAnswerShortQ()
                    }
                }
            })
        }
        var findAnswerShortQ = function () {
            var shortQScore = 0
            AnswerShortQModel
                .find({ "answerPaperId": answerPaperId },
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
                .find({ "answerPaperId": answerPaperId },
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
                .find({ "answerPaperId": answerPaperId },
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
            var Pconditions = {
                _id: answerPaperId
            }
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
                    res.send({ "success": 1 })
                }
            })
        }
        updateAnswerShortQ()
    },
    //此简答题所有学生答题批改完毕保存信息
    saveAllAnswerSQ: function (req, res) {
        var answerSQuestionCollectionId = req.body.answerSQuestionCollectionId
        var findAnswerShortQ = function () {
            var shortQScore = 0
            var averageScore = 0
            AnswerShortQModel
                .find({ "answerShortQCollectionId": answerSQuestionCollectionId },
                ["_id", "getScore"],
                function (err, answerSQuestionList) {
                    for (SIndex in answerSQuestionList) {
                        shortQScore = shortQScore + answerSQuestionList[SIndex].getScore
                    }
                    console.log("shortQScore: " + shortQScore)
                    averageScore = shortQScore / (answerSQuestionList.length)
                    updateASQuestionCollection(averageScore)
                }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
        }
        var updateASQuestionCollection = function (averageScore) {
            console.log("averageScore: " + averageScore)
            var conditions = {
                _id: answerSQuestionCollectionId
            }
            var update = {
                $set: {
                    averageScore: averageScore,
                    checkOrNot: 2
                }
            }
            var options = {
                upsert: true
            }
            AnswerShortQuestionCollectionModel.update(conditions, update, options, function (error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('update answerSQuestionCollection ok!')
                    res.send({ "success": 1 })
                }
            })
        }
        findAnswerShortQ()
    },
    //此卷所有试题批改完毕，保存信息
    saveAnswerPaperCollection: function (req, res) {
        var answerPaperCollectionId = req.body.answerPaperCollectionId
        var getAnswerPaperCollection = function () {
            AnswerPaperCollectionModel
                .find({ "_id": answerPaperCollectionId },
                ["_id", "totalScore", "studentNumber"],
                function (err, paper) {
                    var totalScore = paper[0].totalScore
                    var studentNumber = paper[0].studentNumber
                    findAnswerPaper(totalScore, studentNumber)
                }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
        }
        var findAnswerPaper = function (totalScore, studentNumber) {
            var paperScore = 0
            var averageScore = 0
            var passScore = 0
            //默认及格分为满分60%
            var passNumber = 0
            //合格人数
            var passPercent = 0
            //合格率
            AnswerPaperModel
                .find({ "answerPaperCollectionId": answerPaperCollectionId },
                ["_id", "getScore", "totalScore"],
                function (err, answerPaperList) {
                     passScore = totalScore * 6 / 10
                    console.log("passScore: " + passScore)
                    for (PIndex in answerPaperList) {
                    console.log("getScore" + PIndex+1+": "+answerPaperList[PIndex].getScore)      
                        paperScore = paperScore + answerPaperList[PIndex].getScore
                        if (answerPaperList[PIndex].getScore >= passScore)
                        { passNumber++ }
                    }
                    console.log("paperScore: " + paperScore)
                    console.log("passNumber: " + passNumber)
                    passPercent = passNumber / studentNumber
                    averageScore = paperScore / (answerPaperList.length)
                    updateAnswerPaperCollection(averageScore, passPercent, passNumber)
                }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
        }
        var updateAnswerPaperCollection = function (averageScore, passPercent, passNumber) {
            console.log("averageScore: " + averageScore)
            var conditions = {
                _id: answerPaperCollectionId
            }
            var update = {
                $set: {
                    averageScore: averageScore,
                    passPercent: passPercent,
                    passNumber: passNumber,
                    checkOrNot: 2
                }
            }
            var options = {
                upsert: true
            }
            AnswerPaperCollectionModel.update(conditions, update, options, function (error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('update AnswerPaperCollection ok!')
                    res.send({ "success": 1 })
                }
            })
        }
        getAnswerPaperCollection()
    },
}
