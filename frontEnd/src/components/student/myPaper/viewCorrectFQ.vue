<template>
  <div>
    <label class="block-title">填空题</label>
    <mt-field class="left" label="问题" type="textarea" rows="4" readonly v-model="stem"></mt-field>
    <div class="gap"></div>
    <mt-field class="left" :label="'正确答案'+(index+1)" placeholder="无答案" v-for="(item,index) in answerOptions" :value="item.content" readonly></mt-field>
  </div>
</template>

<script>
  export default {
    name: 'previewFITBQuestion',
    data() {
      return {
        stem: '',
        blankCounter: 0,
        answerOptions: [],
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
  // 待完善填空题正确答案的保存
          res.data.answerOptions = [{
            content: '答案'
          }, {
            content: '答案'
          }, {
            content: '答案'
          }, ]
          this.stem = res.data.stem
          this.blankCounter = res.data.blankCounter
          this.chapter = res.data.chapter
          this.answerOptions = res.data.answerOptions
        })
      }
  
    },
    mounted: function() {
      this.initPage()
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
