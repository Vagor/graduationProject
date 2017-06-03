var express = require('express');
var studentLookResultRoute = express.Router();
var lookResultHandler = require('../handlers/student/lookResultHandler.js');

//获取已批改题目成绩
studentLookResultRoute.post('/getCheckAnswerPaperScore', lookResultHandler.getCheckAnswerPaperScore);
//获取三种题型的学生答题信息
studentLookResultRoute.post('/getACQList', lookResultHandler.getACQList);
studentLookResultRoute.post('/getAFQList', lookResultHandler.getAFQList);
studentLookResultRoute.post('/getASQList', lookResultHandler.getASQList);

module.exports =  studentLookResultRoute;
