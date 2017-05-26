<template>
    <div>
        <mt-header :title="title">
            <router-link v-on:click.native="goBack()" to="" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <label class="block-title">选择课堂</label>
        <template v-for="item in lessonOptions">
            <mt-cell class="left" :title="item.label" is-link :to = "{ name: 'viewCorrectLesson', params: {lessonId: item.lessonId }}"></mt-cell>
        </template>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '批改试卷',
        courseOptions: [],
        lessonOptions: [],
        courseChosed: '0',
      }
    },
    mounted: function() {
      // 初始化
      this.$http.post('/getCListByTId', {
        teacherId: window._const.teacherId
      }).then((res) => {
        this.lessonOptions = res.data.courseList.map((row, index) => {
            return {
                label: row.courseName,
                lessonId: row.courseId,
                value: index
            }
        })
      })
    },
    methods: {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>