var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var MotherPaperModel = require('../../schemas/TeacherSchema/MotherPaperSchema')
var CoursePaperModel = require('../../schemas/RelationSchema/CoursePaperSchema')

module.exports = {
    //组卷保存基本信息
    createPaper: function (req, res) {
        console.log(req.body)
        //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
        var paperEntity = new MotherPaperModel(req.body)
        paperEntity.save(function (err, paper) {
            if (err) {
                console.log(err)
                res.json({ "success": 0 })
            }
            else {
                console.log("ok")
                var coursePaperEnTity = new CoursePaperModel({
                    "teacherId": req.body.teacherId,
                    "courseId": req.body.courseId,
                    "paperId": paper._id
                })
                coursePaperEnTity.save(function (err, coursePaper) {
                    if (err) {
                        console.log(err)
                        res.json({ "success": 0 })
                    }
                    else {
                        console.log("ok")
                        res.json({ "success": 1 })
                    }
                })
            }
        })
    },
   
}
