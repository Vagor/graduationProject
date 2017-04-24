var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var SAQQuestionModel = require('../../schemas/TeacherSchema/SAQQuestionSchema')

module.exports = {
    // 获取某老师所拥有的选择题简略信息
    getSAQQuestionList: function(req, res) {
        var teacherId = req.body.teacherId
        SAQQuestionModel.find({
            'teacherId': teacherId
        }, [
            '_id', 'stem', 'chapter'
        ], function(err, SAQQuestionList) {
            res.send({SAQQuestionList})
        }).sort({'meta.updateAt': -1}) //按更新时间排序
    },
    // 存储或更新选择题
    updateSAQQuestion: function(req, res) {
        var type = req.body.type
        // type=0 ===>新建；type=1 ===>更新；
        // 新建题目
        if (type == 0) {
            //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
            var quetionEntity = new SAQQuestionModel(req.body.SAQQuestion)
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
                _id: req.body.SAQQuestion.questionId
            }
            var update = {
                $set: req.body.SAQQuestion
            }
            var options = {
                upsert: true
            }
            SAQQuestionModel.update(conditions, update, options, function(error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('update ok!')
                }
            })
            SAQQuestionModel.findById(req.body.SAQQuestion.questionId, function(err, SAQQuestion) {
                SAQQuestion.save(function(err, question) {
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
    getSAQQuestionContent: function(req, res) {
        var questionId = req.body.questionId
        SAQQuestionModel.findById(questionId, function(err, SAQQuestion) {
            if (err) {
                console.log(err)
            }
            res.send(SAQQuestion)
        })
    },

    // 删除题目
    deleteSAQQuestion: function(req, res) {
        var questionId = req.body.questionId
        console.log("delete拿到ID：" + req.body.questionId)
        // 删除记录
        var conditions = {
            _id: questionId
        };
        SAQQuestionModel.remove(conditions, function(error) {
            if (error) {
                console.log(error);
            } else {
                res.json({"success": 1})
                console.log('delete ok!');
            }
        });
    }
}
