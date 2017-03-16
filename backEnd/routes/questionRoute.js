var express = require('express');
var questionRoute = express.Router();
var choiceQuestionHandler=require('../handlers/question/choiceQuestionHandler.js');

// 选择题
questionRoute.post('/getChoiceQuestionList',choiceQuestionHandler.getChoiceQuestionList);
questionRoute.post('/getChoiceQuestionContent',choiceQuestionHandler.getChoiceQuestionContent);
questionRoute.post('/updateChoiceQuestion',choiceQuestionHandler.updateChoiceQuestion);
questionRoute.post('/deleteChoiceQuestion',choiceQuestionHandler.deleteChoiceQuestion);

// 填空题



// 问答题









module.exports = questionRoute;
