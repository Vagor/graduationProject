//StudentBankSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

//学生题和卷库信息表
var StudentBankSchema = new Schema({

  //学生姓名
  studentName: String,

  //班级名
  className: String,

  //班级id
  classId: {
    type: ObjectId,
    ref: 'ClassModel',
  },

  //已做题id组
  answerQuestionIdGroup: [{
    type: ObjectId,
    ref: 'AnswerQuestionModel',
  }],

  //已做卷id组
  answerPaperIdGroup: [{
    type: ObjectId,
    ref: 'AnswerPaperModel',
  }],

  //课堂id组
  lessonIdGroup: [{
    type: ObjectId,
    ref: 'lessonModel',
  }],

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

// var ObjectId = mongoose.Schema.Types.ObjectId
StudentBankSchema.pre('save', function (next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

StudentBankSchema.statics = {
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

module.exports = StudentBankSchema