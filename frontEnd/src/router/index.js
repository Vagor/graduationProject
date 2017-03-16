import Vue from 'vue'
import Router from 'vue-router'
import QuestionBank from '../components/teacher/questionBank'
import CreateQuestion from '../components/teacher/createQuestion.vue'

Vue.use(Router)

export default new Router({
  base: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/questionBank'
    }, {
      path: '/nothing',
      component: require('../components/nothing.vue')
    }, {
      path: '/questionBank',
      component: QuestionBank
    }, {
      path: '/createQuestion',
      component: CreateQuestion
    }, {
      path: '/createChoiceQuestion',
      component: require('../components/teacher/createChoiceQuestion.vue')
    }, {
      path: '/createFITBQuestion',
      component: require('../components/teacher/createFITBQuestion.vue')
    }, {
      path: '/createSAQQuestion',
      component: require('../components/teacher/createSAQQuestion.vue')
    }, {
      path: '/previewChoiceQuestion',
      component: require('../components/teacher/previewChoiceQuestion.vue')
    }, {
      path: '/previewFITBQuestion',
      component: require('../components/teacher/previewFITBQuestion.vue')
    }, {
      path: '/previewSAQQuestion',
      component: require('../components/teacher/previewSAQQuestion.vue')
    }, {
      path: '/viewChoiceQuestion/:questionId',
      name: 'viewChoiceQuestion',
      component: require('../components/teacher/viewChoiceQuestion.vue')
    }, {
      path: '/viewFITBQuestion/:questionId',
      name: 'viewFITBQuestion',
      component: require('../components/teacher/viewFITBQuestion.vue')
    }, {
      path: '/viewSAQQuestion/:questionId',
      name: 'viewSAQQuestion',
      component: require('../components/teacher/viewSAQQuestion.vue')
    },
  ]
})
