<template>
  <div>
    <mt-header title="整体情况">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">选择题（{{CQCount}}/{{CQCount+FQCount+SQCount}}）</label>
    <mt-cell v-for="item in choiceQList " is-link :to="{ name: 's_doCQ', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">
      <mt-badge type="error">未完成</mt-badge>
    </mt-cell>
    <label class="block-title">填空题（{{FQCount}}/{{CQCount+FQCount+SQCount}}）</label>
    <mt-cell v-for="item in fQList " is-link :to="{ name: 's_doCQ', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">
      <mt-badge type="error">未完成</mt-badge>
    </mt-cell>
    <label class="block-title">简答题（{{SQCount}}/{{CQCount+FQCount+SQCount}}）</label>
    <mt-cell v-for="item in sQList " is-link :to="{ name: 's_doCQ', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">
      <mt-badge type="error">未完成</mt-badge>
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
      }
    },
    methods: {
      initPage() {
        // 初始化选择题列表
        this.$http.post('/getCQLByPId', {
          paperId: this.$route.params.paperId
        }).then((res) => {
          var temp;
          for (var i = 0; i < res.data.choiceQList.length; i++) {
            temp = {
              questionId: res.data.choiceQList[i]._id,
              stem: res.data.choiceQList[i].stem,
              chapter: '第' + res.data.choiceQList[i].chapter + '章'
            }
            this.choiceQList.push(temp)
          }
        })
        // 初始化填空题列表
        this.$http.post('/getFQLByPId', {
          paperId: this.$route.params.paperId
        }).then((res) => {
          var temp;
          for (var i = 0; i < res.data.fQList.length; i++) {
            temp = {
              questionId: res.data.fQList[i]._id,
              stem: res.data.fQList[i].stem,
              chapter: '第' + res.data.fQList[i].chapter + '章'
            }
            this.fQList.push(temp)
          }
        })
        // 初始化问答题列表
        this.$http.post('/getSQLByPId', {
          paperId: this.$route.params.paperId
        }).then((res) => {
          var temp;
          for (var i = 0; i < res.data.sQList.length; i++) {
            temp = {
              questionId: res.data.sQList[i]._id,
              stem: res.data.sQList[i].stem,
              chapter: '第' + res.data.sQList[i].chapter + '章'
            }
            this.sQList.push(temp)
          }
          this.SQCount = this.sQList.length
          this.FQCount = this.fQList.length
          this.CQCount = this.choiceQList.length
          // updateDoQuestionCache
          this.$store.commit('updateDoQuestionCache', {
            sQList: this.sQList,
            choiceQList: this.choiceQList,
            fQList: this.fQList,
            SQCount: this.SQCount,
            FQCount: this.FQCount,
            CQCount: this.CQCount,
          })
        })
      }
    },
    mounted: function() {
      this.initPage()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
