import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 需要维护的状态
const state = {
  // 进入题库时的缓存信息
  s_questionBankCache: {
    courseId: '',
  },

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

  // 卷库
  // 组卷
  // 选中的题目
  s_selectedQuestion: {
    choiceQuestionSelected: [],
    FITBQuestionSelected: [],
    SAQQuestionSelected: [],
    questionCount: 0,
  },
  s_basicPaperInfo: {
    courseId: '',
    paperTitle: '',
    paperDesc: '',
    paperId: '',
    timeLimit: 0,
    share: 1,
  },

  // 查看试卷的缓存
  s_viewPaperCache: {
    paperId: '',
  },

  // 发布时的缓存
  s_publishCache: {
    lessonList: [
      { lessonId: '', studentNumber: 0 }
    ],
    paperId: '',
    paperTitle: '',
    totalScore: 0,
    courseId: '',
    lessonId: [],
    courseName: '',
    choiceQList: [{
      choiceQuestionId: '',
      stem: '',
      answerOptions: [],
      options: [],
      questionScore: 0,
    }],
    fillQList: [{
      fillQuestionId: '',
      stem: '',
      chapter: 0,
      answerOptions: [],
      questionScore: 0,
    }],
    shortQList: [{
      shortQuestionId: '',
      stem: '',
      chapter: 0,
      answer: '',
      questionScore: 0,
    }],
  },

  // 管理课堂缓存
  s_manageClassCache:{

  }
};

const mutations = {
  // 出题时的缓存信息
  updateQuestionBankCache(state, payload) {
    state.s_questionBankCache = payload
  },
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
  // 删除题目
  delSelectedQuestion(state) {
    if (state.s_selectedQuestion.questionCount > 0) {
      state.s_selectedQuestion.questionCount--
    }
  },
  // 增加题目
  addQuestion2SelectedQuestion(state) {
    state.s_selectedQuestion.questionCount++
  },



  // 更新组卷的基本信息
  updateBasicPaperInfo(state, payload) {
    state.s_basicPaperInfo = payload
  },

  // 查看试卷时候的缓存
  updateViewPaperCache(state, payload) {
    state.s_viewPaperCache = payload
  },

  // 发布时的缓存
  updatePublishCache(state, payload) {
    for (let key in payload) {
      if (state.s_publishCache.hasOwnProperty(key)) {
        state.s_publishCache[key] = payload[key]
      }
    }
  },
}

export default new Vuex.Store({ state, mutations });
