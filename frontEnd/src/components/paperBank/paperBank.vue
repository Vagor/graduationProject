<template>
  <div>
    <mt-header :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="chooseCourse4paper" slot="right">
        <mt-button>组卷</mt-button>
      </router-link>
    </mt-header>
  
    <mt-navbar v-model="activeTab">
      <mt-tab-item v-for="(item, index) in tabInfo" :id="'courseId_'+index">{{item.courseName}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="activeTab" swipeable class="little-gap" v-for="(tab, index) in tabInfo">
      <mt-tab-container-item :id="'courseId_'+index">
        <mt-cell v-for="item in choiceTabContent " is-link :to="{ name: 'viewChoiceQuestion', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">{{item.chapter}}</mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item :id="'courseId_'+index">
        <mt-cell v-for="item in FITBTabContent " is-link :to="{ name: 'viewFITBQuestion', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">{{item.chapter}}</mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item :id="'courseId_'+index">
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
        title: '试卷库',
        activeTab: 'courseId_0', //当前tab
        tabInfo: [
        ],
        choiceTabContent: [],
        FITBTabContent: [],
        SAQTabContent: [],
      }
    },
    methods: {},
    filters: {
      characterLimit: (value) => {
        return value
      }
    },
    mounted: function() {
      // 初始化tab信息
      this.$http.post('/getCListByTId', {
        teacherId: window._const.teacherId
      }).then((res) => {
        this.tabInfo = res.data.courseList
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

