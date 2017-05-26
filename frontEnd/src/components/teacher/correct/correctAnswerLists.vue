<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">题目信息</label>
    <mt-cell title="题目：" style="text-align: left">
      <span style="color: #666, margin-left: 4em">{{questionDetail.stem}}</span>
    </mt-cell>
    <mt-cell title="分值：" style="text-align: left">
      <span style="color: blue">{{questionDetail.score}}</span>
    </mt-cell>
    <mt-cell title="参考答案：" style="text-align: left">
      <span style="color: #666">{{questionDetail.answer}}</span>
    </mt-cell>

    <label class="block-title">答案给分</label>
    <template v-for="item in answerSQuestionList">
      <mt-cell class="left" :title="item.answer"></mt-cell>
      <mt-cell title="评分：" style="text-align: left">
        <span style="color: #666">{{item.value}}分</span>
      </mt-cell>
      <mt-range
      v-model="item.value"
      :min="0"
      :max="questionDetail.score"
      :step="1"
      :bar-height="5">
        <div slot="start">0</div>
        <div slot="end">{{questionDetail.score}}</div>
      </mt-range>
    </template>
    <mt-button type="primary" v-if="!showLoading" @click.native="submit">保存</mt-button>
    <mt-button type="primary" v-else>保存中...</mt-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '批改试卷',
        answerSQuestionList: [],
        courseChosed: '0',
        questionDetail: {},
        rangeValue: 0,
        showLoading: false
      }
    },
    mounted: function() {
      // 初始化
      // 获取课堂id
      this.questionDetail = this.$store.state.s_SQDeatil;
      if (!this.questionDetail.score || this.questionDetail.score < 0) {
        history.go(-1);
      }
      var answerSQuestionCollectionId = this.$route.params.answerSQuestionCollectionId,
        shortQuestionId = this.$route.params.shortQuestionId;
      this.$http.post('/getAnswerShortQCollection', {
        answerSQuestionCollectionId,
        shortQuestionId
      }).then((res) => {
        this.answerSQuestionList = res.data.answerSQuestionList.map((row, index) => {
            return {
                studentName: row.studentName,
                answerPaperId: row.answerPaperId,
                answerId: row._id,
                answer: row.studentAnswer,
                value: 0
            }
        })
        // 测试用例，真实环境删除
        this.answerSQuestionList = [{
            studentName: '王名扬',
            answerPaperId: 0,
            answerId: 0,
            answer: '啦啦啦德玛西亚',
            value: 0
        },{
            studentName: '张司机',
            answerPaperId: 1,
            answerId: 1,
            answer: '啦啦啦老汉推车',
            value: 0
        },{
            studentName: '老陶',
            answerPaperId: 2,
            answerId: 2,
            answer: '啦啦啦如花似玉',
            value: 0
        },{
            studentName: '鸭哥',
            answerPaperId: 3,
            answerId: 3,
            answer: '啦啦啦lol',
            value: 0
        },{
            studentName: '陈逃兵',
            answerPaperId: 4,
            answerId: 4,
            answer: '啦啦啦来来来',
            value: 0
        }]
      })
    },
    methods: {
      submit() {
        // 在ajax请求时，给用户提示正在保存，请求完毕再将其状态至为false
        this.showLoading = true;
        console.log(this.answerSQuestionList)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mt-range {
      margin: 10px 0;
  }

  button.mint-button.mint-button--primary.mint-button--normal {
    margin: 20px 0;
    padding: 0 50px;
  }
</style>