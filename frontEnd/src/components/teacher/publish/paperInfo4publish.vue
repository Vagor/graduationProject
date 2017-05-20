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
    <mt-field class="left" label="标题" placeholder="请输入试卷标题" :value="paperTitle" :readonly="!isEditMode"></mt-field>
    <mt-field class="left" label="试卷简介" placeholder="请输入试卷简单介绍" :value="paperDesc" type="textarea" rows="4" :readonly="!isEditMode"></mt-field>
    <label class="block-title gap">其他信息</label>
    <mt-cell title="是否共享试卷" class="left" :value="isShare" v-show="!isEditMode"></mt-cell>
    <mt-cell class="left" title="时长" :value="timeLimit" v-show="!isEditMode"></mt-cell>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirm()">选择此卷出卷</mt-button>
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
        share: true,
      }
    },
    methods: {
      goToLink() {
        this.$router.push('/viewPaper/' + this.$route.params.paperId)
      },
      confirm() {
        let _this = this
        let reqData = this.$store.state.s_publishCache
        reqData.teacherId = window._const.teacherId
        this.$messagebox.confirm('确认发布').then(action => {
          _this.$http.post('/releasePaper', reqData).then((res) => {
            _this.$toast({
              message: '操作成功',
              iconClass: 'mintui-success mintui',
              duration: 1000,
            });
            setTimeout(() => {
              _this.$router.push('/teacherHomePage')
            }, 1000);
          })
        }, action => {});
      },
    },
    mounted: function() {
      console.log('mounted')
      let _this = this;
      this.$http.post('/getPaperInfo', {
        paperId: _this.$route.params.paperId
      }).then((res) => {
        this.paperTitle = res.data.paperInfo.paperTitle
        this.paperDesc = res.data.paperInfo.paperDesc
        this.share = res.data.paperInfo.share
        this.rangeValue = res.data.paperInfo.timeLimit
        this.$store.commit('updatePublishCache', {
          paperId: _this.$route.params.paperId,
          paperTitle: _this.paperTitle,
        })
      })
      // 获取题目信息，存储到publishCache
      this.$http.post('/getCQLByPId', {
        paperId: _this.$route.params.paperId
      }).then((res) => {
        let choiceQList = res.data.choiceQList
        for (let key in choiceQList) {
          if (choiceQList.hasOwnProperty(key)) {
            choiceQList[key].choiceQuestionId = choiceQList[key]._id;
            choiceQList[key].questionScore = 0;
          }
        }
        this.$store.commit('updatePublishCache', {choiceQList:choiceQList})
      })
      this.$http.post('/getFQLByPId', {
        paperId: _this.$route.params.paperId
      }).then((res) => {
        let fillQList = res.data.fQList
        for (let key in fillQList) {
          if (fillQList.hasOwnProperty(key)) {
            fillQList[key].fillQuestionId = fillQList[key]._id;
            fillQList[key].questionScore = 0;
          }
        }
        this.$store.commit('updatePublishCache', {fillQList:fillQList})
      })
      this.$http.post('/getSQLByPId', {
        paperId: _this.$route.params.paperId
      }).then((res) => {
        let shortQList = res.data.sQList
        console.log(shortQList)
        for (let key in shortQList) {
          if (shortQList.hasOwnProperty(key)) {
            shortQList[key].shortQuestionId = shortQList[key]._id;
            shortQList[key].questionScore = 0;
          }
        }
        this.$store.commit('updatePublishCache', {shortQList:shortQList})
      })
    },
    computed: {
      isShare: function() {
        if (this.share) {
          return "是"
        } else {
          return "否"
        }
      },
      timeLimit: function() {
        if (this.rangeValue == 0) {
          return "不限时"
        } else {
          return rangeValue + '分钟'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
