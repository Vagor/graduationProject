<template>
  <div>
    <mt-header title="登录页面"></mt-header>
    <mt-field label="用户名" placeholder="用户名" v-model="username" class="left"></mt-field>
    <mt-field label="密码" placeholder="密码" type="password" v-model="password" class="left"></mt-field>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="login()">登录</mt-button>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      // teacher common methods
      login() {
        this.$http.post('/logInAndGetInf', {
          username: this.username,
          password: this.password,
        }).then((res) => {
          if (res.data.student) {
            this.$router.push('/student')
            window._const.studentId = res.data.student._id
            window._const.studentName = res.data.student.studentName
            window._const.learnNumber = res.data.student.learnNumber
            window._const.school = res.data.student.school
            window._const.yuanXi = res.data.student.yuanXi
          } else if (res.data.teacher) {
            this.$router.push('/teacherHomePage')
            window._const.teacherId = res.data.teacher._id
            window._const.studentName = res.data.teacher.studentName
            window._const.learnNumber = res.data.teacher.learnNumber
            window._const.school = res.data.teacher.school
            window._const.yuanXi = res.data.teacher.yuanXi
          } else {
            this.$messagebox.alert('账号或密码错误')
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
