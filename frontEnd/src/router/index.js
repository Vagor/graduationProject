import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: __dirname,
  routes: [
    // 工具
    {
      path: '/refresh4questionBank4selectedQuestion',
      name: 'refresh4questionBank4selectedQuestion',
      component: require('../components/tools/refresh4questionBank4selectedQuestion.vue')
    }, {
      path: '/nothing',
      name: 'nothing',
      component: require('../components/nothing.vue')
    }, {
      path: '/',
      component: require('../components/home.vue')
    },


    // 老师
    // 首页
    {
      path: '/teacherHomePage',
      name: 'teacherHomePage',
      component: require('../components/teacher/teacherHomePage.vue')
    },
    // 题库    
    {
      path: '/questionBank/:courseId',
      name: 'questionBank',
      component: require('../components/teacher/questionBank/questionBank.vue')
    }, {
      path: '/createQuestion',
      component: require('../components/teacher/questionBank/createQuestion.vue')
    }, {
      path: '/createChoiceQuestion',
      component: require('../components/teacher/questionBank/createChoiceQuestion.vue')
    }, {
      path: '/createFITBQuestion',
      component: require('../components/teacher/questionBank/createFITBQuestion.vue')
    }, {
      path: '/createSAQQuestion',
      component: require('../components/teacher/questionBank/createSAQQuestion.vue')
    }, {
      path: '/previewChoiceQuestion',
      component: require('../components/teacher/questionBank/previewChoiceQuestion.vue')
    }, {
      path: '/previewFITBQuestion',
      component: require('../components/teacher/questionBank/previewFITBQuestion.vue')
    }, {
      path: '/previewSAQQuestion',
      component: require('../components/teacher/questionBank/previewSAQQuestion.vue')
    }, {
      path: '/viewChoiceQuestion/:questionId',
      name: 'viewChoiceQuestion',
      component: require('../components/teacher/questionBank/viewChoiceQuestion.vue')
    }, {
      path: '/viewFITBQuestion/:questionId',
      name: 'viewFITBQuestion',
      component: require('../components/teacher/questionBank/viewFITBQuestion.vue')
    }, {
      path: '/viewSAQQuestion/:questionId',
      name: 'viewSAQQuestion',
      component: require('../components/teacher/questionBank/viewSAQQuestion.vue')
    }, {
      path: '/chooseCourse4question',
      name: 'chooseCourse4question',
      component: require('../components/teacher/questionBank/chooseCourse4question.vue')
    },
    // 卷库
    {
      path: '/paperBank',
      name: 'paperBank',
      component: require('../components/teacher/paperBank/paperBank.vue')
    }, {
      path: '/chooseCourse4paper',
      name: 'chooseCourse4paper',
      component: require('../components/teacher/paperBank/chooseCourse4paper.vue')
    }, {
      path: '/createPaper',
      name: 'createPaper',
      component: require('../components/teacher/paperBank/createPaper.vue')
    }, {
      path: '/createPaper_paperInfo/:courseId',
      name: 'createPaper_paperInfo',
      component: require('../components/teacher/paperBank/createPaper_paperInfo.vue')
    }, {
      path: '/questionBank4createPaper/:courseId',
      name: 'questionBank4createPaper',
      component: require('../components/teacher/paperBank/questionBank4createPaper.vue')
    }, {
      path: '/questionBank4selectedQuestion',
      name: 'questionBank4selectedQuestion',
      component: require('../components/teacher/paperBank/questionBank4selectedQuestion.vue')
    }, {
      path: '/viewPaperInfo/:paperId',
      name: 'viewPaperInfo',
      component: require('../components/teacher/paperBank/viewPaperInfo.vue')
    }, {
      path: '/viewPaper/:paperId',
      name: 'viewPaper',
      component: require('../components/teacher/paperBank/viewPaper.vue')
    },

    // 发布
    {
      path: '/publish/chooseBasicInfo',
      name: 'chooseBasicInfo',
      component: require('../components/teacher/publish/chooseBasicInfo.vue')
    }, {
      path: '/publish/paperBank4publish',
      name: 'paperBank4publish',
      component: require('../components/teacher/publish/paperBank4publish.vue')
    }, {
      path: '/publish/paperInfo4publish/:paperId',
      name: 'paperInfo4publish',
      component: require('../components/teacher/publish/paperInfo4publish.vue')
    },


    // 管理班级
    {
      path: '/class/chooseClass',
      name: 'chooseClass',
      component: require('../components/teacher/class/chooseClass.vue')
    }, {
      path: '/class/addClass',
      name: 'addClass',
      component: require('../components/teacher/class/addClass.vue')
    }, {
      path: '/viewLesson/:lessonId',
      name: 'viewLesson',
      component: require('../components/teacher/class/viewLesson.vue'),
    }, {
      path: '/viewClass/:classId',
      name: 'viewClass',
      component: require('../components/teacher/class/viewClass.vue'),
    },

    // 个人信息
    {
      path: '/myInfo',
      name: 'teacher_myInfo',
      component: require('../components/teacher/myInfo/myInfo.vue'),
    },






    // 学生
    {
      path: '/student',
      name: 's_home',
      component: require('../components/student/home/home.vue'),
    },
    // 我的课堂
    {
      path: '/student/viewLesson',
      name: 's_viewLesson',
      component: require('../components/student/myClass/viewLesson.vue'),
    },

    // 我的试卷
    {
      path: '/student/chooseCourse4PaperList',
      name: 's_chooseCourse4PaperList',
      component: require('../components/student/myPaper/chooseCourse4PaperList.vue'),
    }, {
      path: '/student/myPaperList/:lessonId/:teacherId',
      name: 's_myPaperList',
      component: require('../components/student/myPaper/myPaperList.vue'),
    }, {
      path: '/student/paperWaitingPage/:paperId',
      name: 's_paperWaitingPage',
      component: require('../components/student/myPaper/paperWaitingPage.vue'),
    }, {
      path: '/student/paperCompletion',
      name: 's_paperCompletion',
      component: require('../components/student/myPaper/paperCompletion.vue'),
    },{
      path: '/student/questionList4Paper/:paperId',
      name: 's_questionList4Paper',
      component: require('../components/student/myPaper/questionList4Paper.vue'),
    },  {
      path: '/student/doQuestion',
      component: require('../components/student/myPaper/doQuestion.vue'),
      children: [
        {
          // 选择      
          path: 'doCQ/:questionId',
          name: 's_doCQ',
          component: require('../components/student/myPaper/doCQ.vue'),
        }, {
          // 填空      
          path: 'doFQ/:questionId',
          name: 's_doFQ',
          component: require('../components/student/myPaper/doFQ.vue'),
        }, {
          // 简答
          path: 'doSQ/:questionId',
          name: 's_doSQ',
          component: require('../components/student/myPaper/doSQ.vue'),
        },
      ]
    },

    // 个人信息
    {
      path: '/student/myInfo',
      name: 'student_myInfo',
      component: require('../components/student/myInfo/myInfo.vue'),
    },

  ]
})
