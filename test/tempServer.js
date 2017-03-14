var express = require('express');
var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/getChoiceQuestionList', function (req, res) {
  res.json({choiceQuestionList:[{
      questionId: 123,
      title: '“大煮干丝”是哪个菜系的代表菜之一',
      disc: '第1章'
    },
    {
      questionId: 123,
      title: '红茶属于( )茶',
      disc: '第3章'
    },
    {
      questionId: 123,
      title: '满汉全席起兴于（ ）',
      disc: '第4章'
    },
    {
      questionId: 123,
      title: '吃冰淇淋不解渴主要是因为它',
      disc: '第8章'
    },
  ]})
});
app.post('/getChoiceQuestionList', function (req, res) {
  res.json({choiceQuestionList:[{
      questionId: 123,
      title: '“大煮干丝”是哪个菜系的代表菜之一',
      disc: '第1章'
    },
    {
      questionId: 123,
      title: '红茶属于( )茶',
      disc: '第3章'
    },
    {
      questionId: 123,
      title: '满汉全席起兴于（ ）',
      disc: '第4章'
    },
    {
      questionId: 123,
      title: '吃冰淇淋不解渴主要是因为它',
      disc: '第8章'
    },
  ]})
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
