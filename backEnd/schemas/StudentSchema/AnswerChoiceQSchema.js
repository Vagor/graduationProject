var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//已做题信息表
var AnswerChoiceQSchema = new Schema({
  //已做卷id
  answerPaperId:{
    type: ObjectId,
  },
  //母题id
  choiceQuestionId:{
    type: ObjectId,
  },
  //已做题集合id
  answerChoiceQCollectionId:{
    type: ObjectId,
  },
  
  //做题学生id
  studentId:{
     type: ObjectId,
  },
  //学生姓名
  studentName:{
    type: String,
  },
  
  //出题老师id
  teacherId:{
   type: ObjectId,
  },

  //课堂id
  lessonId:{
   type: ObjectId,
  },
//classid
  classId:{
   type: ObjectId,
  },
  //题干
  stem: String,
  
  //选项
  options:[{  
  	type: String,
  }],
  
  //正确选项
  answerOption:{
  	type: String,
  },
   
  //学生选项
  studentOption:{
  	type: String,
  },
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
  questionScore: Number,
  
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


var AnswerChoiceQModel = mongoose.model('answerchoiceq', AnswerChoiceQSchema)
module.exports = AnswerChoiceQModel