<template>
  <div>
    <mt-header title="我的试卷">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">待做试卷</label>
    <mt-cell :title="item.paperTitle | characterLimit" value="" is-link class="left" :to="{ name: 's_paperWaitingPage', params: { paperId: item.paperId }}" v-for="item in NoAnswerPaperList"></mt-cell>
    <label class="block-title">已完成未批改试卷</label>
    <mt-cell :title="item.paperTitle | characterLimit" value="" is-link class="left" :to="{ name: 'paperWaiti4Check', params: { paperId: item.paperId }}" v-for="item in AnswerNoCheckPaperList"></mt-cell>    
    <label class="block-title">已完成已批改试卷</label>
    <mt-cell :title="item.paperTitle | characterLimit" value="" is-link class="left" :to="{ name: 'paperChecked', params: { paperId: item.paperId }}" v-for="item in AnswerCheckPaperList"></mt-cell>    
  </div>
</template>

<script>
  export default {
    name: "myPaperList",
    data() {
      return {
        title: '我的课堂',
        AnswerCheckPaperList:[],
        AnswerNoCheckPaperList:[],
        NoAnswerPaperList:[],
      }
    },
    mounted: function() {
      console.log(this.$route.params.teacherId)
      // 初始化lesson列表
      this.$http.post('/getStudentPaperLists', {
        studentId: window._const.studentId,
        lessonId: this.$route.params.lessonId,
      }).then((res) => {
        this.AnswerCheckPaperList = res.data.AnswerCheckPaperList
        this.AnswerNoCheckPaperList = res.data.AnswerNoCheckPaperList
        this.NoAnswerPaperList = res.data.NoAnswerPaperList
      })
      this.$store.commit('updateDoQuestionCache',{
        lessonId: this.$route.params.lessonId,
        teacherId: this.$route.params.teacherId,
      })
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
    methods: {},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
