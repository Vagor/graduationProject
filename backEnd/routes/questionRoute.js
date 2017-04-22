var express = require('express');
var questionRoute = express.Router();
var choiceQuestionHandler = require('../handlers/question/choiceQuestionHandler.js');
var SAQQuestionHandler = require('../handlers/question/SAQQuestionHandler.js');
var FITBQuestionHandler = require('../handlers/question/FITBQuestionHandler.js');
var teacherBankHandler = require('../handlers/question/teacherBankHandler.js');
var motherPaperHandler = require('../handlers/question/motherPaperHandler.js');


// 选择题
questionRoute.post('/getChoiceQuestionList', choiceQuestionHandler.getChoiceQuestionList);
questionRoute.post('/getChoiceQuestionContent', choiceQuestionHandler.getChoiceQuestionContent);
questionRoute.post('/updateChoiceQuestion', choiceQuestionHandler.updateChoiceQuestion);
questionRoute.post('/deleteChoiceQuestion', choiceQuestionHandler.deleteChoiceQuestion);

// 填空题
questionRoute.post('/getFITBQuestionList', FITBQuestionHandler.getFITBQuestionList);
questionRoute.post('/getFITBQuestionContent', FITBQuestionHandler.getFITBQuestionContent);
questionRoute.post('/updateFITBQuestion', FITBQuestionHandler.updateFITBQuestion);
questionRoute.post('/deleteFITBQuestion', FITBQuestionHandler.deleteFITBQuestion);

// 问答题
questionRoute.post('/getSAQQuestionList', SAQQuestionHandler.getSAQQuestionList);
questionRoute.post('/getSAQQuestionContent', SAQQuestionHandler.getSAQQuestionContent);
questionRoute.post('/updateSAQQuestion', SAQQuestionHandler.updateSAQQuestion);
questionRoute.post('/deleteSAQQuestion', SAQQuestionHandler.deleteSAQQuestion);

//通过老师的ID获取老师所教授的课程
questionRoute.post('/getCListByTId', teacherBankHandler.getCList);

//通过课程的ID和老师的ID获取老师所教授这门课程的所有所有试卷
questionRoute.post('/getPaperListByCIdAndTId', teacherBankHandler.getPaperList);

//通过课程的ID和老师的Id获取老师所教授这门课程的所有题目
questionRoute.post('/getAllQListByCIdAndTId', teacherBankHandler.getAllQList);

//通过老师的ID获取老师所教授的课程和所教授这门课程的所有所有试卷
questionRoute.post('/initPaperBank', teacherBankHandler.initPaperBank);
//组卷保存基本信息
//questionRoute.post('/createPaper', motherPaperHandler.createPaper);



module.exports = questionRoute;
