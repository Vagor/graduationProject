var express = require('express');
var studentAnswerRoute = express.Router();
var answerPaperHandler = require('../handlers/student/answerPaperHandler.js');

//通过学生Id得到学生课堂列表
studentAnswerRoute.post('/getStudentLList', answerPaperHandler.getStudentLList);



module.exports = studentAnswerRoute;
