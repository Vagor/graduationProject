<template>
  <div>
    <mt-header title="选择课程">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">请选组课程</label>
    <mt-cell v-for="item in courseList" title="item.courseName" value="" is-link class="left" :to="{ name: 'createPaper_paperInfo', params: { courseId: item.courseId }} " v-on:click="console.log('12')"></mt-cell>
  </div>
</template>

<script>
  export default {
    name: 'chooseCourse4paper',
    data() {
      return {
        courseList: [],
      }
    },
    methods: {},
    mounted: function() {
      // 初始化选择题列表
      this.$http.post('/getCList', {
        teacherId: window._const.teacherId
      }).then((res) => {
        this.courseList = res.data.courseList
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
