<template>
<div>
  <mt-header :title="title">
    <router-link to="/createFITBQuestion" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="/createFITBQuestion" slot="right">
      <mt-button>返回修改</mt-button>
    </router-link>
  </mt-header>
  <mt-field class="left" label="问题" type="textarea" rows="4" readonly :value="FITBQuestionContent"></mt-field>
  <div class="gap"></div>
  <mt-field v-for="n in blankCounter" class="left" label="正确答案" placeholder="请输入答案"></mt-field>
  <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认出题</mt-button>
</div>
</template>

<script>
export default {
  name: 'previewFITBQuestion',
  data() {
    return {
      title: '创建选择题',
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
    }
  }  ,
  computed: {
      FITBQuestionContent () {
        return this.$store.state.s_FITBQuestionContent
      }
    },
    mounted: function() {
      this.blankCounter = this.$store.state.s_FITBQuestionBlankCounter
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
