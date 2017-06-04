var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//填空题模式
var SAQQuestionSchema = new Schema({
    //题干
    stem: String,

    //正确答案
    answer: {
        type: String
    },
    //关键答题点
  answerOptions: String, 
    //是否共享
    share: {
        type: Boolean,
        default: 1
    },

    //课程名称
    courseName: String,

    //所属课程
    courseId: {
        type: ObjectId,
        ref: 'course'
    },
    //所属章节
    chapter: Number,
    //出题人
    teacherId: {
        type: ObjectId,
        ref: 'teacher'
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

SAQQuestionSchema.pre('save', function(next) { //每次存储之前调用这个方法
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
})

SAQQuestionSchema.statics = {
    fetch: function(cb) { //fetch方法取出目前数据库所有数据
        return this.find({}).sort('meta.updateAt'). //按更新时间排序
        exec(cb) //执行回调方法
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).exec(cb)
    }
}

var SAQQuestionModel = mongoose.model('SAQQuestion', SAQQuestionSchema)

module.exports = SAQQuestionModel

