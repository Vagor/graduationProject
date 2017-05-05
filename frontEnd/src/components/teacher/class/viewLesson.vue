<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">课堂所含班级</label>
    <mt-cell :title="'班级名称 '+(index+1)" class="left" :value="item.className" v-for="(item,index) in classList" is-link :to="{ name: 'viewClass', params: { classId: item.classId }}"></mt-cell>
  
  </div>
</template>

<script>
  export default {
    name: "viewLesson",
    data() {
      return {
        title: '查看课堂',
        classList: [{
          className: "通信1305",
          classId: '123',
        }, {
          className: "通信1306",
          classId: '123',
        }, ]
      }
    },
    mounted: function() {
    },
    methods: {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>