<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">参与课堂</label>
    <mt-cell :title="'我的课堂 '+(index+1)" class="left" :value="item.courseName" v-for="(item,index) in courseList" is-link></mt-cell>
  
  </div>
</template>

<script>
  export default {
    name: "viewLesson",
    data() {
      return {
        title: '我的课堂',
        courseList: []
      }
    },
    mounted: function() {
      this.$http.post('/getStudentLList', {
        studentId: window._const.studentId,
      }).then((res) => {
        for (let key in res.data.lessonList) {
          if (res.data.lessonList.hasOwnProperty(key)) {
            this.courseList.push({
              courseName: res.data.lessonList[key].courseName,
              lessonId: res.data.lessonList[key]._id,
            })
          }
        }
      })
    },
    methods: {},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>