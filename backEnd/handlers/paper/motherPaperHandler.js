var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var MotherPaperModel = require('../../schemas/TeacherSchema/MotherPaperSchema')
var CoursePaperModel = require('../../schemas/RelationSchema/CoursePaperSchema')
var PaperChoiceQModel = require('../../schemas/RelationSchema/PaperChoiceQSchema')
var PaperFQModel = require('../../schemas/RelationSchema/PaperFQSchema')
var PaperSQModel = require('../../schemas/RelationSchema/PaperSQSchema')

module.exports = {
    //组卷保存基本信息
    createPaper: function (req, res) {
        //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
        var paperEntity = new MotherPaperModel(req.body)
        paperEntity.save(function (err, paper) {
            if (err) {
                console.log(err)
                res.json({ "success": 0 })
            }
            else {
                console.log("ok")
                //paper基本信息保留成功，保存paper和teacher与course关系表
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
    //通过paperId返回选择题信息
    getCQList: function (req, res) {
        var paperId = req.body.paperId
        PaperChoiceQModel
            .find({ 'paperId': paperId }, ["_id", "choiceQId"])
            .populate(
            'choiceQId',//表id [path]
            ' stem teacherId chapter options  courseId answerOption'//[select] 
            )
            .sort({ 'meta.updateAt': -1 })
            .exec(function (err, data) {
                var choiceQList = []
                for (Index in data) {
                    choiceQList.push(data[Index].choiceQId)
                }
                res.send({choiceQList})
            })
    },
     //通过paperId返回填空题信息
    getFQList: function (req, res) {
        var paperId = req.body.paperId
        PaperFQModel
            .find({ 'paperId': paperId }, ["_id", "fQId"])
            .populate(
            'fQId',//表id [path]
            ' stem teacherId chapter  courseId answerOptions'//[select] 
            )
            .sort({ 'meta.updateAt': -1 })
            .exec(function (err, data) {
                var fQList = []
                for (Index in data) {
                    fQList.push(data[Index].fQId)
                }
                res.send({fQList})
            })
    },
 //通过paperId返回简答题信息
    getSQList: function (req, res) {
        var paperId = req.body.paperId
        PaperSQModel
            .find({ 'paperId': paperId }, ["_id", "sQId"])
            .populate(
            'sQId',//表id [path]
            ' stem teacherId chapter courseId answer'//[select] 
            )
            .sort({ 'meta.updateAt': -1 })
            .exec(function (err, data) {
                var sQList = []
                for (Index in data) {
                    sQList.push(data[Index].sQId)
                }
                res.send({sQList})
            })
    },
}
