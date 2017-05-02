import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 需要维护的状态
const state = {
  // 选择题
  s_choiceQuestionContent: {
    stem: '',
    choiceA: '',
    choiceB: '',
    choiceC: '',
    choiceD: '',
    chapter: '',
    answerOption: ''
  },

  // 填空题
  s_FITBQuestionContent: {
    stem: '',
    blankCounter: 0,
    chapter: '',
    answerOption1: '',
    answerOption2: '',
    answerOption3: '',
    answerOption4: ''
  },

  // 简答题
  s_SAQQuestionContent: {
    stem: '',
    answer: '',
    chapter: ''
  },

  // 选中的题目
  s_selectedQuestion: {
    choiceQuestionSelected:[],
    FITBQuestionSelected:[],
    SAQQuestionSelected:[],
    questionCount:0,
  },


  // 选中的题目
  s_publishInfo: {
    courseId:'13123',
    lessonId:['123','3124'],
  },

};

const mutations = {
  // 选择题
  newChoiceQuestionContent(state, payload) {
    state.s_choiceQuestionContent = payload;
  },

  // 填空题
  newFITBQuestionContent(state, payload) {
    state.s_FITBQuestionContent = payload
  },

  // 简答题
  newSAQQuestionContent(state, payload) {
    state.s_SAQQuestionContent = payload
  },

  // 更新已选题库
  updateSelectedQuestion(state, payload) {
    state.s_selectedQuestion = payload
  },

}

export default new Vuex.Store({state, mutations});
