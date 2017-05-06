<template>
  <div>
    <mt-header title="我的试卷">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">请选择课程</label>
    <mt-cell title="微积分" value="" is-link class="left" :to="{name:'s_myPaperList'}">
      <mt-badge type="primary">1</mt-badge>
    </mt-cell>
    <mt-cell :title="item.courseName" class="left" v-for="(item,index) in courseList" is-link   :to="{ name: 's_myPaperList', params: { lessonId: item.lessonId ,teacherId:item.teacherId}} " >
      <mt-badge type="primary" v-if="item.paperToCheckCount>0">{{item.paperToCheckCount}}</mt-badge>
    </mt-cell>
  </div>
</template>

<script>
  export default {
    name: "chooseCourse4PaperList",
    data() {
      return {
        title: '我的课堂',
        courseList: []
      }
    },
    mounted: function() {
      // 初始化lesson列表
      this.$http.post('/getStudentLList', {
        studentId: window._const.studentId,
      }).then((res) => {
        for (let key in res.data.lessonList) {
          if (res.data.lessonList.hasOwnProperty(key)) {
            this.courseList.push({
              courseName: res.data.lessonList[key].courseName,
              lessonId: res.data.lessonList[key]._id,
              teacherId: res.data.lessonList[key].teacherId,
            })
            this.$http.post('/getPaperToCheckCount', {
              lessonId: res.data.lessonList[key]._id,
              studentId: window._const.studentId,
            }).then((res_in) => {
              this.courseList[key].paperToCheckCount = res_in.data.paperToCheckCount
            })
          }
        }
      })
      // 初始化是否有待做试卷列表
    },
    methods: {},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
