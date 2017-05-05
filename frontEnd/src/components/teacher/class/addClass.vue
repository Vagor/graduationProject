<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/addClass" slot="right">
        <mt-button>新建课程</mt-button>
      </router-link>
    </mt-header>
    <mt-radio title="选择现有课堂添加班级" v-model="courseChosed" :options="courseOptions" class="left">
    </mt-radio>
        <label class="block-title">班级基本信息</label>
        <mt-field label="班级代号" placeholder="第一个（至多输入四个）" class="left"></mt-field>
        <mt-field label="班级代号" placeholder="第二个（至多输入四个）" class="left"></mt-field>
        <mt-field label="班级代号" placeholder="第三个（至多输入四个）" class="left"></mt-field>
        <mt-field label="班级代号" placeholder="第四个（至多输入四个）" class="left"></mt-field>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '添加课堂',
        courseOptions: [],
        lessonOptions: [],
        courseChosed: '0',
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
        this.$messagebox.confirm('确定为\n' + this.lessonSelected[this.courseChosed].toString() + '\n出卷?').then(action => {
          console.log(action);
          this.$router.push('/publish/paperBank4publish')
        }, action => {
          console.log(action);
        });
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
