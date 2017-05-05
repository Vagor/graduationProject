<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-radio title="请选择课程" v-model="courseChosed" :options="courseOptions" class="left">
    </mt-radio>
    <label class="block-title">班级信息</label>
    <div v-for="(lessonOption,index) in lessonOptions"  v-if="courseChosed === (''+index)">
          <mt-cell class="left" :title="item.label" is-link v-for="item in lessonOption" :to="{ name: 'viewLesson', params: { lessonId: item.lessonId }}"></mt-cell>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '管理课题',
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
        for (let key in res.data.courseList) {
          if (res.data.courseList.hasOwnProperty(key)) {
            this.courseOptions.push({
              label: res.data.courseList[key].courseName,
              courseId: res.data.courseList[key].courseId,
              value: key
            })
          }
        }
        for (let index in this.courseOptions) {
          if (this.courseOptions.hasOwnProperty(index)) {
            this.$http.post('/getLessonLByTIdAndCId', {
              teacherId: window._const.teacherId,
              courseId: this.courseOptions[index].courseId
            }).then((res) => {
              let lessonOption = []
              for (let key in res.data.lessonList) {
                if (res.data.lessonList.hasOwnProperty(key)) {
                  lessonOption.push({
                    label: res.data.lessonList[key].lessonName,
                    value: res.data.lessonList[key]._id,
                    lessonId: res.data.lessonList[key]._id,
                    studentNumber: res.data.lessonList[key].studentNumber,
                  })
                }
              }
              this.lessonOptions.push(lessonOption)
            })
          }
        }
  
      })
    },
    methods: {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
