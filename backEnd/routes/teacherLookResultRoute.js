var express = require('express');
var teacherLookResultRoute = express.Router();
var lookResultHandler = require('../handlers/teacher/lookResultHandler.js');

//获取老师选中课堂下已批改试卷列表
teacherLookResultRoute.post('/getCheckPaperList', lookResultHandler.getCheckPaperList);
//获取选中已批改试卷集合成绩
teacherLookResultRoute.post('/getCheckAnswerPaperCollectionScore', lookResultHandler.getCheckAnswerPaperCollectionScore);


module.exports =  teacherLookResultRoute;
