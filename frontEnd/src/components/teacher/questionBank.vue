<template>
<div>
  <mt-header :title="title">
    <router-link to="/" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="createQuestion" slot="right">
      <mt-button>出题</mt-button>
    </router-link>
  </mt-header>
  <div class="changeTabBtnGroup">
    <mt-button type="default" size="small" @click.native="changeTab(1)" swipeable>选择题</mt-button>
    <mt-button type="default" size="small" @click.native="changeTab(2)" swipeable>填空题</mt-button>
    <mt-button type="default" size="small" @click.native="changeTab(3)" swipeable>问答题</mt-button>
  </div>
  <mt-tab-container v-model="active" swipeable>
    <mt-tab-container-item id="tab-container1">
      <mt-cell v-for="item in tabContent1" v-bind:title="item.stem" class="left">{{item.chapter}}</mt-cell>
    </mt-tab-container-item>
    <mt-tab-container-item id="tab-container2">
      <mt-cell v-for="n in 5" title="tab-container 2" class="left"></mt-cell>
    </mt-tab-container-item>
    <mt-tab-container-item id="tab-container3">
      <mt-cell v-for="n in 7" title="tab-container 3" class="left"></mt-cell>
    </mt-tab-container-item>
  </mt-tab-container>
</div>
</template>

<script>
export default {
  name: 'questionBank',
  data() {
    return {
      title: '题库',
      active: 'tab-container1',
      tabContent1: [],
      // tabContent1: [{questionId:'',stem:'',chapter:''}],
    }
  },
  methods: {
    changeTab(type) {
      switch (type) {
        case 1:
          this.active = 'tab-container1'
          break;
        case 2:
          this.active = 'tab-container2'
          break;
        case 3:
          this.active = 'tab-container3'
          break;
        default:
          this.active = 'tab-container1'
          break;

      }
    }
  },
  mounted: function() {
    this.$http.post('/getChoiceQuestionList',{id:window._const.teacherId}).then((res) => {
      var temp;
      for (var i = 0;i < res.data.choiceQuestionList.length;i++) {
        temp = {questionId:res.data.choiceQuestionList[i]._id,stem:res.data.choiceQuestionList[i].stem,chapter:'第'+res.data.choiceQuestionList[i].chapter+'章'}
        this.tabContent1.push(temp)
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
</style>
