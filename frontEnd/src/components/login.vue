<template>
  <div>
    <mt-header title="首页"></mt-header>
    <mt-field label="用户名" placeholder="用户名" v-model="username" class="left"></mt-field>
    <mt-field label="密码" placeholder="密码" type="password" v-model="password" class="left"></mt-field>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        username:'',
        password:'',
      }
    },
    methods: {
      // teacher common methods
      confirmCreation() {
        this.$messagebox.confirm('确定出题?').then(action => {
          console.log(action);
          this.$router.push('/questionBank')
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
