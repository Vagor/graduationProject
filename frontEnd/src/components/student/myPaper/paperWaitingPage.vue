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
        teacherId: '',
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
      setDoQuestionCache() {
        let QCondition = {}
        // 初始化选择题列表
        this.$http.post('/getCQLByPId', {
          paperId: this.$route.params.paperId
        }).then((res) => {
          var temp;
          for (var i = 0; i < res.data.choiceQList.length; i++) {
            temp = {
              questionId: res.data.choiceQList[i]._id,
              stem: res.data.choiceQList[i].stem,
              answerOption: res.data.choiceQList[i].answerOption,
              chapter: '第' + res.data.choiceQList[i].chapter + '章',
              index: i,
              questionScore:3,              
            }
            this.choiceQList.push(temp)
            QCondition['question_' + res.data.choiceQList[i]._id] = {
              type: 0, //0=>选择题，1=>填空题，2=>简单题
              done: 0, //0=>未完成，1=>完成
              choice:'',
            }
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
              answerOptions: res.data.fQList[i].answerOptions,
              chapter: '第' + res.data.fQList[i].chapter + '章',
              index: i,
              questionScore:4,
            }
            this.fQList.push(temp)
            QCondition['question_' + res.data.fQList[i]._id] = {
              type: 1, //0=>选择题，1=>填空题，2=>简单题
              done: 0, //0=>未完成，1=>完成
              answerOption1:'',
              answerOption2:'',
              answerOption3:'',
              answerOption4:'',
            }
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
              answerOptions: res.data.sQList[i].answerOptions,
              answer: res.data.sQList[i].answer,
              chapter: '第' + res.data.sQList[i].chapter + '章',
              index: i,
              questionScore:5,              
            }
            this.sQList.push(temp)
            QCondition['question_' + res.data.sQList[i]._id] = {
              type: 2, //0=>选择题，1=>填空题，2=>简单题
              done: 0, //0=>未完成，1=>完成
              answer:'',
            }
          }
          this.SQCount = this.sQList.length
          // updateDoQuestionCache
          this.$store.commit('updateDoQuestionCache', {
            sQList: this.sQList,
            SQCount: this.SQCount,
            fQList: this.fQList,
            FQCount: this.FQCount,
            choiceQList: this.choiceQList,
            CQCount: this.CQCount,
            QCondition: QCondition,
          })
        })
      }
    },
    mounted: function() {
      let _this = this
      this.$http.post('/getPaperInfo', {
        paperId: this.$route.params.paperId
      }).then((res) => {
        this.paperTitle = res.data.paperInfo.paperTitle
        this.paperDesc = res.data.paperInfo.paperDesc
        this.teacherId = res.data.paperInfo.teacherId
        this.$store.commit('updateDoQuestionCache', {
          paperId: _this.$route.params.paperId,
          teacherId: _this.teacherId,
          paperTitle: _this.paperTitle,
          paperDesc: _this.paperDesc,
        })
      })
      this.setDoQuestionCache()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
