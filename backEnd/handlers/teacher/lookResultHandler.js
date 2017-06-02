var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var AnswerPaperModel = require('../../schemas/StudentSchema/AnswerPaperSchema')
var AnswerPaperCollectionModel = require('../../schemas/LessonSchema/AnswerPaperCollectionSchema')
module.exports = {
    //获取老师选中课堂下已批改试卷列表
    getCheckPaperList: function (req, res) {
        var teacherId = req.body.teacherId
        var lessonId = req.body.lessonId
        AnswerPaperCollectionModel
            .find({ "teacherId": teacherId, "lessonId": lessonId },
            ["paperId", "paperTitle"],
            function (err, checkPaperCollectionList) {
                res.send({ checkPaperCollectionList })
            })
    },
    //获取选中已批改试卷集合成绩
    getCheckAnswerPaperCollectionScore: function (req, res) {
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
                        console.log("getScore" + PIndex + 1 + ": " + answerPaperList[PIndex].getScore)
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
                    lookAnswerPaperCollection()
                  // res.send({ "success": 1 })
                }
            })
        }
         var lookAnswerPaperCollection = function () {
            AnswerPaperCollectionModel
                .findOne({ "_id": answerPaperCollectionId },
                ["passNumber", "studentNumber", "passPercent", "averageScore"],
                function (err, checkPaperCollectionList) {
                    res.send({ checkPaperCollectionList })
                })
        }
        getAnswerPaperCollection()
    },
}
