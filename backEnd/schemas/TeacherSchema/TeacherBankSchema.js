var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

//老师题库和卷库信息表
var TeacherBankSchema = new Schema({

  //老师姓名
  teacherName: String,

 //老师id
  teacherId:{
  	type: ObjectId,
    ref: 'teacher',
  },
  
  //选择题母题组
  choiceQuestionGroup: [{
    type: ObjectId,
    ref: 'ChoiceQuestionModel',
  }],

  //填空题母题组
  blankQuestionIdGroup: [{
    type: ObjectId,
    ref: 'BlankquestionModel',
  }],

  //简答题母题组
  shortAQIdGroup: [{
    type: ObjectId,
    ref: 'ShortAQModel',
  }],

  //母卷组
  motherPaperIdGroup: [{
    type: ObjectId,
    ref: 'motherPaperGroupModel',
  }],
  //课堂组
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
TeacherBankSchema.pre('save', function (next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

TeacherBankSchema.statics = {
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

module.exports = TeacherBankSchema