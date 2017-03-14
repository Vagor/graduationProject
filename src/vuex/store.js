import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 需要维护的状态
const state = {
  // 选择题
  s_choiceQuestionContent: '',
  s_choiceA: '',
  s_choiceB: '',
  s_choiceC: '',
  s_choiceD: '',
  s_choiceQuestionChapter: '',

  // 填空题
  s_FITBQuestionContent: '',
  s_FITBQuestionBlankCounter: 0,

  // 简答题
  s_SAQQuestionContent:'',

};

const mutations = {
  // 选择题
  newChoiceQuestionContent(state,payload) {
    state.s_choiceQuestionContent = payload;
  },
  newChoiceQuestionChoice(state,payload) {
    state.s_choiceA = payload.choiceA
    state.s_choiceB = payload.choiceB
    state.s_choiceC = payload.choiceC
    state.s_choiceD = payload.choiceD
  },
  newChoiceQuestionChapter(state,payload) {
    state.s_choiceQuestionChapter = payload
  },

  // 填空题
  newFITBQuestionContent(state,payload) {
    state.s_FITBQuestionContent = payload.FITBQuestionContent
    state.s_FITBQuestionBlankCounter = payload.FITBQuestionBlankCounter
  },

  // 简答题
  newSAQQuestionContent(state,payload) {
    state.s_SAQQuestionContent = payload
  },
}

export default new Vuex.Store({state, mutations});
