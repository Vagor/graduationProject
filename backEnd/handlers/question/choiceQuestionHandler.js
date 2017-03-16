var mongoose = require("mongoose");

var ChoiceQuestionModel = require('../../models/ChoiceQuestionModel')

module.exports = {
    // 获取某老师所拥有的选择题简略信息
    getChoiceQuestionList: function(req, res) {
        var teacherId = req.body.teacherId
        ChoiceQuestionModel.find({
            'teacherId': teacherId
        }, [
            '_id', 'stem', 'chapter'
        ], function(err, choiceQuestionList) {
            res.send({choiceQuestionList})
        }).sort({'meta.updateAt': -1}) //按更新时间排序
    },
    // 存储或更新选择题
    updateChoiceQuestion: function(req, res) {
        var type = req.body.type
        // type=0 ===>新建；type=1 ===>更新；
        // 新建题目
        if (type == 0) {
            //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
            var quetionEntity = new ChoiceQuestionModel(req.body.choiceQuestion)
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
                _id: req.body.choiceQuestion.questionId
            }
            var update = {
                $set: req.body.choiceQuestion
            }
            var options = {
                upsert: true
            }
            ChoiceQuestionModel.update(conditions, update, options, function(error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('update ok!')
                }
            })
            ChoiceQuestionModel.findById(req.body.choiceQuestion.questionId, function(err, choicequestion) {
                choicequestion.save(function(err, question) {
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
    getChoiceQuestionContent: function(req, res) {
        var questionId = req.body.questionId
        ChoiceQuestionModel.findById(questionId, function(err, choicequestion) {
            if (err) {
                console.log(err)
            }
            res.send(choicequestion)
        })
    },

    // 删除题目
    deleteChoiceQuestion: function(req, res) {
        var questionId = req.body.questionId
        console.log("delete拿到ID：" + req.body.questionId)
        // 删除记录
        var conditions = {
            _id: questionId
        };
        ChoiceQuestionModel.remove(conditions, function(error) {
            if (error) {
                console.log(error);
            } else {
                res.json({"success": 1})
                console.log('delete ok!');
            }
        });
    }
}
