<template>
  <div>
    <mt-header title="试卷情况">
      <router-link v-on:click.native="goBackToMyPaperList()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">总分</label>
    <mt-cell class="left" title="总分（换算成百分制）" label="选择题每题3分，填空题每题4分，问答题每题5分">{{totalScore}}</mt-cell>
    <label class="block-title">选择题（{{CQCount}}/{{CQCount+FQCount+SQCount}}）</label>
    <mt-cell v-for="item in choiceQList " is-link :to="{ name: 's_viewCorrectCQ', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">
      <mt-badge type="success">{{item.getScore}}</mt-badge>
    </mt-cell>
    <label class="block-title">填空题（{{FQCount}}/{{CQCount+FQCount+SQCount}}）</label>
    <mt-cell v-for="item in fQList " is-link :to="{ name: 's_viewCorrectFQ', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">
      <mt-badge type="success">{{item.getScore}}</mt-badge>
    </mt-cell>
    <label class="block-title">简答题（{{SQCount}}/{{CQCount+FQCount+SQCount}}）</label>
    <mt-cell v-for="item in sQList " is-link :to="{ name: 's_viewCorrectSQ', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">
      <mt-badge type="success">{{item.getScore}}</mt-badge>
    </mt-cell>
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
        totalScore: 0,
      }
    },
    name: "paperChecked",
    methods: {
      goBackToMyPaperList() {
        this.$router.push('/student/myPaperList/'+this.$store.state.s_viewChechedQuestionCache.lessonId+'/'+this.$store.state.s_viewChechedQuestionCache.teacherId)
      },
      initPage() {
        // 获取试卷总分
        this.$http.post('/getTotalScore', {
          studentId: window._const.studentId,
          paperId: this.$route.params.paperId
        }).then((res) => {
          this.totalScore = res.data.totalScore
        })
        
        // 初始化选择题列表
        this.$http.post('/getCQLByPId', {
          paperId: this.$route.params.paperId
        }).then((res) => {
          var temp;
          for (var i = 0; i < res.data.choiceQList.length; i++) {
            temp = {
              questionId: res.data.choiceQList[i]._id,
              stem: res.data.choiceQList[i].stem,
              chapter: '第' + res.data.choiceQList[i].chapter + '章',
              index: i,
              getScore: res.data.choiceQList[i].getScore,
            }
            this.choiceQList.push(temp)
          }
          this.CQCount = this.choiceQList.length
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
              chapter: '第' + res.data.fQList[i].chapter + '章',
              index: i,
              getScore: res.data.fQList[i].getScore,
            }
            this.fQList.push(temp)
          }
          this.FQCount = this.fQList.length
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
              chapter: '第' + res.data.sQList[i].chapter + '章',
              index: i,
              getScore: res.data.sQList[i].getScore,
            }
            this.sQList.push(temp)
          }
          this.SQCount = this.sQList.length
          // updateViewChechedQuestionCache
          this.$store.commit('updateViewChechedQuestionCache', {
            paperId: this.$route.params.paperId,
            sQList: this.sQList,
            SQCount: this.SQCount,
            fQList: this.fQList,
            FQCount: this.FQCount,
            choiceQList: this.choiceQList,
            CQCount: this.CQCount,
          })
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
