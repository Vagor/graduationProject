//AnswerPaperCollectionSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//同一母卷做卷集合信息表
var AnswerPaperCollectionSchema = new Schema({
  //老师id
  teacherId: {
    type: ObjectId,
    ref: 'teacher'
  },
  //所属班级id(若有所属班级)
  classId: {
    type: ObjectId,
  },

  //所属课堂id
  lessonId: {
    type: ObjectId,
  },

  //母卷id
  paperId: {
    type: ObjectId,
  },
  //标题
  paperTitle: String,
  //满分分值
  totalScore: Number,

  //应答学生人数
  studentNumber: Number,

  //上交已答卷数
  answerPaperNumber: Number,

  //合格人数
  passNumber: Number,

  //合格率
  passPercent: Number,

  //平均分
  averageScore: Number,

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

AnswerPaperCollectionSchema.pre('save', function (next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

AnswerPaperCollectionSchema.statics = {
  fetch: function (cb) {//fetch方法取出目前数据库所有数据
    return this
      .find({})
      .sort('meta.updateAt')//按更新时间排序
      .exec(cb)//执行回调方法
  },
  findById: function (id, cb) {
    return this
      .findOne({ _id: id })
      .exec(cb)
  }
}


var AnswerPaperCollectionModel = mongoose.model('answerpapercollection', AnswerPaperCollectionSchema)
module.exports = AnswerPaperCollectionModel