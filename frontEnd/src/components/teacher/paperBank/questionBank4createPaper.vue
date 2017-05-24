<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!--<router-link to="createQuestion" slot="right">
                      <mt-button>出题</mt-button>
                    </router-link>-->
    </mt-header>
    <mt-navbar v-model="activeTab">
      <mt-tab-item id="choiceTab">选择题</mt-tab-item>
      <mt-tab-item id="FITBTab">填空题</mt-tab-item>
      <mt-tab-item id="SAQTab">问答题</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="activeTab" swipeable class="little-gap">
      <mt-tab-container-item id="choiceTab">
        <mt-cell v-for="item in choiceTabContent " is-link :to="{ name: 'viewChoiceQuestion', params: { questionId: item.questionId }}" v-bind:title="item.stem+'('+item.chapter+')' | characterLimit " class="left ">
          <mt-button v-on:click.prevent="add(0,item.questionId,$event)" size="small">添加</mt-button>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="FITBTab">
        <mt-cell v-for="item in FITBTabContent " is-link :to="{ name: 'viewFITBQuestion', params: { questionId: item.questionId }}" v-bind:title="item.stem+'('+item.chapter+')' | characterLimit " class="left ">
          <mt-button v-on:click.prevent="add(1,item.questionId,$event)" size="small">添加</mt-button>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="SAQTab">
        <mt-cell v-for="item in SAQTabContent " is-link :to="{ name: 'viewSAQQuestion', params: { questionId: item.questionId }}" v-bind:title="item.stem+'('+item.chapter+')' | characterLimit " class="left wrap-content">
          <mt-button v-on:click.prevent="add(2,item.questionId,$event)" size="small">添加</mt-button>
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="updateSelectedQuestion">已选题目
      <mt-badge type="error" v-if="questionCount > 0">{{questionCount}}</mt-badge>
    </mt-button>
  </div>
</template>

<script>
  export default {
    name: 'questionBank',
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
      add(type, questionId, event) {
        event.stopPropagation();
        console.log('add')
        if (this.isInArray(questionId, this.choiceQuestionSelected) || this.isInArray(questionId, this.FITBQuestionSelected) || this.isInArray(questionId, this.SAQQuestionSelected)) {
          this.$toast('本题已经添加过')
        } else {
          switch (type) {
            case 0:
              this.choiceQuestionSelected.push(questionId)
              break;
            case 1:
              this.FITBQuestionSelected.push(questionId)
              break;
            case 2:
              this.SAQQuestionSelected.push(questionId)
              break;
          }
          this.$toast({
            message: '添加成功',
            duration: 1000,
          });
          this.$store.commit('addQuestion2SelectedQuestion')
        }
      },
      updateSelectedQuestion() {
        this.$store.commit('updateSelectedQuestion', {
          choiceQuestionSelected: this.choiceQuestionSelected,
          FITBQuestionSelected: this.FITBQuestionSelected,
          SAQQuestionSelected: this.SAQQuestionSelected,
          questionCount: this.questionCount
        })
        this.$router.push('/questionBank4selectedQuestion')
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
        if(value.length > 15){
          return value.slice(0,14)+"..."
        }else {
          return value          
        }
      },
    },
    mounted: function() {
      // 初始化选择题列表
      this.$http.post('/getAllQListByCIdAndTId', {
        teacherId: window._const.teacherId,
        courseId: this.$route.params.courseId,
      }).then((res) => {
        var temp;
        for (var i = 0; i < res.data.AllQList.choiceQuestionList.length; i++) {
          temp = {
            questionId: res.data.AllQList.choiceQuestionList[i]._id,
            stem: res.data.AllQList.choiceQuestionList[i].stem,
            chapter: '第' + res.data.AllQList.choiceQuestionList[i].chapter + '章'
          }
          this.choiceTabContent.push(temp)
        }
        for (var i = 0; i < res.data.AllQList.SAQQuestionList.length; i++) {
          temp = {
            questionId: res.data.AllQList.SAQQuestionList[i]._id,
            stem: res.data.AllQList.SAQQuestionList[i].stem,
            chapter: '第' + res.data.AllQList.SAQQuestionList[i].chapter + '章'
          }
          this.SAQTabContent.push(temp)
        }
        for (var i = 0; i < res.data.AllQList.FITBQuestionList.length; i++) {
          temp = {
            questionId: res.data.AllQList.FITBQuestionList[i]._id,
            stem: res.data.AllQList.FITBQuestionList[i].stem,
            chapter: '第' + res.data.AllQList.FITBQuestionList[i].chapter + '章'
          }
          this.FITBTabContent.push(temp)
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
    