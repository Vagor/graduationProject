<template>
  <div>
    <mt-header :title="title">
            <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">试卷基本信息</label>
    <mt-field class="left" label="标题" placeholder="请输入试卷标题" v-model="paperTitle"></mt-field>
    <mt-field class="left" label="试卷简介" placeholder="请输入试卷简单介绍" type="textarea" rows="4" v-model="paperDesc"></mt-field>
    <label class="block-title gap">其他信息</label>
    <mt-cell class="left" title="限制时长">
      <mt-switch v-model="timeLimit"></mt-switch>
    </mt-cell>
    <mt-cell class="left" v-if="timeLimit" title="时长" :value="rangeValue+'分钟 '"></mt-cell>
    <mt-range v-if="timeLimit" class="little-gap" v-model="rangeValue" :min="0" :max="150" :step="10"></mt-range>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirm()">去题库选题</mt-button>
  </div>
</template>


<script>
  export default {
    name: 'createPaper_paperInfo',
    data() {
      return {
        paperTitle: '',
        paperDesc: '',
        timeLimit: false,
        rangeValue: 0,
        title: '组卷',
      }
    },
    methods: {
      confirm() {
        let _this = this
        this.$store.commit('updateBasicPaperInfo', {
          courseId: _this.$route.params.courseId,
          paperTitle: _this.paperTitle,
          paperDesc: _this.paperDesc,
        })
        this.$messagebox.confirm("是否确认操作").then(action => {
          this.$router.push('/questionBank4createPaper') // 带上课程信息
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
