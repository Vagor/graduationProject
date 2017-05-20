<template>
  <div>
    <label class="block-title">完成情况（3/10）</label>
    <mt-field class="left" label="问题" type="textarea" rows="4" readonly v-model="stem"></mt-field>
    <mt-field class="left gap" label="回答" type="textarea" rows="4" placeholder="请输入答案"></mt-field>
  </div>
</template>

<script>
  export default {
    name: 'previewSAQQuestion',
    data() {
      return {
        title: '',
        stem:'在如下数组A中链接存储了一个线性表，表头指针为A [0].next，试写出该线性表。'
      }
    },
    methods: {},
    mounted: function() {
      let _this = this;
      this.$http.post('/getSAQQuestionContent', {
        questionId: _this.$route.params.questionId
      }).then((res) => {
        // this.stem = res.data.stem
        this.answer = res.data.answer
        this.chapter = res.data.chapter
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
