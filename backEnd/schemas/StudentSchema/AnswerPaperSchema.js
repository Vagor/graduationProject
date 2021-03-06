var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//已做试卷信息表
var AnswerPaperSchema = new Schema({
 //已做试卷集合id
 answerPaperCollectionId:ObjectId,
  //试卷题目
  paperTitle:{
    type: String,
  },
  //母卷id
  paperId:{
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
  //班级
  classId: {
    type: ObjectId,
    ref: 'class',//ref:关联的model
  },
  
 //是否已批改 (1：已做试卷待批改，2：已做试卷完成批改)
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

AnswerPaperSchema.pre('save', function(next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

AnswerPaperSchema.statics = {
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

module.exports = Schema
var AnswerPaperModel = mongoose.model('answerpaper', AnswerPaperSchema)
module.exports = AnswerPaperModel