<template>
  <div>
    <mt-header title="选择课程">
            <router-link v-on:click.native="goBack()" to="" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
        <label class="block-title">请选组课程</label>
    <mt-cell v-for="item in courseList"  :to="{ name: 'createPaper_paperInfo', params: { courseId: item.courseId }} " :title="item.courseName" value="" is-link class="left"></mt-cell>
  </div>
</template>

<script>
  export default {
    name: 'chooseCourse4question',
    data() {
      return {
        courseList: [],
      }
    },
    methods: {},
    mounted: function() {
      // 初始化选择题列表
      this.$http.post('/getCListByTId', {
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
