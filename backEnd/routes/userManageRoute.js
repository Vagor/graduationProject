var express = require('express');
var userManageRoute = express.Router();
var logInHandler = require('../handlers/user/logInHandler.js');

//登录返回用户信息
userManageRoute.post('/logInAndGetInf', logInHandler.logInAndGetInf);

module.exports =  userManageRoute;
