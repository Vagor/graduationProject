//AnswerPaperCollectionSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//同一母卷做卷集合信息表
var AnswerPaperCollectionSchema = new Schema({
  
  //所属班级id(若有所属班级)
  classId:{
   type: ObjectId,
  },
  
  //所属课堂id
  lessonId:{
   type: ObjectId,
  },
   
   //母卷id
  motherPaperIdGroup:{
   type: ObjectId,
  },
  
  //做卷id组
  answerPaperIdGroup:[{
   type: ObjectId,
  }],

//做题集合id组
  answerQuestionCollectionIdGroup:[{
   type: ObjectId,
  }],

  //应答学生人数
  studentNumber: Number,

  //已答卷数
  AnswerPaperNumber: Number,

  //合格人数
  passNumber:Number,

  //是否已批改
  checkOrNot:{
    type:Boolean,
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

AnswerPaperCollectionSchema.pre('save', function(next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

AnswerPaperCollectionSchema.statics = {
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

module.exports = AnswerPaperCollectionSchema