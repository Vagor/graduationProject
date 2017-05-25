<template>
  <div>
    <label class="block-title">选择题</label>
    <mt-field class="left" label="问题" type="textarea" rows="4" readonly v-model="stem"></mt-field>
    <mt-radio class="left" title="选项" v-model="choice" :options="choiceOptions">
    </mt-radio>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        stem: '',
        answerOption: [],
        choiceOptions: [],
      }
    },
    methods: {
      goToLink() {
        this.$router.push('/student/paperCompletion')
      },
      initPage() {
        this.$http.post('/getChoiceQuestionContent', {
          questionId: this.$route.params.questionId
        }).then((res) => {
          this.stem = res.data.stem
          this.answerOption = res.data.answerOption
          this.choiceOptions = [{
            label: 'A. ' + res.data.options[0],
            value: '1'
          }, {
            label: 'B. ' + res.data.options[1],
            value: '2'
          }, {
            label: 'C. ' + res.data.options[2],
            value: '3'
          }, {
            label: 'D. ' + res.data.options[3],
            value: '4'
          }]
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
      choice: {
        get() {
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          return this.$store.state.s_doQuestionCache.QCondition[key].choice
        },
        set(value) {
          let QCondition = this.$store.state.s_doQuestionCache.QCondition
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          this.$store.state.s_doQuestionCache.QCondition[key].choice = value
          if (value.length > 0) {
            this.$store.state.s_doQuestionCache.QCondition[key].done = 1
          }
          this.$store.commit('updateDoQuestionCache', {
            QCondition: QCondition
          })
  
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
