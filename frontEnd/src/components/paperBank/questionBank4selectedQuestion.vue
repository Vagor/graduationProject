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
          <mt-button v-on:click.prevent="del(2,item.questionId,$event)" size="small">删除</mt-button>
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirm()">确认出卷
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
        this.$toast('删除成功')
        this.questionCount++
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
          this.$router.push('/questionBank4selectedQuestion') // 带上课程信息
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
          this.choiceTabContent.push(temp)
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
          this.SAQTabContent.push(temp)
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
