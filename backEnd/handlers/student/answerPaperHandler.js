var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
// var MotherPaperModel = require('../../schemas/TeacherSchema/MotherPaperSchema')
// var LessonModel = require('../../schemas/LessonSchema/LessonSchema')
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
    //通过学生Id得到学生课堂列表
    getStudentLList: function (req, res) {
        var studentId = req.body.studentId

        //第一步，访问student表，拿到classId字段
        var getClassId = function () {
            StudentModel.find({
                '_id': studentId
            }, [
                    'classId'
                ], function (err, StudentList) {
                    getLessonList(StudentList[0].classId)
                }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
        }

        //第二步，通过classId访问class-Lesson关系表，populate lesson表，拿到list
        var getLessonList = function (classId) {
            LessonClassModel
                .find({ 'classId': classId }, ["_id", "classId", "lessonId"])
                .populate(
                'lessonId',
                '_id lessonName teacherId'
                )
                .sort({ 'meta.updateAt': -1 })
                .exec(function (err, data) {
                    // 数据格式化
                    var lessonList = []
                    for (Index in data) {
                        lessonList.push(data[Index].lessonId)
                    }
                    res.send({ lessonList, classId })
                })
        }
        getClassId()
    },
    //通过studentId和lessonId得到三种list，未做卷list和已做未批改卷list、已做已批改list。
    getStudentPaperLists: function (req, res) {
        var studentId = req.body.studentId
        var lessonId = req.body.lessonId
        //第一步，通过studentId和lessonId访问学生做卷表得到已做未批改卷list、已做已批改list。
        var getAnswerPaperList = function () {
            AnswerPaperModel
                .find({
                    'studentId': studentId,
                    'lessonId': lessonId
                }, [
                    'paperTitle', "paperId", "totalScore", "checkOrNot", "answerPaperCollectionId"
                ], function (err, paperList) {
                    //console.log(paperList)
                    var AnswerNoCheckPaperList = []
                    var AnswerCheckPaperList = []
                    for (Index in paperList) {
                        var paperId = paperList[Index].paperId
                        var paperTitle = paperList[Index].paperTitle
                        var totalScore = paperList[Index].totalScore

                        if (paperList[Index].checkOrNot == 1) {
                            AnswerNoCheckPaperList.push({ paperId, paperTitle, totalScore })
                        }
                        else {
                            AnswerCheckPaperList.push({ paperId, paperTitle, totalScore })
                        }
                    }
                    getNoAnswerPaperList(AnswerNoCheckPaperList, AnswerCheckPaperList, paperList)
                    // console.log(AnswerNoCheckPaperList)
                    //  console.log(AnswerCheckPaperList)
                }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
        }
        // 第二步通过lessonId find做卷集合表返回未回收卷list，匹配第一步两个list，得到未做卷list
        var getNoAnswerPaperList = function (AnswerNoCheckPaperList, AnswerCheckPaperList, paperList) {
            AnswerPaperCollectionModel
                .find({
                    "checkOrNot": 0,
                    'lessonId': lessonId
                }, [
                    "_id", 'paperTitle', "totalScore", "paperId", "studentNumber", "answerPaperNumber",
                ], function (err, noCheckList) {
                    // console.log(noCheckList)
                    var NoAnswerPaperList = []
                    for (NIndex in noCheckList) {
                        var NPaperTitle = noCheckList[NIndex].paperTitle
                        var flag = 0
                        for (PIndex in paperList) {
                            PPaperTitle = paperList[PIndex].paperTitle
                            if ((NPaperTitle) == (PPaperTitle)) {
                                //  console.log("paperList" + PIndex)
                                flag = 1
                                break
                            }
                        }
                        if (flag == 0) {
                            console.log("ok")
                            NoAnswerPaperList.push(noCheckList[NIndex])
                        }
                    }
                    // console.log(NoAnswerPaperList)
                    res.send({ AnswerNoCheckPaperList, AnswerCheckPaperList, NoAnswerPaperList })
                }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
        }
        getAnswerPaperList()
    },
    //选中待答试卷，生成学生答卷信息表
    createAnswerPaper: function (req, res) {
        var answerPaperlist = req.body.answerPaperlist
        // var answerPaperlist =
        //     {
        //         studentId: "5905df11a3846e0e9c8c49e4",
        //         lessonId: "58f45630b2199cf365f3d74c",
        //         studentId: "58f45630b2199cf365f3d74c",
        //         teacherId: "58f45630b2199cf365f3d74c",
        //         classId: "58f45630b2199cf365f3d74c",
        //         paperId: "58f45630b2199cf365f3d74c",
        //         paperTitle: "hello world",
        //         totalScore: 100
        //     }
        //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
        var AnswerPaperEntity = new AnswerPaperModel(answerPaperlist)
        AnswerPaperEntity.save(function (err, answerpaper) {
            if (err) {
                console.log(err)
            } else {
                console.log("ok")
                res.send({ success: 1 })
            }
        })
    },
    //生成完成的选择题答题信息表
    createAnswerChoiceQ: function (req, res) {
        AnswerChoiceQuestionCollectionModel.find({
            "answerPaperCollectionId": req.body.answerPaperCollectionId,
            "choiceQuestionId": req.body.choiceQuestionId
        }, ["_id"], function (err, List) {
            // console.log(List)
            var answerChoiceQList = req.body
            answerChoiceQList.answerChoiceQCollectionId = List[0]._id
            //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
            var AnswerChoiceQEntity = new AnswerChoiceQModel(answerChoiceQList)
            AnswerChoiceQEntity.save(function (err, answerchoiceq) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("ok")
                    // console.log(answerchoiceq)
                    res.send({ success: 1 })
                }
            })
        }
        )

    },
    //生成完成的填空题答题信息表
    createAnswerFillQ: function (req, res) {
        AnswerFillQuestionCollectionModel.find({
            "answerPaperCollectionId": req.body.answerPaperCollectionId,
            "fillQuestionId": req.body.fillQuestionId
        }, ["_id"], function (err, List) {
            // console.log(List)
            var answerFillQList = req.body
            answerFillQList.answerFillQCollectionId = List[0]._id
            //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
            var AnswerFillQEntity = new AnswerFillQModel(answerFillQList)
            AnswerFillQEntity.save(function (err, answerfillq) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("ok")
                    // console.log(answerchoiceq)
                    res.send({ success: 1 })
                }
            })
        }
        )
    },
    //生成完成的简答题答题信息表
    createAnswerShortQ: function (req, res) {
        AnswerShortQuestionCollectionModel.find({
            "answerPaperCollectionId": req.body.answerPaperCollectionId,
            "shortQuestionId": req.body.shortQuestionId
        }, ["_id"], function (err, List) {
            //  console.log(List)
            var answerShortQList = req.body
            answerShortQList.answerShortQCollectionId = List[0]._id
            //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
            var AnswerShortQEntity = new AnswerShortQModel(answerShortQList)
            AnswerShortQEntity.save(function (err, answershortq) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("ok")
                    // console.log(answerchoiceq)
                    res.send({ success: 1 })
                }
            })
        }
        )
    },
    //确认提交试卷,关联学生答卷信息表和答卷集合表方便后续老师批改工作.
    submitPaper: function (req, res) {
        var answerPaperId = req.body.answerPaperId
        var answerPaperCollectionId = req.body.answerPaperCollectionId
        var studentNumber = req.body.studentNumber
        var answerPaperNumber = req.body.answerPaperNumber
        var conditions = {
            _id: answerPaperId
        }
        var update = {
            $set: { answerPaperCollectionId: answerPaperCollectionId }
        }
        var options = {
            upsert: true
        }
        AnswerPaperModel.update(conditions, update, options, function (error) {
            if (error) {
                console.log(error)
            } else {
                console.log('update answerpaper ok!')
                var checkOrNot = 0
                //0:正在收卷
                answerPaperNumber++
                if (answerPaperNumber == studentNumber) {
                    checkOrNot = 1
                    //1：完成收卷待批改
                }
                var Aconditions = {
                    _id: answerPaperCollectionId
                }
                var Aupdate = {
                    $set: {
                        answerPaperNumber: answerPaperNumber,
                        checkOrNot: checkOrNot
                    }
                }
                var Aoptions = {
                    upsert: true
                }
                AnswerPaperCollectionModel.update(Aconditions, Aupdate, Aoptions, function (error) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('update answerpapercollection ok!')
                        res.send({success:1})
                    }
                })


            }
        })
    },
}
