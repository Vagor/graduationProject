var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var FITBQuestionModel = require('../../schemas/TeacherSchema/FITBQuestionSchema')

module.exports = {
    // 获取某老师所拥有的选择题简略信息
    getFITBQuestionList: function(req, res) {
        var teacherId = req.body.teacherId
        FITBQuestionModel.find({
            'teacherId': teacherId
        }, [
            '_id', 'stem', 'chapter'
        ], function(err, FITBQuestionList) {
            res.send({FITBQuestionList})
        }).sort({'meta.updateAt': -1}) //按更新时间排序
    },
    // 存储或更新选择题
    updateFITBQuestion: function(req, res) {
        var type = req.body.type
        // type=0 ===>新建；type=1 ===>更新；
        // 新建题目
        if (type == 0) {
            //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
            var quetionEntity = new FITBQuestionModel(req.body.FITBQuestion)
            quetionEntity.save(function(err, question) {
                if (err) {
                    console.log(err)
                    res.json({"success": 0})
                } else {
                    console.log("ok")
                    res.json({"success": 1})
                }
            })
        // 更新题目
        } else if (type == 1) {
            var conditions = {
                _id: req.body.FITBQuestion.questionId
            }
            var update = {
                $set: req.body.FITBQuestion
            }
            var options = {
                upsert: true
            }
            FITBQuestionModel.update(conditions, update, options, function(error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('update ok!')
                }
            })
            FITBQuestionModel.findById(req.body.FITBQuestion.questionId, function(err, FITBQuestion) {
                FITBQuestion.save(function(err, question) {
                    if (err) {
                        console.log(err)
                        res.json({"time success": 0})
                    } else {
                        console.log("update time ok")
                        res.json({"time success": 1})
                    }
                })
            });
        }
    },

    // 预览选择题详细内容
    getFITBQuestionContent: function(req, res) {
        var questionId = req.body.questionId
        FITBQuestionModel.findById(questionId, function(err, FITBQuestion) {
            if (err) {
                console.log(err)
            }
            res.send(FITBQuestion)
        })
    },

    // 删除题目
    deleteFITBQuestion: function(req, res) {
        var questionId = req.body.questionId
        console.log("delete拿到ID：" + req.body.questionId)
        // 删除记录
        var conditions = {
            _id: questionId
        };
        FITBQuestionModel.remove(conditions, function(error) {
            if (error) {
                console.log(error);
            } else {
                res.json({"success": 1})
                console.log('delete ok!');
            }
        });
    }
}
