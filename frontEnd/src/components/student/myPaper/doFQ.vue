<template>
  <div>
    <label class="block-title">填空题</label>
    <mt-field class="left" label="问题" type="textarea" rows="4" readonly v-model="stem"></mt-field>
    <div class="gap"></div>
    <mt-field class="left" label="正确答案1" placeholder="请输入答案" v-model="answerOption1"></mt-field>
    <mt-field class="left" label="正确答案2" placeholder="请输入答案" v-model="answerOption2"></mt-field>
    <mt-field class="left" label="正确答案3" placeholder="请输入答案" v-model="answerOption3"></mt-field>
    <mt-field class="left" label="正确答案4" placeholder="请输入答案" v-model="answerOption4"></mt-field>
  </div>
</template>

<script>
  export default {
    name: 'previewFITBQuestion',
    data() {
      return {
        title: '微积分A卷',
        stem: '',
        blankCounter: 0,
      }
    },
    methods: {
      confirmCreation() {
        this.$messagebox.confirm('确定出题?').then(action => {
          console.log(action);
          this.$router.push('/questionBank')
        }, action => {
          console.log(action);
        });
      },
      initPage() {
        this.$http.post('/getFITBQuestionContent', {
          questionId: this.$route.params.questionId
        }).then((res) => {
          this.stem = res.data.stem
          this.blankCounter = res.data.blankCounter
          this.chapter = res.data.chapter
        })
      }
  
    },
    mounted: function() {
      this.initPage()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "initPage"
    },
    computed: {
      answerOption1: {
        get() {
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          return this.$store.state.s_doQuestionCache.QCondition[key].answerOption1
        },
        set(value) {
          let QCondition = this.$store.state.s_doQuestionCache.QCondition
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          this.$store.state.s_doQuestionCache.QCondition[key].answerOption1 = value
          this.$store.state.s_doQuestionCache.QCondition[key].done = 1
          this.$store.commit('updateDoQuestionCache', {
            QCondition: QCondition
          })
        }
      },
      answerOption2: {
        get() {
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          return this.$store.state.s_doQuestionCache.QCondition[key].answerOption2
        },
        set(value) {
          let QCondition = this.$store.state.s_doQuestionCache.QCondition
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          this.$store.state.s_doQuestionCache.QCondition[key].answerOption2 = value
          this.$store.state.s_doQuestionCache.QCondition[key].done = 1
          this.$store.commit('updateDoQuestionCache', {
            QCondition: QCondition
          })
        }
      },
      answerOption3: {
        get() {
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          return this.$store.state.s_doQuestionCache.QCondition[key].answerOption3
        },
        set(value) {
          let QCondition = this.$store.state.s_doQuestionCache.QCondition
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          this.$store.state.s_doQuestionCache.QCondition[key].answerOption3 = value
          this.$store.state.s_doQuestionCache.QCondition[key].done = 1
          this.$store.commit('updateDoQuestionCache', {
            QCondition: QCondition
          })
        }
      },
      answerOption4: {
        get() {
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          return this.$store.state.s_doQuestionCache.QCondition[key].answerOption4
        },
        set(value) {
          let QCondition = this.$store.state.s_doQuestionCache.QCondition
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          this.$store.state.s_doQuestionCache.QCondition[key].answerOption4 = value
          this.$store.state.s_doQuestionCache.QCondition[key].done = 1
          this.$store.commit('updateDoQuestionCache', {
            QCondition: QCondition
          })
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
