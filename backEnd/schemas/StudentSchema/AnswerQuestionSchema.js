var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//已做题信息表
var AnswerQuestionSchema = new Schema({
  
  //母题id
  questionId:{
    type: ObjectId,
  },
  
  //做题学生id
  studentId:{
     type: ObjectId,
  },
  
  //出题老师id
  teacherId:{
   type: ObjectId,
  },

  //课堂id
  lessonId:{
   type: ObjectId,
  },

  //学生答案
  studentAnswer:[{
    type: String,
  }],
  
  //正确答案
  rightAnswer:[{
    type: String,
  }],

  //是否正确
  rightOrError:{
    type: Boolean,　
  },
  
  //是否已批改 (1：完成收卷待批改，2：完成批改)
  checkOrNot:{
    type:Number,
    default: 1//默认是1
  },
  
  //满分分值
  totalScore: Number,
  
  //得分
  getScore: Number,
  
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

AnswerQuestionSchema.pre('save', function(next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

AnswerQuestionSchema.statics = {
  fetch: function(cb) {//fetch方法取出目前数据库所有数据
    return this
      .find({})
      .sort('meta.updateAt')//按更新时间排序
      .exec(cb)//执行回调方法
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = AnswerQuestionSchema