<template>
  <div>
    <mt-header title="整体情况">
    </mt-header>
    <label class="block-title">选择题（{{CQCount}}/{{CQCount+FQCount+SQCount}}）</label>
    <mt-cell v-for="item in choiceQList " is-link :to="{ name: 's_doCQ', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">
      <mt-badge type="error" v-if="QCondition['question_'+item.questionId].done == 0">未完成</mt-badge>
      <mt-badge type="success" v-if="QCondition['question_'+item.questionId].done == 1">已完成</mt-badge>
    </mt-cell>
    <label class="block-title">填空题（{{FQCount}}/{{CQCount+FQCount+SQCount}}）</label>
    <mt-cell v-for="item in fQList " is-link :to="{ name: 's_doFQ', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">
      <mt-badge type="error" v-if="QCondition['question_'+item.questionId].done == 0">未完成</mt-badge>
      <mt-badge type="success" v-if="QCondition['question_'+item.questionId].done == 1">已完成</mt-badge>
    </mt-cell>
    <label class="block-title">简答题（{{SQCount}}/{{CQCount+FQCount+SQCount}}）</label>
    <mt-cell v-for="item in sQList " is-link :to="{ name: 's_doSQ', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">
      <mt-badge type="error" v-if="QCondition['question_'+item.questionId].done == 0">未完成</mt-badge>
      <mt-badge type="success" v-if="QCondition['question_'+item.questionId].done == 1">已完成</mt-badge>
    </mt-cell>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="handUpPaper()">确认交卷</mt-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        paperDesc: '',
        paperTitle: '',
        choiceQList: [],
        fQList: [],
        sQList: [],
        SQCount: 0,
        FQCount: 0,
        CQCount: 0,
        QCondition: {},
      }
    },
    methods: {
      initPage() {
        this.QCondition = this.$store.state.s_doQuestionCache.QCondition
        this.sQList = this.$store.state.s_doQuestionCache.sQList
        this.SQCount = this.$store.state.s_doQuestionCache.SQCount
        this.fQList = this.$store.state.s_doQuestionCache.fQList
        this.FQCount = this.$store.state.s_doQuestionCache.FQCount
        this.choiceQList = this.$store.state.s_doQuestionCache.choiceQList
        this.CQCount = this.$store.state.s_doQuestionCache.CQCount
        let QOrderList = []
        for (var i = 0; i < this.choiceQList.length; i++) {
          QOrderList.push(this.choiceQList[i].questionId)
        }
        for (var i = 0; i < this.fQList.length; i++) {
          QOrderList.push(this.fQList[i].questionId)
        }
        for (var i = 0; i < this.sQList.length; i++) {
          QOrderList.push(this.sQList[i].questionId)
        }
        this.$store.commit('updateDoQuestionCache', {
          QOrderList: QOrderList,
        })
      },
      handUpPaper() {
        // 处理即将提交的数据
        let QCondition = this.$store.state.s_doQuestionCache.QCondition
        // 处理fillQList
        let fillQList = this.$store.state.s_doQuestionCache.fQList
        for (var key in fillQList) {
          if (fillQList.hasOwnProperty(key)) {
            let _questionId = fillQList[key].questionId
            let key4QCondition = "question_" + _questionId
            let studentOptions = []
            studentOptions.push(QCondition[key4QCondition].answerOption1)
            studentOptions.push(QCondition[key4QCondition].answerOption2)
            studentOptions.push(QCondition[key4QCondition].answerOption3)
            studentOptions.push(QCondition[key4QCondition].answerOption4)
            fillQList[key].studentOptions = studentOptions
          }
        }
        // 处理choiceQList
        let choiceQList = this.$store.state.s_doQuestionCache.choiceQList
        for (var key in choiceQList) {
          if (choiceQList.hasOwnProperty(key)) {
            let _questionId = choiceQList[key].questionId
            let key4QCondition = "question_" + _questionId
            let studentOption = QCondition[key4QCondition].choice
            choiceQList[key].studentOption = studentOption
          }
        }
        // 处理shortQList
        let shortQList = this.$store.state.s_doQuestionCache.sQList
        for (var key in shortQList) {
          if (shortQList.hasOwnProperty(key)) {
            let _questionId = shortQList[key].questionId
            let key4QCondition = "question_" + _questionId
            let studentAnswer = QCondition[key4QCondition].answer
            shortQList[key].studentAnswer = studentAnswer
          }
        }
        this.$http.post('/studentSubmitPaper', {
          studentId: window._const.studentId,
          lessonId: this.$store.state.s_doQuestionCache.lessonId,
          paperId: this.$store.state.s_doQuestionCache.paperId,
          paperTitle: this.$store.state.s_doQuestionCache.paperTitle,
          totalScore: this.$store.state.s_doQuestionCache.SQCount * 5 + this.$store.state.s_doQuestionCache.FQCount * 4 + this.$store.state.s_doQuestionCache.CQCount * 3,
          // 以下是用于数据统计课堂考试情况的字段
          // answerPaperNumber
          // studentNumber
          // answerPaperCollectionId
          fillQList: fillQList,
          choiceQList: choiceQList,
          shortQList: shortQList,
        }).then((res) => {
          if (res.data.success == 1) {
            this.$toast({
              message: '操作成功',
              duration: 1000,
            })
            this.$router.push('/student')
          }
        })
      }
    },
    mounted: function() {
      this.initPage()
    },
    filters: {
      characterLimit: (value) => {
        if (value.length > 15) {
          return value.slice(0, 14) + "..."
        } else {
          return value
        }
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
