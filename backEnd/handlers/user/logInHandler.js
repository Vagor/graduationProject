var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
var AccountModel = require('../../schemas/UserSchema/AccountSchema')
var TeacherModel = require('../../schemas/UserSchema/TeacherSchema')
var StudentModel = require('../../schemas/UserSchema/StudentSchema')

module.exports = {
    //登录返回用户信息
    logInAndGetInf: function (req, res) {
        userName = req.body.userName
        password = req.body.password
       // accountId = req.body.accountId
        //查询用户信息表
        var findAccount = function () {
            AccountModel.findOne({
                'userName': userName,
                'password': password
            },
                ['_id', 'role'],
                function (err, account) {
                   // res.send(account)
                   if (account.role == 0){
                       findStudent(account._id)
                   }
                   if (account.role == 1){
                       findTeacher(account._id)
                   }
                })

        }
        //查询学生信息表
        var findStudent = function (accountId) {
            StudentModel.findOne({
                'accountId':accountId
            },
                ['_id', 'studentName','school','yuanXi','learnNumber'],
                function (err, student) {
                    res.send(student)
                })
        }
        //查询老师信息表
         var findTeacher = function (accountId) {
            TeacherModel.findOne({
                'accountId':accountId
            },
                ['_id', 'teacherName','school','yuanXi','learnNumber'],
                function (err, teacher) {
                    res.send(teacher)
                })
        }
        findAccount()
    }

}
