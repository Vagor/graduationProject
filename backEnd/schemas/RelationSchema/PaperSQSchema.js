var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//试卷填空题关系表
var PaperSQSchema = new Schema({

paperId:{
    type: ObjectId,
    ref: 'motherpaper'
},

sQId:{
    type: ObjectId,
    ref: 'SAQQuestion'
},
//额外属性
attr: {
//TODO
questionScore: {
    type: Number,
    default: 3//默认是3分
  },
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

var PaperSQModel = mongoose.model('papersq', PaperSQSchema)
module.exports = PaperSQModel