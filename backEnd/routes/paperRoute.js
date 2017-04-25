var express = require('express');
var paperRoute = express.Router();
var teacherBankHandler = require('../handlers/paper/teacherBankHandler.js');
var motherPaperHandler = require('../handlers/paper/motherPaperHandler.js');


//查看题库
paperRoute.post('/getCListByTId', teacherBankHandler.getCList);
paperRoute.post('/getPaperListByCIdAndTId', teacherBankHandler.getPaperList); 
paperRoute.post('/getAllQListByCIdAndTId', teacherBankHandler.getAllQList); 
//paperRoute.post('/initPaperBank', teacherBankHandler.initPaperBank);//通过老师的ID获取老师所教授的课程和所教授这门课程的所有所有试卷

//组卷保存基本信息
paperRoute.post('/createPaper', motherPaperHandler.createPaper);
paperRoute.post('/getCQLByPId', motherPaperHandler.getCQList);
paperRoute.post('/getFQLByPId', motherPaperHandler.getFQList);
paperRoute.post('/getSQLByPId', motherPaperHandler.getSQList);



module.exports = paperRoute;
