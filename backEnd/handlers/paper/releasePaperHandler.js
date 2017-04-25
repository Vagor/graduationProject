var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var MotherPaperModel = require('../../schemas/TeacherSchema/MotherPaperSchema')
var LessonModel = require('../../schemas/LessonSchema/LessonSchema')
var PaperLessonModel = require('../../schemas/RelationSchema/paperLessonSchema')
module.exports = {
    //通过老师id和courseId获取课堂列表
    getLessonList: function (req, res) {
        var teacherId = req.body.teacherId
        var courseId = req.body.courseId
        LessonModel
            .find({ "teacherId": teacherId, 'courseId': courseId }, ["lessonName"],
            function (err, lessonList) {
                res.send({ lessonList })
            }).sort({ 'meta.updateAt': -1 })
    },
    //通过lessonId和paperIds将试卷发布到选中的课堂
    releasePaper: function (req, res) {
        //var lessonIds = req.body.lessonIds
        var lessonIds = ['58c73c5879534a10c243fa11','58f9dd5b57f99a18d870e3cc']
        var paperId = req.body.paperId
        for (Index in lessonIds) {
            var PaperLessonEnTity = new PaperLessonModel({
                "lessonId": lessonIds[Index],
                "paperId": paperId
            })
            PaperLessonEnTity.save(function (err, PaperLesson) {
                if (err) {
                    console.log(err)
                   // res.json({ "success": 0 })
                }
                else {
                    console.log("ok")
                }
            })
        }
     res.json({ "success": 1 })
    },
}
