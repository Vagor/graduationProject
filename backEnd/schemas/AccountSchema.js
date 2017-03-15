//AccountSchema.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
//账户信息表
var AccountSchema = new Schema({
  
  //账户名（唯一）
  name: {
    unique: true,
    type: String
  },

  //密码
  password: String,

  //身份
  // 0: 学生
  // 1: 老师
  // 2: professonal user
  // >10: admin
  // >50: super admin
  role: {
    type: Number,
    default: 0//默认是0
  },
  
  //学校
  school:{  
  	type: String,
  },
  
  //院系
  yuanXi:{
  	type: String,
  },
   
   //学工号
  learnNumber:{
  	type: String,
  },
  
  //老师/学生库信息id
  bankId:{
  	type: ObjectId,
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

AccountSchema.pre('save', function(next) {//每次存储之前调用这个方法
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

AccountSchema.statics = {
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

module.exports = AccountSchema