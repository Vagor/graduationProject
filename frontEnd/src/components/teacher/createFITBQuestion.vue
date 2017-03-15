<template>
<div>
  <mt-header :title="title">
    <router-link to="/createQuestion" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="/previewFITBQuestion" slot="right">
      <mt-button @click.native="updateFITBQuestionContent">预览</mt-button>
    </router-link>
  </mt-header>
  <label class="block-title">题目内容</label>
  <mt-field class="left" label="题干" placeholder="请输入题干……" type="textarea" rows="4" v-model="stem" :value="this.stem"></mt-field>
  <mt-cell class="left" title="添加填空处" label="点击此处可以在题干中增加一个填空处（至多4空）" is-link @click.native="addBlank"></mt-cell>
  <label class="block-title">正确答案</label>
  <mt-field v-for="n in blankCounter" class="left" label="正确答案" placeholder="请输入正确答案"></mt-field>
  <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认出题</mt-button>
</div>
</template>

<script>
export default {
  name: 'createFITBQuestion',
  data() {
    return {
      title: '创建填空题',
      stem:'',
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
    },
    addBlank() {
      if (this.blankCounter < 4) {
        this.blankCounter++;

        this.stem += '________';
      }
    },
    updateFITBQuestionContent() {
      this.$store.commit('newFITBQuestionContent', {stem:this.stem,blankCounter:this.blankCounter})
    }
  },
  mounted: function() {
    this.stem = this.$store.state.s_FITBQuestionContent.stem
    this.blankCounter =  this.$store.state.s_FITBQuestionContent.blankCounter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
