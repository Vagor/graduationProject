<template>
<div>
  <mt-header :title="title">
    <router-link to="/createQuestion" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="/previewSAQQuestion" slot="right">
      <mt-button @click.native="updateSAQQuestionContent">预览</mt-button>
    </router-link>
  </mt-header>
  <label class="block-title">题目内容</label>
  <mt-field class="left" label="题干" placeholder="请输入题干" type="textarea" rows="4" v-model="stem" :value="this.stem"></mt-field>
  <label class="block-title">正确答案</label>
  <mt-field class="left" label="正确答案" placeholder="请输入答案" type="textarea" rows="4"></mt-field>
  <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认出题</mt-button>
</div>
</template>

<script>
export default {
  name: 'createSAQQuestion',
  data() {
    return {
      title: '创建问答题',
      stem: ''
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
    updateSAQQuestionContent() {
      this.$store.commit('newSAQQuestionContent', {stem:this.stem})
    }
  },
  mounted: function() {
    this.stem = this.$store.state.s_SAQQuestionContent.stem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
