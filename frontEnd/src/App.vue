<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        msg: '老师'
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

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  html,
  body,
  #app {
    margin: 0;
    margin-bottom: 5rem;
    background-color: #eee;
  }
  
  .block-title {
    font-size: 12px;
    margin: 8px;
    display: block;
    color: #888;
    text-align: left;
  }
  
  .left {
    text-align: left;
  }
  
  .right {
    text-align: right;
  }
  
  .gap {
    margin-top: 1rem;
  }
  
  .little-gap {
    margin-top: 0.5rem;
  }
  
  .bottomBtn {
    position: fixed;
    bottom: 0px;
    z-index: 1;
  }
</style>
