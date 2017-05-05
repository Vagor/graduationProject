<template>
<div>
  <mt-header  :title="title">
            <router-link v-on:click.native="goBack()" to="" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="/createFITBQuestion" slot="right">
      <mt-button>返回修改</mt-button>
    </router-link>
  </mt-header>
  <mt-field class="left" label="问题" type="textarea" rows="4" readonly v-model="stem"></mt-field>
  <div class="gap"></div>
  <mt-field class="left" label="正确答案1" placeholder="请输入答案" v-model="answerOption1"></mt-field>
  <mt-field class="left" label="正确答案2" placeholder="请输入答案" v-model="answerOption2"></mt-field>
  <mt-field class="left" label="正确答案3" placeholder="请输入答案" v-model="answerOption3"></mt-field>
  <mt-field class="left" label="正确答案4" placeholder="请输入答案" v-model="answerOption4"></mt-field>
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
      answerOption1:'',
      answerOption2:'',
      answerOption3:'',
      answerOption4:'',
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
      stem () {
        return this.$store.state.s_FITBQuestionContent.stem
      }
    },
    mounted: function() {
      this.blankCounter = this.$store.state.s_FITBQuestionContent.blankCounter
      this.answerOption1 = this.$store.state.s_FITBQuestionContent.answerOption1
      this.answerOption2 = this.$store.state.s_FITBQuestionContent.answerOption2
      this.answerOption3 = this.$store.state.s_FITBQuestionContent.answerOption3
      this.answerOption4 = this.$store.state.s_FITBQuestionContent.answerOption4
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
