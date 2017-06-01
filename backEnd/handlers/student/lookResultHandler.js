var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var StudentModel = require('../../schemas/UserSchema/StudentSchema')
var AnswerPaperModel = require('../../schemas/StudentSchema/AnswerPaperSchema')
module.exports = {
    //获取已批改试卷成绩
    getCheckAnswerPaperScore: function (req, res) {
        var studentId = req.body.studentId
        var lessonId = req.body.lessonId
        var paperId = req.body.paperId
        AnswerPaperModel
            .find({ "studentId": studentId, "lessonId": lessonId, "paperId": paperId },
            ["getScore", "totalScore"],
            function (err, data) {
                var answerPaper = data[0]
                res.send({ answerPaper })
            })
    },
}
