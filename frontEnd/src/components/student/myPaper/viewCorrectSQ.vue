<template>
  <div>
    <label class="block-title">问答题</label>
    <mt-field class="left" label="问题" type="textarea" rows="4" readonly v-model="stem"></mt-field>
    <mt-field class="left gap" label="正确回答" type="textarea" rows="4" placeholder="" v-model="answer"></mt-field>
  </div>
</template>

<script>
  export default {
    name: 'previewSAQQuestion',
    data() {
      return {
        stem: '',
        answer:'',
      }
    },
    methods: {
      initPage() {
        this.$http.post('/getSAQQuestionContent', {
          questionId: this.$route.params.questionId
        }).then((res) => {
          this.stem = res.data.stem
          this.chapter = res.data.chapter
          this.answer = res.data.answer
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
