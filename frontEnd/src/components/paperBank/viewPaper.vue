<template>
<div>
  <mt-header :title="title">
            <router-link v-on:click.native="goBack()" to="" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="createQuestion" slot="right">
      <mt-button>出题</mt-button>
    </router-link>
  </mt-header>
  <mt-navbar v-model="activeTab">
    <mt-tab-item id="choiceTab">选择题</mt-tab-item>
    <mt-tab-item id="FITBTab">填空题</mt-tab-item>
    <mt-tab-item id="SAQTab">问答题</mt-tab-item>
  </mt-navbar>
  <mt-tab-container v-model="activeTab" swipeable class="little-gap">
    <mt-tab-container-item id="choiceTab">
      <mt-cell v-for="item in choiceTabContent " is-link :to="{ name: 'viewChoiceQuestion', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">{{item.chapter}}</mt-cell>
    </mt-tab-container-item>
    <mt-tab-container-item id="FITBTab">
      <mt-cell v-for="item in FITBTabContent " is-link :to="{ name: 'viewFITBQuestion', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">{{item.chapter}}</mt-cell>
    </mt-tab-container-item>
    <mt-tab-container-item id="SAQTab">
      <mt-cell v-for="item in SAQTabContent " is-link :to="{ name: 'viewSAQQuestion', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left wrap-content">{{item.chapter}}</mt-cell>
    </mt-tab-container-item>
  </mt-tab-container>
</div>
</template>

<script>
export default {
  name: 'questionBank',
  data() {
    return {
      title: '查看试卷题目',
      activeTab: 'choiceTab',
      choiceTabContent: [],
      FITBTabContent: [],
      SAQTabContent: [],
    }
  },
  methods: {
    changeTab(type) {
      switch (type) {
        case 1:
          this.activeTab = 'choiceTab'
          break;
        case 2:
          this.activeTab = 'FITBTab'
          break;
        case 3:
          this.activeTab = 'SAQTab'
          break;
        default:
          this.activeTab = 'choiceTab'
          break;
      }
    }
  },
  filters: {
    characterLimit: (value) => {
      return value
    }
  },
  mounted: function() {
    // 初始化选择题列表
    this.$http.post('/getCQLByPId', {
      teacherId: window._const.teacherId
    }).then((res) => {
      var temp;
      for (var i = 0; i < res.data.choiceQuestionList.length; i++) {
        temp = {
          questionId: res.data.choiceQuestionList[i]._id,
          stem: res.data.choiceQuestionList[i].stem,
          chapter: '第' + res.data.choiceQuestionList[i].chapter + '章'
        }
        this.choiceTabContent.push(temp)
      }
    })
    // 初始化问答题列表
    this.$http.post('/getFQLByPId', {
      teacherId: window._const.teacherId
    }).then((res) => {
      var temp;
      for (var i = 0; i < res.data.SAQQuestionList.length; i++) {
        temp = {
          questionId: res.data.SAQQuestionList[i]._id,
          stem: res.data.SAQQuestionList[i].stem,
          chapter: '第' + res.data.SAQQuestionList[i].chapter + '章'
        }
        this.SAQTabContent.push(temp)
      }
    })
    // 初始化填空题列表
    this.$http.post('/getSQLByPId', {
      teacherId: window._const.teacherId
    }).then((res) => {
      var temp;
      for (var i = 0; i < res.data.FITBQuestionList.length; i++) {
        temp = {
          questionId: res.data.FITBQuestionList[i]._id,
          stem: res.data.FITBQuestionList[i].stem,
          chapter: '第' + res.data.FITBQuestionList[i].chapter + '章'
        }
        this.FITBTabContent.push(temp)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.changeTabBtnGroup {
  padding: 10px;
  background-color: #eee;
  text-align: left;
}

.wrap-content {
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
