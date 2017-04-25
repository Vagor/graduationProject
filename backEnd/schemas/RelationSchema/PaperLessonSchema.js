//AnswerPaperCollectionSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//母卷课堂关系表
var PaperLessonSchema = new Schema({
//母卷id
paperId: {
    type: ObjectId,
    ref: 'motherpaper'
},
//课堂id
lessonId: {
    type: ObjectId,
    ref: 'lesson'//var LessonModel = mongoose.model('lesson', LessonSchema)中'lesson'
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

var PaperLessonModel = mongoose.model('paperlesson', PaperLessonSchema)
module.exports = PaperLessonModel
