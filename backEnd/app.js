var express = require('express')
var app = express()
var mongoose = require('mongoose')
// response数据处理
var bodyParser = require('body-parser');
// 路由
var questionRoute = require('./routes/questionRoute.js');
var paperRoute = require('./routes/paperRoute.js');
var studentAnswerRoute = require('./routes/studentAnswerRoute.js');

// 配置文件
var config = require('./config.js');


var port = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 连接数据库
var dbUrl = 'mongodb://' + config.db_host + ':' + config.db_port + '/' + config.db_name;
mongoose.connect(dbUrl)

app.use('/',questionRoute)
app.use('/',paperRoute)
app.use('/',studentAnswerRoute)
app.listen(port, function() {
    console.log("listening"+port);
});
