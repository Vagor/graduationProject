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
    <mt-cell class="left" title="是否共享试卷">
      <mt-switch v-model="sharePaper"></mt-switch>
    </mt-cell>
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
        sharePaper: 1,
      }
    },
    methods: {
      confirm() {
        let _this = this
        this.$messagebox.confirm("是否确认操作").then(action => {
          _this.$http.post('/createPaper', {
            teacherId: window._const.teacherId,
            courseId: _this.$route.params.courseId,
            paperTitle: _this.paperTitle,
            paperDesc: _this.paperDesc,
            timeLimit: _this.rangeValue,
            share: _this.sharePaper,
          }).then((res) => {
            // 保存组卷缓存数据
            this.$store.commit('updateBasicPaperInfo', {
              courseId: _this.$route.params.courseId,
              paperTitle: _this.paperTitle,
              paperDesc: _this.paperDesc,
              paperId: res.data.paperId,
              timeLimit: _this.rangeValue,
              share: _this.sharePaper,
            })
          })
          this.$router.push('/questionBank4createPaper/'+_this.$route.params.courseId) // 带上课程信息
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
