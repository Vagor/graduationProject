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
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认交卷</mt-button>
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
