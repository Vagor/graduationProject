var express = require('express');
var questionRoute = express.Router();
var choiceQuestionHandler=require('../handlers/question/choiceQuestionHandler.js');
var SAQQuestionHandler=require('../handlers/question/SAQQuestionHandler.js');

// 选择题
questionRoute.post('/getChoiceQuestionList',choiceQuestionHandler.getChoiceQuestionList);
questionRoute.post('/getChoiceQuestionContent',choiceQuestionHandler.getChoiceQuestionContent);
questionRoute.post('/updateChoiceQuestion',choiceQuestionHandler.updateChoiceQuestion);
questionRoute.post('/deleteChoiceQuestion',choiceQuestionHandler.deleteChoiceQuestion);

// 填空题



// 问答题
questionRoute.post('/getSAQQuestionList',SAQQuestionHandler.getSAQQuestionList);
questionRoute.post('/getSAQQuestionContent',SAQQuestionHandler.getSAQQuestionContent);
questionRoute.post('/updateSAQQuestion',SAQQuestionHandler.updateSAQQuestion);
questionRoute.post('/deleteSAQQuestion',SAQQuestionHandler.deleteSAQQuestion);









module.exports = questionRoute;
