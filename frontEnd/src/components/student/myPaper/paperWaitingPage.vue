<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">考试信息</label>
    <mt-cell title="开考时间" value="" class="left">2017/6/12 10:00:00</mt-cell>
    <mt-cell title="限时" value="" class="left">60 分钟</mt-cell>
    <mt-cell title="题目数" value="" class="left">20 题</mt-cell>
    <label class="block-title">试卷基本信息</label>
    <mt-field class="left" label="标题" placeholder="请输入试卷标题" :value="paperTitle"></mt-field>
    <mt-field class="left" label="试卷简介" placeholder="请输入试卷简单介绍" :value="paperDesc" type="textarea" rows="4"></mt-field>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">开始答卷</mt-button>
  </div>
</template>

<script>
  export default {
    name: "paperWaitingPage",
    data() {
      return {
        title: '试卷信息',
        paperTitle: '',
        paperDesc: '',
      }
    },
    methods: {
      confirmCreation() {
        let _this = this
        this.$messagebox.confirm('确认开始答卷').then(action => {
          this.$http.post('/createAnswerPaper', {
            answerpaperlist: {
              studentId: window._const.studentId,
              lessonId: _this.$store.state.s_doQuestionCache.lessonId,
              teacherId: _this.$store.state.s_doQuestionCache.teacherId,
              paperId: _this.$store.state.s_doQuestionCache.paperId,
              paperTitle: _this.$store.state.s_doQuestionCache.paperTitle,
              totalScore: 0,
            }
          }).then((res) => {
            if (res.data.success == 1) {
              this.$router.push('/student/paperCompletion/' + this.$route.params.paperId)
            }
          })
        }, action => {
          console.log(action);
        });
      },
    },
    mounted: function() {
      let _this = this
      this.$http.post('/getPaperInfo', {
        paperId: this.$route.params.paperId
      }).then((res) => {
        this.paperTitle = res.data.paperInfo.paperTitle
        this.paperDesc = res.data.paperInfo.paperDesc
        this.$store.commit('updateDoQuestionCache', {
          paperId: _this.$route.params.paperId,
          teacherId: _this.$route.params.teacherId,
          paperTitle: _this.paperTitle,
          paperDesc: _this.paperDesc,
        })
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
