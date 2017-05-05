<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">参与课堂</label>
    <mt-cell :title="'我的课堂 '+(index+1)" class="left" :value="item.studentName" v-for="(item,index) in studentList" is-link></mt-cell>
  
  </div>
</template>

<script>
  export default {
    name: "viewLesson",
    data() {
      return {
        title: '我的课堂',
        studentList: [{
          studentName: "微积分",
          studentId: '123',
        }, {
          studentName: "电路理论",
          studentId: '123',
        }, {
          studentName: "大学物理",
          studentId: '123',
        }, {
          studentName: "大学语文",
          studentId: '123',
        }, {
          studentName: "大学英语",
          studentId: '123',
        }, {
          studentName: "数据结构",
          studentId: '123',
        }, ]
      }
    },
    mounted: function() {},
    methods: {},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>