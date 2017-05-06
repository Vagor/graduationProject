<template>
  <div>
    <mt-header title="试卷信息">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">选择题（{{CQCount}}/{{SQCount + FQCount +CQCount}}）</label>
    <mt-cell :title="item.stem" is-link class="left" to="//github.com" v-for="item in choiceQList" :to="{ name: 's_doCQ', params: { questionId: item._id }}"></mt-cell>
    <label class="block-title">填空题（{{FQCount}}/{{SQCount + FQCount +CQCount}}）</label>
    <mt-cell :title="item.stem" is-link class="left" to="//github.com" v-for="item in fQList" :to="{ name: 's_doFQ', params: { questionId: item._id }}"></mt-cell>
    <label class="block-title">简答题（{{SQCount}}/{{SQCount + FQCount +CQCount}}）</label>
    <mt-cell :title="item.stem" is-link class="left" to="//github.com" v-for="item in sQList" :to="{ name: 's_doSQ', params: { questionId: item._id }}"></mt-cell>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认交卷</mt-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        paperDesc: '',
        paperTitle: '',
        choiceQList: [],
        fQList: [],
        sQList: [],
        CQCount:0,
        FQCount:0,
        SQCount:0,
        totalQCount:0,
      }
    },
    methods: {
      confirmCreation() {
        let _this = this
        _this.$http.post('/publish', {
          paperId: _this.$route.params.paperId,
          courseId: _this.$store.state.s_publishInfo.courseId,
          lessonId: _this.$store.state.s_publishInfo.lessonId,
        })
        _this.$messagebox.confirm('确定执行此操作').then(action => {
          _this.$toast({
            message: '操作成功',
            iconClass: 'mintui-success mintui',
            duration: 1000,
          });
          setTimeout(() => {
            // _this.$router.push('/')
          }, 1000);
        }, action => {
          console.log(_this);
        });
      },
    },
    mounted: function() {
      this.$http.post('/getCQLByPId', {
        paperId: this.$route.params.paperId,
      }).then((res) => {
        res.data = {
          choiceQList: [{
            _id: "mock",
            stem: "mock",
            chapter: 26,
            answerOptions: [
              1,
              2,
              3,
              4,
              5
            ],
            options: [
              "1",
              "2",
              "3",
              "4",
              "5"
            ]
          }],
          "questionScore": 59
        }
        this.choiceQList = res.data.choiceQList
        this.CQCount = this.choiceQList.length
      })
      this.$http.post('/getFQLByPId', {
        paperId: this.$route.params.paperId,
      }).then((res) => {
        this.fQList = res.data.fQList
        this.FQCount = this.fQList.length
      })
      this.$http.post('/getSQLByPId', {
        paperId: this.$route.params.paperId,
      }).then((res) => {
        this.sQList = res.data.sQList
        this.SQCount = this.sQList.length
      })
    },
    computed: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
