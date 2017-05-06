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
        blankCounter: 0,
        answerOption1: '',
        answerOption2: '',
        answerOption3: '',
        answerOption4: '',
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
      }
    },
    mounted: function() {
      let _this = this;
      this.$http.post('/getFITBQuestionContent', {
        questionId: _this.$route.params.questionId
      }).then((res) => {
        this.stem = res.data.stem
        this.blankCounter = res.data.blankCounter
        this.chapter = res.data.chapter
        this.answerOption1 = res.data.answerOption1
        this.answerOption2 = res.data.answerOption2
        this.answerOption3 = res.data.answerOption3
        this.answerOption4 = res.data.answerOption4
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
