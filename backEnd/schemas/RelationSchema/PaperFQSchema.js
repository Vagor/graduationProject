var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//试卷填空题关系表
var PaperFQSchema = new Schema({

paperId:{
    type: ObjectId,
    ref: 'motherpaper'
},

fQId:{
    type: ObjectId,
    ref: 'FITBQuestion'
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

var PaperFQModel = mongoose.model('paperfq', PaperFQSchema)
module.exports = PaperFQModel