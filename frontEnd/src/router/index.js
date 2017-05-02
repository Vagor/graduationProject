import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: __dirname,
  routes: [
    // 首页
    {
      path: '/',
      component: require('../components/home.vue')
    },{
      path: '/teacherHomePage',
      name: 'teacherHomePage',
      component: require('../components/teacherHomePage.vue')
    }, {
      path: '/nothing',
      name: 'nothing',
      component: require('../components/nothing.vue')
    },
    // 题库    
    {
      path: '/questionBank',
      name: 'questionBank',
      component: require('../components/questionBank/questionBank.vue')
    }, {
      path: '/createQuestion',
      component: require('../components/questionBank/createQuestion.vue')
    }, {
      path: '/createChoiceQuestion',
      component: require('../components/questionBank/createChoiceQuestion.vue')
    }, {
      path: '/createFITBQuestion',
      component: require('../components/questionBank/createFITBQuestion.vue')
    }, {
      path: '/createSAQQuestion',
      component: require('../components/questionBank/createSAQQuestion.vue')
    }, {
      path: '/previewChoiceQuestion',
      component: require('../components/questionBank/previewChoiceQuestion.vue')
    }, {
      path: '/previewFITBQuestion',
      component: require('../components/questionBank/previewFITBQuestion.vue')
    }, {
      path: '/previewSAQQuestion',
      component: require('../components/questionBank/previewSAQQuestion.vue')
    }, {
      path: '/viewChoiceQuestion/:questionId',
      name: 'viewChoiceQuestion',
      component: require('../components/questionBank/viewChoiceQuestion.vue')
    }, {
      path: '/viewFITBQuestion/:questionId',
      name: 'viewFITBQuestion',
      component: require('../components/questionBank/viewFITBQuestion.vue')
    }, {
      path: '/viewSAQQuestion/:questionId',
      name: 'viewSAQQuestion',
      component: require('../components/questionBank/viewSAQQuestion.vue')
    }, {
      path: '/chooseCourse4question',
      name: 'chooseCourse4question',
      component: require('../components/questionBank/chooseCourse4question.vue')
    },
    // 卷库
    {
      path: '/paperBank',
      name: 'paperBank',
      component: require('../components/paperBank/paperBank.vue')
    }, {
      path: '/chooseCourse4paper',
      name: 'chooseCourse4paper',
      component: require('../components/paperBank/chooseCourse4paper.vue')
    }, {
      path: '/createPaper',
      name: 'createPaper',
      component: require('../components/paperBank/createPaper.vue')
    }, {
      path: '/createPaper_paperInfo',
      name: 'createPaper_paperInfo',
      component: require('../components/paperBank/createPaper_paperInfo.vue')
    }, {
      path: '/questionBank4createPaper',
      name: 'questionBank4createPaper',
      component: require('../components/paperBank/questionBank4createPaper.vue')
    }, {
      path: '/questionBank4selectedQuestion',
      name: 'questionBank4selectedQuestion',
      component: require('../components/paperBank/questionBank4selectedQuestion.vue')
    }, {
      path: '/viewPaperInfo',
      name: 'viewPaperInfo',
      component: require('../components/paperBank/viewPaperInfo.vue')
    }, {
      path: '/viewPaper',
      name: 'viewPaper',
      component: require('../components/paperBank/viewPaper.vue')
    },

    // 发布
    {
      path: '/publish/chooseBasicInfo',
      name: 'chooseBasicInfo',
      component: require('../components/publish/chooseBasicInfo.vue')
    }, {
      path: '/publish/paperBank4publish',
      name: 'paperBank4publish',
      component: require('../components/publish/paperBank4publish.vue')
    }, {
      path: '/publish/paperInfo4publish',
      name: 'paperInfo4publish',
      component: require('../components/publish/paperInfo4publish.vue')
    },


    // 管理班级
    {
      path: '/class/chooseClass',
      name: 'chooseClass',
      component: require('../components/class/chooseClass.vue')
    },{
      path: '/class/addClass',
      name: 'addClass',
      component: require('../components/class/addClass.vue')
    },



    // 学生
    {
      path: '/student',
      name: 's_home',
      component: require('../components/student/home/home.vue'),
    }, {
      path: '/student/myClass',
      name: 's_myClass',
      component: require('../components/student/myClass/myClass.vue'),
    }, {
      path: '/student/myPaper',
      name: 's_myPaper',
      component: require('../components/student/myPaper/myPaper.vue'),
    }, {
      path: '/student/myPaperList',
      name: 's_myPaperList',
      component: require('../components/student/myPaper/myPaperList.vue'),
    }, {
      path: '/student/paperWaitingPage',
      name: 's_paperWaitingPage',
      component: require('../components/student/myPaper/paperWaitingPage.vue'),
    }, {
      // 简答
      path: '/student/paperCompletion',
      name: 's_paperCompletion',
      component: require('../components/student/myPaper/paperCompletion.vue'),
    }, {
      path: '/student/doQuestion',
      component: require('../components/student/myPaper/doQuestion.vue'),
      children: [
        {
          // 选择      
          path: 'doCQ',
          name: 's_doCQ',
          component: require('../components/student/myPaper/doCQ.vue'),
        }, {
          // 填空      
          path: 'doFQ',
          name: 's_doFQ',
          component: require('../components/student/myPaper/doFQ.vue'),
        }, {
          // 简答
          path: 'doSQ',
          name: 's_doSQ',
          component: require('../components/student/myPaper/doSQ.vue'),
        },
      ]
    }
  ]
})
