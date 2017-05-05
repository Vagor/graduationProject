<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link v-on:click.native="goToLink()" to="" slot="right">
        <mt-button>查看题目</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">试卷基本信息</label>
    <mt-field class="left" label="标题" placeholder="请输入试卷标题" :value="this.paperTitle" :readonly="!isEditMode"></mt-field>
    <mt-field class="left" label="试卷简介" placeholder="请输入试卷简单介绍" :value="this.paperDesc" type="textarea" rows="4" :readonly="!isEditMode"></mt-field>
    <label class="block-title gap">其他信息</label>
    <mt-cell title="是否共享试卷" class="left" value="是" v-show="!isEditMode"></mt-cell>
    <mt-cell class="left" title="时长" :value="rangeValue+'分钟 '" v-show="!isEditMode"></mt-cell>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirm()">选择此卷</mt-button>
  </div>
</template>


<script>
  export default {
    name: 'paperInfo4publish',
    data() {
      return {
        isEditMode: 0,
        rangeValue: 0,
        title: '组卷',
        paperTitle: "",
        paperDesc: "",
      }
    },
    methods: {
      goToLink() {
        this.$router.push('/viewPaper/' + this.$route.params.paperId)
      },
      confirm() {
        let _this = this
        _this.$http.post('/publish', {
          paperId: _this.$route.params.paperId,
          courseId: _this.$store.state.s_publishInfo.courseId,
          lessonId: _this.$store.state.s_publishInfo.lessonId,
        })
        _this.$messagebox.confirm('确定执行此操作').then(action => {
          _this.$toast({
            message: '操作成功',
            iconClass: 'mintui-success mintui',
            duration: 1000,
          });
          setTimeout(() => {
            // _this.$router.push('/')
          }, 1000);
        }, action => {
          console.log(_this);
        });
      },
    },
    mounted: function() {
      console.log('mounted')
      let _this = this;
      this.$http.post('/getPaperInfo', {
        paperId: _this.$route.params.paperId
      }).then((res) => {
        this.paperTitle = res.data.paperTitle
        this.paperDesc = res.data.paperDesc
        this.$store.commit('updatePublishCache', {
          courseId: _this.$store.state.s_publishCache.courseId,
          lessonId: _this.$store.state.s_publishCache.lessonId,
          courseName: _this.$store.state.s_publishCache.courseName,
          paperId: _this.$route.params.paperId,
          paperTitle: _this.paperTitle,
        })
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
