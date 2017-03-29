<template>
<div>
  <mt-header :title="title">
    <router-link to="/createPaper_paperInfo" slot="left">
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
      <mt-checklist class="left" title="" v-model="choiceQuestionSelected" :options="choiceOptions" align="right">
      </mt-checklist>
    </mt-tab-container-item>
    <mt-tab-container-item id="FITBTab">
      <mt-checklist class="left" title="" v-model="FITBQuestionSelected" :options="FITBOptions" align="right">
      </mt-checklist>
    </mt-tab-container-item>
    <mt-tab-container-item id="SAQTab">
      <mt-checklist class="left" title="" v-model="SAQQuestionSelected" :options="SAQOptions" align="right">
      </mt-checklist>
    </mt-tab-container-item>

  </mt-tab-container>

  <mt-button type="primary" size="large" class="bottomBtn" @click.native="updateSelectedQuestion">已选题目
    <mt-badge type="error">30</mt-badge>
  </mt-button>
</div>
</template>

<script>
export default {
  name: 'questionBank4createPaper',
  data() {
    return {
      title: '题库',
      activeTab: 'choiceTab',
      choiceQuestionSelected: [],
      FITBQuestionSelected: [],
      SAQQuestionSelected: [],
      choiceOptions: [],
      FITBOptions: [],
      SAQOptions: [],
    }
  },
  methods: {
    updateSelectedQuestion() {
      this.$store.commit('updateSelectedQuestion', {
        choiceQuestionSelected: this.choiceQuestionSelected,
        FITBQuestionSelected: this.FITBQuestionSelected,
        SAQQuestionSelected: this.SAQQuestionSelected,
      })
      this.go2page('questionBank4selectedQuestion')
    },
    go2page(page) {
      this.$router.push(page)
    },
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
    this.$http.post('/getChoiceQuestionList', {
      teacherId: window._const.teacherId
    }).then((res) => {
      var temp;
      for (var i = 0; i < res.data.choiceQuestionList.length; i++) {
        temp = {
          questionId: res.data.choiceQuestionList[i]._id,
          stem: res.data.choiceQuestionList[i].stem,
          chapter: '第' + res.data.choiceQuestionList[i].chapter + '章'
        }
        this.choiceOptions.push({
          label: '[' + temp.chapter + ']' + temp.stem,
          value: temp.questionId
        })
      }
    })
    // 初始化问答题列表
    this.$http.post('/getSAQQuestionList', {
      teacherId: window._const.teacherId
    }).then((res) => {
      var temp;
      for (var i = 0; i < res.data.SAQQuestionList.length; i++) {
        temp = {
          questionId: res.data.SAQQuestionList[i]._id,
          stem: res.data.SAQQuestionList[i].stem,
          chapter: '第' + res.data.SAQQuestionList[i].chapter + '章'
        }
        this.SAQOptions.push({
          label: '[' + temp.chapter + ']' + temp.stem,
          value: temp.questionId
        })
      }
    })
    // 初始化填空题列表
    this.$http.post('/getFITBQuestionList', {
      teacherId: window._const.teacherId
    }).then((res) => {
      var temp;
      for (var i = 0; i < res.data.FITBQuestionList.length; i++) {
        temp = {
          questionId: res.data.FITBQuestionList[i]._id,
          stem: res.data.FITBQuestionList[i].stem,
          chapter: '第' + res.data.FITBQuestionList[i].chapter + '章'
        }
        // this.FITBTabContent.push(temp)
        this.FITBOptions.push({
          label: '[' + temp.chapter + ']' + temp.stem,
          value: temp.questionId
        })
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
