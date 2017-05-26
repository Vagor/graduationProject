<template>
    <div>
        <mt-header :title="title">
            <router-link v-on:click.native="goBack()" to="" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <label class="block-title">选择题</label>
        <mt-cell>（系统批改）</mt-cell>
        <template v-for="item in choiceQCollectionList">
            <mt-cell class="left" :title="item.label" is-link :to = "{ name: 'correctAnswerLists', params: {answerSQuestionCollectionId: item.questionId, shortQuestionId: item.motherQId }}"></mt-cell>
        </template>
        <label class="block-title">填空题</label>
        <mt-cell>（系统批改）</mt-cell>
        <template v-for="item in fillQCollectionList">
            <mt-cell class="left" :title="item.label" is-link :to = "{ name: 'correctAnswerLists', params: {answerSQuestionCollectionId: item.questionId, shortQuestionId: item.motherQId }}"></mt-cell>
        </template>
        <label class="block-title">选择题目</label>
        <template v-for="item in shortQCollectionList">
            <mt-cell class="left" :title="item.label" is-link :to = "{ name: 'correctAnswerLists', params: {answerSQuestionCollectionId: item.questionId, shortQuestionId: item.motherQId }}" @click.native="updateSQDetail(item)"></mt-cell>
        </template>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '批改试卷',
        choiceQCollectionList: [],
        fillQCollectionList: [],
        shortQCollectionList: [],
        courseChosed: '0',
      }
    },
    mounted: function() {
      // 初始化
      // 获取课堂id
      var ID = this.$route.params.paperId;
      ID = '5904c4f9dbc8660bb432a716'; // 使用测试ID，正式环境删除此行
      this.$http.post('/getWCPaperSQCollectionList', {
        answerPaperCollectionId: ID
      }).then((res) => {
        this.shortQCollectionList = res.data.shortQCollectionList.map((row, index) => {
            return {
                label: row.stem,
                motherQId: row.shortQuestionId,
                questionId: row._id,
                questionScore: row.questionScore,
                answer: row.answer
            }
        })
      })
      // 接口未完成
      // this.$http.post('/getWCPaperCQCollectionList', {
      //   answerPaperCollectionId: ID
      // }).then((res) => {
      //   this.choiceQCollectionList = res.data.choiceQCollectionList.map((row, index) => {
      //       return {
      //           label: row.stem,
      //           motherQId: row.shortQuestionId,
      //           questionId: row._id,
      //           questionScore: row.questionScore,
      //           answer: row.answer
      //       }
      //   })
      // })
      // this.$http.post('/getWCPaperFQCollectionList', {
      //   answerPaperCollectionId: ID
      // }).then((res) => {
      //   this.fillQCollectionList = res.data.fillQCollectionList.map((row, index) => {
      //       return {
      //           label: row.stem,
      //           motherQId: row.shortQuestionId,
      //           questionId: row._id,
      //           questionScore: row.questionScore,
      //           answer: row.answer
      //       }
      //   })
      // })
    },
    methods: {
        updateSQDetail(item) {
            this.$store.commit('updateSQDetail', {
                stem: item.label,
                score: item.questionScore,
                answer: item.answer
            })
        }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>