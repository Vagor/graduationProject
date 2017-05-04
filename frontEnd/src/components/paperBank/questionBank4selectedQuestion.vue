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
        <mt-cell v-for="item in choiceTabContent " is-link :to="{ name: 'viewChoiceQuestion', params: { questionId: item.questionId }}" v-bind:title="item.stem+'('+item.chapter+')' | characterLimit " class="left ">
          <mt-button v-on:click.prevent="del(0,item.questionId,$event)" size="small">删除</mt-button>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="FITBTab">
        <mt-cell v-for="item in FITBTabContent " is-link :to="{ name: 'viewFITBQuestion', params: { questionId: item.questionId }}" v-bind:title="item.stem+'('+item.chapter+')' | characterLimit " class="left ">
          <mt-button v-on:click.prevent="del(1,item.questionId,$event)" size="small">删除</mt-button>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="SAQTab">
        <mt-cell v-for="item in SAQTabContent " is-link :to="{ name: 'viewSAQQuestion', params: { questionId: item.questionId }}" v-bind:title="item.stem+'('+item.chapter+')' | characterLimit " class="left wrap-content">
          <mt-button v-on:click.prevent="del(2,item.questionId,$event)" size="small">删除
  
          </mt-button>
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirm()">确认出卷
      <mt-badge type="error">{{questionCount}}</mt-badge>
    </mt-button>
  </div>
</template>

<script>
  export default {
    name: 'questionBank4selectedQuestion',
    data() {
      return {
        title: '题库',
        activeTab: 'choiceTab',
        choiceTabContent: [],
        FITBTabContent: [],
        SAQTabContent: [],
        choiceQuestionSelected: [],
        FITBQuestionSelected: [],
        SAQQuestionSelected: [],
      }
    },
    methods: {
      refreshPage(sourcePage) {
        this.$router.replace("/refresh4questionBank4selectedQuestion")
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
      },
      del(type, questionId, event) {
        event.stopPropagation();
        console.log('delete')
        switch (type) {
          case 0:
            this.removeByValue(this.$store.state.s_selectedQuestion.choiceQuestionSelected, questionId)
            break;
          case 1:
            this.removeByValue(this.$store.state.s_selectedQuestion.FITBQuestionSelected, questionId)
            break;
          case 2:
            this.removeByValue(this.$store.state.s_selectedQuestion.SAQQuestionSelected, questionId)
            break;
        }
        this.$toast({
          message: '删除成功',
          duration: 1000,
        });
        this.$store.commit('delSelectedQuestion')
        this.refreshPage('questionBank4selectedQuestion')
      },
      removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == val) {
            arr.splice(i, 1)
            break
          }
        }
      },
      confirm() {
        this.$messagebox.confirm("是否确认操作").then(action => {          
          // 组装请求数据
          let choiceQList = []
          for (var index in this.choiceTabContent) {
            if (this.choiceTabContent.hasOwnProperty(index)) {
              choiceQList.push({
                choiceQId: this.choiceTabContent[index],
                questionScore: 0
              })
            }
          }
          let fQList = []
          for (var index in this.FITBTabContent) {
            if (this.FITBTabContent.hasOwnProperty(index)) {
              fQList.push({
                fQId: this.FITBTabContent[index],
                questionScore: 0
              })
            }
          }
          let sQList = []
          for (var index in this.SAQTabContent) {
            if (this.SAQTabContent.hasOwnProperty(index)) {
              sQList.push({
                sQId: this.SAQTabContent[index],
                questionScore: 0
              })
            }
          }
          this.$http.post('/pullQuestionsToPaper', {
            paperId: this.$store.state.s_basicPaperInfo.paperId,
            choiceQList: choiceQList,
            fQList: fQList,
            sQList: sQList,
            totalScore: 0
          }).then((res) => {
            if (res.data.success == 1) {
              this.$toast({
                message: '删除成功',
                duration: 1000,
              })
              setTimeout(() => {
                this.$router.push('/paperBank')
              }, 1000);
            }
          })
        });
      },
      isInArray(item, arr) {
        for (var i in arr) {
          if (item == arr[i]) {
            return true
          }
        }
        return false
      },
    },
    filters: {
      characterLimit: (value) => {
        return value
      }
    },
    mounted: function() {
      // 初始化选择题列表
      this.$http.post('/getCQListByQIdArr', {
        choiceQIds: this.$store.state.s_selectedQuestion.choiceQuestionSelected
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
      // 初始化填空题列表
      this.$http.post('/getFQListByQIdArr', {
        fillQIds: this.$store.state.s_selectedQuestion.FITBQuestionSelected
      }).then((res) => {
        var temp;
        for (var i = 0; i < res.data.fillQuestionList.length; i++) {
          temp = {
            questionId: res.data.fillQuestionList[i]._id,
            stem: res.data.fillQuestionList[i].stem,
            chapter: '第' + res.data.fillQuestionList[i].chapter + '章'
          }
          this.FITBTabContent.push(temp)
        }
      })
      // 初始化问答题列表
      this.$http.post('/getSQListByQIdArr', {
        shortQIds: this.$store.state.s_selectedQuestion.SAQQuestionSelected
      }).then((res) => {
        var temp;
        for (var i = 0; i < res.data.shortQuestionList.length; i++) {
          temp = {
            questionId: res.data.shortQuestionList[i]._id,
            stem: res.data.shortQuestionList[i].stem,
            chapter: '第' + res.data.shortQuestionList[i].chapter + '章'
          }
          this.SAQTabContent.push(temp)
        }
      })
    },
    computed: {
      questionCount: function() {
        return this.$store.state.s_selectedQuestion.questionCount
      },
      choiceQuestionSelected: function() {
        return this.$store.state.s_selectedQuestion.choiceQuestionSelected
      },
      FITBQuestionSelected: function() {
        return this.$store.state.s_selectedQuestion.FITBQuestionSelected
      },
      SAQQuestionSelected: function() {
        return this.$store.state.s_selectedQuestion.SAQQuestionSelected
      },
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
