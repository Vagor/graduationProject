var mongoose = require("mongoose");
mongoose.Promise = require('bluebird')
// var MotherPaperModel = require('../../schemas/TeacherSchema/MotherPaperSchema')
// var LessonModel = require('../../schemas/LessonSchema/LessonSchema')
// var AnswerPaperCollectionModel = require('../../schemas/LessonSchema/AnswerPaperCollectionSchema')
// var ChoiceQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerChoiceQCollectionSchema')
// var FillQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerFillQCollectionSchema')
// var ShortQuestionCollectionModel = require('../../schemas/LessonSchema/AnswerShortQCollectionSchema')
var StudentModel = require('../../schemas/UserSchema/StudentSchema')
var LessonClassModel = require('../../schemas/RelationSchema/LessonClassSchema')

module.exports = {
    //通过学生Id得到学生课堂列表
    getStudentLList: function (req, res) {
        var studentId = req.body.studentId
        
        //第一步，访问student表，拿到classId字段
        var getClassId = function () {
            StudentModel.find({
                '_id': studentId
            }, [
                    'classId'
                ], function (err, StudentList) {
                    //   var  classId = StudentList[0].classId
                   // console.log({StudentList})
                    getLessonList(StudentList[0].classId)
                }).sort({ 'meta.updateAt': -1 }) //按更新时间排序
        }

        //第二步，通过classId访问class-Lesson关系表，populate lesson表，拿到list
        var getLessonList = function (classId) {
            LessonClassModel
                .find({ 'classId': classId}, ["_id","classId", "lessonId"])
               .populate(
               'lessonId',
               '_id lessonName teacherId'
               )
                .sort({ 'meta.updateAt': -1 })
                .exec(function (err, data) {
                    // 数据格式化
                  var lessonList =[]
                  for (Index in data)
                  {
                      lessonList.push(data[Index].lessonId)
                  }
                  res.send({lessonList,classId})
                })
        }
        getClassId()
    }
}
