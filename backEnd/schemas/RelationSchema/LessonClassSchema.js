//AnswerPaperCollectionSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//课堂班级关系表
var LessonClassSchema = new Schema({
//课堂id
lessonId: {
    type: ObjectId,
     ref: 'lesson'
},
//班级id
classId: {
    type: ObjectId,
    ref: 'class'
},
//额外属性
attr: {
//TODO
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

var LessonClassModel = mongoose.model('classlesson', LessonClassSchema)
module.exports = LessonClassModel