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
                '_id lessonName teacherId courseName'
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
    //获取学生单个课堂的（待做试卷和已做试卷）的数据
    getPaperToCheckCount: function (req, res) {
        var studentId = req.body.studentId
        var lessonId = req.body.lessonId
        AnswerPaperCollectionModel
            .find({
                'lessonId': lessonId
            }, [
                "_id", 'paperTitle', "totalScore", "paperId", "studentNumber", "answerPaperNumber",
            ], function (err, noCheckList) {
                var paperToCheckCount = noCheckList.length
                console.log(paperToCheckCount)
                res.send({ paperToCheckCount })
            })
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
        var updateAnswerPaper = function () {
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

                    updateAnswerPaperCollection()
                }
            })
        }
        var updateAnswerPaperCollection = function () {
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
                    res.send({ success: 1 })
                }
            })

        }
        updateAnswerPaper()
    },
    //提交试卷(学生做完所有的题目，提交整个试卷信息)
    studentSubmitPaper: function (req, res) {
        //1,关联学生答卷信息表和答卷集合表方便后续老师批改工作，学生每关联一次做卷集合表，
        //  answerPaperNumber++，同时当answerPaperNumber
        //  ==studentNumber时checkOrNot改为1(0:正在收卷，1：完成收卷待批改，2：完成批改)。
        //2, 生成完成的填空题答题信息表(批改)
        //3, 生成完成的选择题答题信息表（批改）
        //4, 生成完成的简答题答题信息表
        //5，生成学生答卷信息表
        //1,5（2,3,4）

        //5,生成学生答卷信息表
        var createAnswerPaper = function (AnswerPaperCollection) {
            var answerPaperlist = {
                studentId: req.body.studentId,
                lessonId: req.body.lessonId,
                paperId: req.body.paperId,
                paperTitle: req.body.paperTitle,
                totalScore: req.body.totalScore,
                answerPaperCollectionId: req.body.answerPaperCollectionId
            }
            // var answerPaperlist =
            //     {
            //         studentId: "5905df11a3846e0e9c8c49e4",
            //         lessonId: "58f45630b2199cf365f3d74c",
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
                    console.log("create AnswerPaper ok")
                    //  res.send({ success: 1 })
                    var fillQList =req.body.fillQList
                    var shortQList =req.body.shortQList
                    var choiceQList =req.body.choiceQList
                    //测试
                    // var fillQList = [{
                    //     stem: "大家好",
                    //     answerOptions: ["nihao", "wohao"],
                    //     studentOptions: ["nihao", "eohao"],
                    //     questionScore: 4,
                    //     fillQuestionId: "58c73c5879534a10c243fa11"
                    // },
                    // {
                    //     stem: "hello all",
                    //     answerOptions: ["nihao", "wohao"],
                    //     studentOptions: ["nihao", "wohao"],
                    //     questionScore: 4,
                    //     fillQuestionId: "58c73c5879534a10c243fa11"
                    // },
                    // ]
                    // var shortQList = [{
                    //     stem: "大家好",
                    //     answer: "nihaowohao",
                    //     studentAnswer: "nihaoeohao",
                    //     answerOptions: ["nihao", "wohao"],
                    //     questionScore: 4,
                    //     shortQuestionId: "58c73c5879534a10c243fa11"
                    // },
                    // {
                    //     stem: "hello all",
                    //     answer: "nihaowohao",
                    //     studentAnswer: "wihaoeohao",
                    //     answerOptions: ["nihao", "wohao"],
                    //     questionScore: 4,
                    //     shortQuestionId: "58c73c5879534a10c243fa11"
                    // },
                    // ]
                    // var choiceQList = [{
                    //     stem: "大家好",
                    //     options: ["a", "b"],
                    //     answerOption: "A",
                    //     studentOption: "A",
                    //     questionScore: 4,
                    //     choiceQuestionId: "58c66fcb07f87ba944015a24"
                    // },
                    // {
                    //     stem: "HELLO all",
                    //     options: ["a", "S"],
                    //     answerOption: "B",
                    //     studentOption: "A",
                    //     questionScore: 3,
                    //     choiceQuestionId: "58c66fcb07f87ba944015a24"
                    // },
                    // ]
                    for (Index in fillQList) {
                        createAnswerFillQ(fillQList[Index], answerpaper._id)
                    }
                    for (Index in shortQList) {
                        createAnswerShortQ(shortQList[Index], answerpaper._id)
                    }
                    for (Index in choiceQList) {
                        createAnswerChoiceQ(choiceQList[Index], answerpaper._id)
                    }
                    res.send({ success: 1 })
                }
            })
        }
        //1,关联学生答卷信息表和答卷集合表方便后续老师批改工作

        var studentNumber = req.body.studentNumber
        var answerPaperNumber = req.body.answerPaperNumber
        var lessonId = req.body.lessonId
        var paperId = req.body.paperId

        var updateAnswerPaperCollection = function () {
            var checkOrNot = 0
            //0:正在收卷
            answerPaperNumber++
            if (answerPaperNumber == studentNumber) {
                checkOrNot = 1
                //1：完成收卷待批改
            }
            var Aconditions = {
                "lessonId": lessonId,
                "paperId": paperId
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

                }
            })

        }
        //2, 生成完成的填空题答题信息表(批改)（完成）
        var createAnswerFillQ = function (fillQList, answerPaperId) {
            //批改(完成)
            var rightNumber = 0
            for (AIndex in fillQList.answerOptions) {
                if (fillQList.answerOptions[AIndex] == fillQList.studentOptions[AIndex])
                { rightNumber++ }
            }
            AnswerFillQuestionCollectionModel.find({
                "answerPaperCollectionId": req.body.answerPaperCollectionId,
                "fillQuestionId": fillQList.fillQuestionId
            }, ["_id"], function (err, List) {
                // console.log(List)
                var answerFillQList = fillQList
                var getScore = fillQList.questionScore * rightNumber / fillQList.answerOptions.length
                answerFillQList.answerFillQCollectionId = List[0]._id
                answerFillQList.getScore = getScore
                answerFillQList.checkOrNot = 2                
                answerFillQList.answerPaperId = answerPaperId
                answerFillQList.studentId = req.body.studentId
                //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
                var AnswerFillQEntity = new AnswerFillQModel(answerFillQList)
                AnswerFillQEntity.save(function (err, answerfillq) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("ok")
                        // console.log(answerchoiceq)
                        //    res.send({ success: 1 })
                    }
                })
            }
            )
        }
        //3, 生成完成的选择题答题信息表（批改）（完成）
        var createAnswerChoiceQ = function (choiceQList, answerPaperId) {
            var getScore = 0
            if (choiceQList.answerOption == choiceQList.studentOption)
            { getScore = choiceQList.questionScore }
            AnswerChoiceQuestionCollectionModel.find({
                "answerPaperCollectionId": req.body.answerPaperCollectionId,
                "choiceQuestionId": choiceQList.choiceQuestionId
            }, ["_id"], function (err, List) {
                // console.log(List)
                var answerChoiceQList = choiceQList
                answerChoiceQList.answerChoiceQCollectionId = List[0]._id
                answerChoiceQList.getScore = getScore
                answerChoiceQList.checkOrNot = 2                
                answerChoiceQList.answerPaperId = answerPaperId
                answerChoiceQList.studentId = req.body.studentId
                //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
                var AnswerChoiceQEntity = new AnswerChoiceQModel(answerChoiceQList)
                AnswerChoiceQEntity.save(function (err, answerchoiceq) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("ok")
                        // console.log(answerchoiceq)
                        //  res.send({ success: 1 })
                    }
                })
            }
            )
        }
        //4, 生成完成的简答题答题信息表（批改）（完成）
        var createAnswerShortQ = function (shortQList, answerPaperId) {
            var rightNumber = 0
            for (SIndex in shortQList.answerOptions) {
                if (shortQList.studentAnswer.match(shortQList.answerOptions[SIndex]))
                { rightNumber++ }
            }
            AnswerShortQuestionCollectionModel.find({
                "answerPaperCollectionId": req.body.answerPaperCollectionId,
                "shortQuestionId": shortQList.shortQuestionId
            }, ["_id"], function (err, List) {
                //  console.log(List)
                var answerShortQList = shortQList
                var getScore = shortQList.questionScore * rightNumber / shortQList.answerOptions.length
                answerShortQList.getScore = getScore
                answerShortQList.checkOrNot = 2                
                answerShortQList.answerShortQCollectionId = List[0]._id
                answerShortQList.answerPaperId = answerPaperId
                answerShortQList.studentId = req.body.studentId
                //新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
                var AnswerShortQEntity = new AnswerShortQModel(answerShortQList)
                AnswerShortQEntity.save(function (err, answershortq) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("ok")
                        // console.log(answerchoiceq)
                        //   res.send({ success: 1 })
                    }
                })
            }
            )
        }
        createAnswerPaper()
        updateAnswerPaperCollection()
    },

}