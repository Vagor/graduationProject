//AnswerQuestionCollectionSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//同一母题做题集合信息表
var AnswerShortQCollectionSchema = new Schema({

    //所属班级id(若有所属班级)
    classId: {
        type: ObjectId,
    },

    //所属课堂id
    lessonId: {
        type: ObjectId,
    },

    //母题id
    shortQuestionId: {
        type: ObjectId,
    },
    //所属做卷集合id
    answerPaperCollectionId: {
        type: ObjectId,
    },
    //题干
    stem: String,

    //正确答案
  answer:
  {
       type: String,
  },

    questionScore: {
        type: Number,
        default: 3//默认是3分
    },

    //应答学生人数
    studentNumber: Number,

    //正确人数
    passNumber: Number,

    //是否已批改 (0:正在收卷，1：完成收卷待批改，2：完成批改)
    checkOrNot: {
        type: Number,
        default: 0//默认是0
    },

    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})


var AnswerShortQCollectionModel = mongoose.model('answershortqcollection', AnswerShortQCollectionSchema)
module.exports = AnswerShortQCollectionModel