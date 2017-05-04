var express = require('express');
var studentLookResultRoute = express.Router();
var lookResultHandler = require('../handlers/student/lookResultHandler.js');

//获取已批改题目成绩
studentLookResultRoute.post('/getCheckAnswerPaperScore', lookResultHandler.getCheckAnswerPaperScore);


module.exports =  studentLookResultRoute;
