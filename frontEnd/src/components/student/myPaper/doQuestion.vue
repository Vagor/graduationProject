<template>
  <div>
    <mt-header :title="title">
      <router-link to="/student/paperCompletion" v-on:click.native="goToPaperCompletion()" slot="left">
        <mt-button>整体情况（1/10）</mt-button>
      </router-link>
      <router-link v-on:click.native="lastQ()" to="" slot="right" v-if="index > 0">
        <mt-button>上一题</mt-button>
      </router-link>
    </mt-header>
    <router-view></router-view>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="nextQ()" v-if="index < QCount-1">下一题</mt-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        index: 0,
        QCount: 0,
      }
    },
    methods: {
      goToPaperCompletion() {
        this.$router.push('/student/paperCompletion/' + this.$store.state.s_doQuestionCache.paperId)
      },
      lastQ() {
        let _quesitonId = this.$store.state.s_doQuestionCache.QOrderList[--this.index]
        let key = "question_" + _quesitonId
        switch (this.$store.state.s_doQuestionCache.QCondition[key].type) {
          case 0: //选择题
            this.$router.push('/student/doQuestion/' + _quesitonId + '/doCQ')
            break;
          case 1: //填空题
            this.$router.push('/student/doQuestion/' + _quesitonId + '/doFQ')
            break;
          case 2: //简答题
            this.$router.push('/student/doQuestion/' + _quesitonId + '/doSQ')
            break;
          default:
            break;
        }
      },
      nextQ() {
        let _quesitonId = this.$store.state.s_doQuestionCache.QOrderList[++this.index]
        let key = "question_" + _quesitonId
        switch (this.$store.state.s_doQuestionCache.QCondition[key].type) {
          case 0: //选择题
            this.$router.push('/student/doQuestion/' + _quesitonId + '/doCQ')
            break;
          case 1: //填空题
            this.$router.push('/student/doQuestion/' + _quesitonId + '/doFQ')
            break;
          case 2: //简答题
            this.$router.push('/student/doQuestion/' + _quesitonId + '/doSQ')
            break;
          default:
            break;
        }
      },
    },
    mounted: function() {
      this.title = this.$store.state.s_doQuestionCache.paperTitle
      this.index = this.$store.state.s_doQuestionCache.QOrderList.indexOf(this.$route.params.questionId)
      this.QCount = this.$store.state.s_doQuestionCache.CQCount + this.$store.state.s_doQuestionCache.FQCount + this.$store.state.s_doQuestionCache.SQCount
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
