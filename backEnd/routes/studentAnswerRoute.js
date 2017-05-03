var express = require('express');
var studentAnswerRoute = express.Router();
var answerPaperHandler = require('../handlers/student/answerPaperHandler.js');

//通过学生Id得到学生课堂列表
studentAnswerRoute.post('/getStudentLList', answerPaperHandler.getStudentLList);
//获得选中课堂下试卷简略列表
studentAnswerRoute.post('/getStudentPaperLists', answerPaperHandler.getStudentPaperLists);
//选中待答试卷，生成学生答卷信息表
studentAnswerRoute.post('/createAnswerPaper', answerPaperHandler.createAnswerPaper);
//生成完成的选择题答题信息表
studentAnswerRoute.post('/createAnswerChoiceQ', answerPaperHandler.createAnswerChoiceQ);
//生成完成的填空题答题信息表
studentAnswerRoute.post('/createAnswerFillQ', answerPaperHandler.createAnswerFillQ);
//生成完成的简答题答题信息表
studentAnswerRoute.post('/createAnswerShortQ', answerPaperHandler.createAnswerShortQ);
//确认提交试卷
studentAnswerRoute.post('/submitPaper', answerPaperHandler.submitPaper);

module.exports = studentAnswerRoute;
