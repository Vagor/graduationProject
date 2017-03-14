<template>
<div>
  <mt-header :title="title">
    <router-link to="/createSAQQuestion" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="/createSAQQuestion" slot="right">
      <mt-button>返回修改</mt-button>
    </router-link>
  </mt-header>
  <mt-field class="left" label="问题" type="textarea" rows="4" readonly v-model="SAQQuestionContent"></mt-field>
  <mt-field class="left gap" label="回答" type="textarea" rows="4" placeholder="请输入答案"></mt-field>
  <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认出题</mt-button>
</div>
</template>

<script>
export default {
  name: 'previewSAQQuestion',
  data() {
    return {
      title: '创建选择题'
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
  computed: {
    SAQQuestionContent () {
      return this.$store.state.s_SAQQuestionContent
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
