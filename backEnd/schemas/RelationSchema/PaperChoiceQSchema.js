var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//试卷选择题关系表
var PaperChoiceQSchema = new Schema({

paperId:{
    type: ObjectId,
    ref: 'motherpaper'
},

choiceQId:{
    type: ObjectId,
    ref: 'choiceQuestion'
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

var PaperChoiceQModel = mongoose.model('paperchoiceq', PaperChoiceQSchema)
module.exports = PaperChoiceQModel