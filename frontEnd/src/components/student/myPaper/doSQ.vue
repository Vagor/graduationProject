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
        title: '微积分A卷'
      }
    },
    methods: {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
