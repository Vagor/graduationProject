<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">班级学生</label>
    <mt-cell :title="'学生名称 '+(index+1)" class="left" :value="item.studentName" v-for="(item,index) in studentList"></mt-cell>
  
  </div>
</template>

<script>
  export default {
    name: "viewLesson",
    data() {
      return {
        title: '查看班级',
        studentList: [{
          studentName: "王名扬",
          studentId: '123',
        }, {
          studentName: "陶林伟",
          studentId: '123',
        }, {
          studentName: "张思佳",
          studentId: '123',
        }, {
          studentName: "邹智康",
          studentId: '123',
        }, {
          studentName: "陈桃斌",
          studentId: '123',
        }, {
          studentName: "吴烈庆",
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