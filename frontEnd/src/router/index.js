import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: __dirname,
  routes: [
    // 首页
    {
      path: '/',
      component: require('../components/teacherHomePage.vue')
    }, {
      path: '/nothing',
      name: 'nothing',      
      component: require('../components/nothing.vue')
    }, 
    // 题库    
    {
      path: '/chooseCourse',
      name: 'chooseCourse',
      component: require('../components/questionBank/chooseCourse.vue')
    },{
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
    },
    // 卷库
    {
      path: '/paperBank',
      name: 'paperBank',
      component: require('../components/paperBank/paperBank.vue')
    },{
      path: '/createPaper',
      name: 'createPaper',
      component: require('../components/paperBank/createPaper.vue')
    },     
  ]
})
