<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-radio title="请选择课程" v-model="courseChosed" :options="courseOptions" class="left">
    </mt-radio>
    <!--通过加上空字符，让数字变成字符串，如(''+index)-->
    <mt-checklist title="请选组班级" v-model="lessonSelected[index]" :options="item" class="left" v-if="courseChosed === (''+index)" v-for="(item,index) in lessonOptions"></mt-checklist>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirm()">去选择试卷</mt-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '发布试卷',
        courseOptions: [],
        lessonOptions: [],
        courseChosed: '0',
        lessonSelected: [
          [],
          [],
          [],
          [],
          [],
        ],
      }
    },
    mounted: function() {
      // 初始化选择题列表
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
            console.log(this.courseOptions)
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
      confirm() {
        this.$messagebox.confirm('确定为所选班级出卷?').then(action => {
          console.log(action);
          this.$router.push('/publish/paperBank4publish')
        }, action => {
          console.log(action);
        });
      },
      add() {
        console.log('add')
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
