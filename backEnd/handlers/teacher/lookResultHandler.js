var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var StudentModel = require('../../schemas/UserSchema/StudentSchema')
var LessonClassModel = require('../../schemas/RelationSchema/LessonClassSchema')
var AnswerPaperModel = require('../../schemas/StudentSchema/AnswerPaperSchema')
var AnswerPaperCollectionModel = require('../../schemas/LessonSchema/AnswerPaperCollectionSchema')
var AnswerChoiceQModel = require('../../schemas/StudentSchema/AnswerChoiceQSchema')
var AnswerFillQModel = require('../../schemas/StudentSchema/AnswerFillQSchema')
var AnswerShortQModel = require('../../schemas/StudentSchema/AnswerShortQSchema')
var AnswerChoiceQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerChoiceQCollectionSchema')
var AnswerFillQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerFillQCollectionSchema')
var AnswerShortQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerShortQCollectionSchema')
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
    getCheckAnswerPaperCollectionScore: function (req, res){
var  answerPaperCollectionId = req.body.answerPaperCollectionId
AnswerPaperCollectionModel
            .findOne({ "_id": answerPaperCollectionId  },
            ["passNumber", "studentNumber","passPercent","averageScore"],
            function (err, checkPaperCollectionList) {
                res.send({ checkPaperCollectionList })
            })
    },
}
