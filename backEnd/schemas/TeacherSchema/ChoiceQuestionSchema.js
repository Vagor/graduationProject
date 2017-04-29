var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//选择题模式
var ChoiceQuestionSchema = new Schema({
  
  //题干
  stem: String,
  
  //选项
  options:[{  
  	type: String,
  }],
  
  //正确选项
  answerOptions:[{
  	type: Number,
  }],
   
   //是否共享
  share:{
  	type: Boolean,
  	default: true,
  },
  
 //课程名称
  courseName: String,

  //所属课程
  courseId:{
  	type: ObjectId,
  	ref: 'course',//ref:关联的model
  },
   
   //所属章节
  chapter: Number,
   
   //出题人
  teacherId:{
  	type: ObjectId,
    ref: 'teacher',
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

ChoiceQuestionSchema.pre('save', function(next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

ChoiceQuestionSchema.statics = {
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

var ChoiceQuestionModel = mongoose.model('choiceQuestion', ChoiceQuestionSchema)
module.exports = ChoiceQuestionModel
