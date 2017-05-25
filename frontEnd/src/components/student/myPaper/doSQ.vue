<template>
  <div>
    <label class="block-title">问答题</label>
    <mt-field class="left" label="问题" type="textarea" rows="4" readonly v-model="stem"></mt-field>
    <mt-field class="left gap" label="回答" type="textarea" rows="4" placeholder="请输入答案" v-model="answer"></mt-field>
  </div>
</template>

<script>
  export default {
    name: 'previewSAQQuestion',
    data() {
      return {
        title: '',
        stem: '',
      }
    },
    methods: {
      initPage() {
        this.$http.post('/getSAQQuestionContent', {
          questionId: this.$route.params.questionId
        }).then((res) => {
          this.stem = res.data.stem
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
      answer: {
        get() {
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          return this.$store.state.s_doQuestionCache.QCondition[key].answer
        },
        set(value) {
          let QCondition = this.$store.state.s_doQuestionCache.QCondition
          let _quesitonId = this.$route.params.questionId
          let key = "question_" + _quesitonId
          this.$store.state.s_doQuestionCache.QCondition[key].answer = value
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
