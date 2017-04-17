// 单个选择题题目
{
    stem: 'quetionEntity', //题干
    options: [
        'good', 'bad', 'yes', 'interesting'
    ], //选项
    answerOption: 1, //正确选项
    share: 0, //是否共享
    courseId: ObjectId("58c43c5879534a10c243fa11"),//所属课程
    chapter: 1, //所属章节
    teacherId: ObjectId("58c73c5879534a10c243fa11"), //出题人
}


//teacherbank
{ 
  teacherName: "Str",//老师姓名
  teacherId: ObjectId("58c73c5879534a10c243fa11"),  //老师id
  choiceQuestionGroup: [ObjectId("58c73c5879532a10c243fa11"),ObjectId("18c73c5879534a10c243fa11")], //选择题母题组
  blankQuestionIdGroup: [ObjectId("58c73c5879532a10c243fa11"),ObjectId("18c73c5879534a10c243fa11")], //填空题母题组
  shortAQIdGroup: [ObjectId("58c73c5879532a10c243fa11"),ObjectId("18c73c5879534a10c243fa11")],//简答题母题组
  lessonIdGroup: [ObjectId("58c73c5879532a10c243fa11"),ObjectId("18c73c5879534a10c243fa11")],//课堂组

}

//lessons
{ 
  name:"yuwen",//课堂名
  lessonCode:1,//课堂代号
}

//teacherlessons
{    
tid: ObjectId("58c73c5879534a10c243fa11"),//教师id
lid: ObjectId("58f18819acee7b47f08c06ac"),//课堂id
}

//motherpaper
{
"teacherId":ObjectId("58c73c5879534a10c243fa11"),  
"courseId" : ObjectId("58c43c5879534a10c243fa11"),
    "name" :"4"
}