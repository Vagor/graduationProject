<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
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
    name: 'viewPaper',
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
        paperId: this.$route.params.paperId
      }).then((res) => {
        var temp;
        for (var i = 0; i < res.data.choiceQList.length; i++) {
          temp = {
            questionId: res.data.choiceQList[i]._id,
            stem: res.data.choiceQList[i].stem,
            chapter: '第' + res.data.choiceQList[i].chapter + '章'
          }
          this.choiceTabContent.push(temp)
        }
      })
      // 初始化填空题列表
      this.$http.post('/getFQLByPId', {
        paperId: this.$route.params.paperId
      }).then((res) => {
        var temp;
        for (var i = 0; i < res.data.fQList.length; i++) {
          temp = {
            questionId: res.data.fQList[i]._id,
            stem: res.data.fQList[i].stem,
            chapter: '第' + res.data.fQList[i].chapter + '章'
          }
          this.FITBTabContent.push(temp)
        }
      })
      // 初始化问答题列表
      this.$http.post('/getSQLByPId', {
        paperId: this.$route.params.paperId
      }).then((res) => {
        var temp;
        for (var i = 0; i < res.data.sQList.length; i++) {
          temp = {
            questionId: res.data.sQList[i]._id,
            stem: res.data.sQList[i].stem,
            chapter: '第' + res.data.sQList[i].chapter + '章'
          }
          this.SAQTabContent.push(temp)
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
