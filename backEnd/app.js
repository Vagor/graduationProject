var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var multer = require('multer');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var ChoiceQuestionModel = require('./models/ChoiceQuestionModel')
var TeacherBankModel = require('./models/TeacherBankModel')
//设置跨域访问
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.set('port', 3000)
mongoose.connect('mongodb://localhost/GraduationProjectDB')

//---------------------------------------------------------------------------------------------
// ========>拿到老师id，之后返回题干，章节，题目id
app.post('/getChoiceQuestionList', function (req, res) {
	var id = req.body.id
	console.log("getLIST拿到ID：" + req.body.id)
	ChoiceQuestionModel.find({ 'teacherId': id }, ['_id', 'stem', 'chapter'],
		function (err, choiceQuestionList) {
			res.send({ choiceQuestionList })
		}).sort({'meta.updateAt':-1})//按更新时间排序
	// choiceQuestionList 此时只包含文档的部分键值
});

//-------------------------------------------------------------------------------------------------------
//====> 拿到老师id，和题目全部信息保存入库
app.post('/updateChoiceQuestion', function (req, res) {
	var type = req.body.type
	if (type == 0) {// type=0 ===>新建；type=1 ===>更新；
		//新建选择题Entity,将前端数据存入Entity,使用Entity来增加一条数据
		var quetionEntity = new ChoiceQuestionModel(
			// {
			// stem:'quetionEntity',//题干
			// options: ['good','bad','yes'], //选项
			// answerOption: 1, //正确选项
			// share: 0,   //是否共享
			// courseId: '58c43c5879534a10c243fa11',  //所属课程
			// chapter: 1,    //所属章节
			// teacherId: '58c73c5879534a10c243fa11',  //出题人
			// }
			req.body.choiceQuestion
		)
		quetionEntity.save(function (err, question) {
			if (err) {
				console.log(err)
				res.json({ "success": 0 })
			}
			else {
				console.log("ok")
				res.json({ "success": 1 })
			}
		})
		//将此题id存入老师库的题组中
	}
	else {

		var conditions = { _id: req.body.choiceQuestion.questionId }
		var update = { $set: req.body.choiceQuestion }
		var options = { upsert: true }
		ChoiceQuestionModel.update(conditions, update, options, function (error) {
			if (error) {
				console.log(error)
			} else {
				console.log('update ok!')

			}
		})
		ChoiceQuestionModel.findById(req.body.choiceQuestion.questionId, function (err, choicequestion) {

			choicequestion.save(function (err, question) {
				if (err) {
					console.log(err)
					res.json({ "time success": 0 })
				}
				else {
					console.log("update time ok")
					res.json({ "time success": 1 })
				}
			})
		});
	}

})
//---------------------------------------------------------------------------------------------------------------------
//========>预览选择题详细内容
app.post('/getChoiceQuestionContent', function (req, res) {
	var id = req.body.questionId
	console.log("questionId拿到ID：" + req.body.id)
	ChoiceQuestionModel.findById(id, function (err, choicequestion) {
		if (err) {
			console.log(err)
		}
		res.send(choicequestion)
	}
	)
}
);
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//========>删除题目
app.post('/deleteChoiceQuestion', function (req, res) {
	var id = req.body.questionId
	console.log("delete拿到ID：" + req.body.questionId)

	// 删除记录
	var conditions = { _id: id };
	ChoiceQuestionModel.remove(conditions, function (error) {
		if (error) {
			console.log(error);
		} else {
			res.json({ "success": 1 })
			console.log('delete ok!');
		}
	});

}
);
//---------------------------------------------------------------------------------------------------------------------
/*app.get('/', function (req, res) {
	res.send("{id:1}");
});
*/
app.listen(3000, function () {
	console.log("listening 3000 ");
});
