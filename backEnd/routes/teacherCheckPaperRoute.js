var express = require('express');
var teacherCheckPaperRoute = express.Router();
var checkPaperHandler = require('../handlers/teacher/checkPaperHandler.js');

 //获取老师选中课堂下待批改试卷列表
teacherCheckPaperRoute.post('/getWaitCheckPaperList', checkPaperHandler.getWaitCheckPaperList);
//获取选中的待批改试卷中简答题试题集合列表
teacherCheckPaperRoute.post('/getWCPaperSQCollectionList', checkPaperHandler.getWCPaperSQCollectionList);
//获取选定简答题学生答题列表
teacherCheckPaperRoute.post('/getAnswerShortQCollection', checkPaperHandler.getAnswerShortQCollection);
//保存老师对该学生此简答题打分
teacherCheckPaperRoute.post('/saveAnswerSQScore', checkPaperHandler.saveAnswerSQScore);
//此简答题所有学生答题批改完毕保存信息
teacherCheckPaperRoute.post('/saveAllAnswerSQ', checkPaperHandler.saveAllAnswerSQ);
//此卷所有试题批改完毕，保存信息
teacherCheckPaperRoute.post('/saveAnswerPaperCollection', checkPaperHandler.saveAnswerPaperCollection);

module.exports = teacherCheckPaperRoute;
