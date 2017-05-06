var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var MotherPaperModel = require('../../schemas/TeacherSchema/MotherPaperSchema')
var PaperChoiceQModel = require('../../schemas/RelationSchema/PaperChoiceQSchema')
var PaperFQModel = require('../../schemas/RelationSchema/PaperFQSchema')
var PaperSQModel = require('../../schemas/RelationSchema/PaperSQSchema')
var ChoiceQuestionModel = require('../../schemas/TeacherSchema/ChoiceQuestionSchema')
var FITBQuestionModel = require('../../schemas/TeacherSchema/FITBQuestionSchema')
var SAQQuestionModel = require('../../schemas/TeacherSchema/SAQQuestionSchema')


// 陶林伟修改后端文件
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
                var paperId = paper._id
                res.send({ paperId })
            }
        })
    },
    //通过选择题Id数组，获取一组题目信息
    getCQListByQIdArr: function (req, res) {
        var choiceQIds = req.body.choiceQIds
         //choiceQIds=["58c66fcb07f87ba944015a24","58c8f485c7129e2b9cfd086a"]
        ChoiceQuestionModel.find({
            '_id': choiceQIds
        }, [
                '_id', 'stem', 'chapter', "options", "answerOptions"
            ], function (err, choiceQuestionList) {
                res.send({ choiceQuestionList })
            }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },
    //通过填空题Id数组，获取一组题目信息
    getFQListByQIdArr: function (req, res) {
        var fillQIds = req.body.fillQIds
        // fillQIds=["58f2dffcbadd8c813c4deef0","58fe9c58b070a8194cee6023"]
        FITBQuestionModel.find({
            '_id': fillQIds
        }, [
                '_id', 'stem', 'chapter', "answerOptions"
            ], function (err, fillQuestionList) {
                res.send({ fillQuestionList })
            }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },
    //通过简答题Id数组，获取一组题目信息
    getSQListByQIdArr: function (req, res) {
        var shortQIds = req.body.shortQIds
        //  shortQIds=["58fea184b070a8194cee6025","58fea204b070a8194cee6026"]
        SAQQuestionModel.find({
            '_id': shortQIds
        }, [
                '_id', 'stem', 'chapter', "answer"
            ], function (err, shortQuestionList) {
                res.send({ shortQuestionList })
            }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
    },
    //通过paperId返回选择题信息
    getCQList: function (req, res) {
        var paperId = req.body.paperId
        PaperChoiceQModel
            .find({ 'paperId': paperId }, ["_id", "choiceQId"])
            .populate(
            'choiceQId',//表id [path]
            ' stem teacherId chapter options  courseId answerOptions'//[select] 
            )
            .sort({ 'meta.updateAt': -1 })
            .exec(function (err, data) {
                var choiceQList = []        
                for (Index in data) {
                    choiceQList.push(data[Index].choiceQId)
                }
                res.send({ choiceQList })
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
                res.send({ fQList })
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
                res.send({ sQList })
            })
    },
    //将三种题型拉入组卷，拉入的信息包含各题分值和总分值
    pullQuestions: function (req, res) {
        var paperId = req.body.paperId
        //更新总分
        var conditions = { _id: paperId }
        var update = {
            $set: { totalScore: req.body.totalScore }
        }
        var options = {
            upsert: true
        }
        MotherPaperModel.update(conditions, update, options, function (error) {
            if (error) {
                console.log(error)
                res.json({ "success": 0 })
            } else {
                console.log('update ok!')
                res.json({ "success": 1 })
            }
        })
        //建立选择题与组卷关系表并存入分值
        var choiceQList = req.body.choiceQList
        // var choiceQList = [
        //     {
        //         choiceQId: "58c8f39ec7129e2b9cfd0868",
        //         questionScore: 56
        //     },
        //     {
        //         choiceQId: "58c8f39ec7129e2b9cfd0868",
        //         questionScore: 78
        //     }
        // ]
        for (Index in choiceQList) {
            var paperChoiceEntity = new PaperChoiceQModel({
                paperId: paperId,
                choiceQId: choiceQList[Index].choiceQId,
                attr: { questionScore: choiceQList[Index].questionScore },
            })
            paperChoiceEntity.save(function (err, paperChoice) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("create paper choice ralation ok")
                }
            })
        }
        //建立填空题与组卷关系表并存入分值  
        var fQList = req.body.fQList
        // var fQList= [
        //     {
        //         fQId: "58c8f39ec7129e2b9cfd0868",
        //         questionScore: 56
        //     },
        //     {
        //         fQId: "58c8f39ec7129e2b9cfd0868",
        //         questionScore: 78
        //     }
        // ]
        for (Index in fQList) {
            var PaperFQEntity = new PaperFQModel({
                paperId: paperId,
                fQId: fQList[Index].fQId,
                attr: { questionScore: fQList[Index].questionScore },
            })
            PaperFQEntity.save(function (err, PaperFQ) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("create paper fillQuestion ralation ok")
                }
            })
        }
        //建立简答题与组卷关系表并存入分值  
        var sQList = req.body.sQList
        // var sQList= [
        //     {
        //         sQId: "58c8f39ec7129e2b9cfd0868",
        //         questionScore: 56
        //     },
        //     {
        //         sQId: "58c8f39ec7129e2b9cfd0868",
        //         questionScore: 78
        //     }
        // ]
        for (Index in sQList) {
            var PapersQEntity = new PaperSQModel({
                paperId: paperId,
                sQId: sQList[Index].sQId,
                attr: { questionScore: sQList[Index].questionScore },
            })
            PapersQEntity.save(function (err, PapersQ) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("create paper SQuestion ralation ok")
                }
            })
        }
    },
}
