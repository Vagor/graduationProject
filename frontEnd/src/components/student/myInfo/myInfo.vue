<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">个人信息</label>
    <mt-cell title="姓名" value="王思鸿" class="left"></mt-cell>
    <mt-cell title="年龄" value="22" class="left"></mt-cell>
    <mt-cell title="工号" value="U201313783" class="left"></mt-cell>
    <mt-cell title="校园邮箱" value="wangsihong@hust.edu.cn" class="left"></mt-cell>
    <label class="block-title">账号信息</label>
    <mt-cell title="账号" value="wangsihong" class="left"></mt-cell>
    <mt-cell title="密码" class="left">
      <mt-button v-on:click.prevent="sendPwd2Email($event)" size="small">发送至邮箱</mt-button>
    </mt-cell>
  
  </div>
</template>

<script>
  export default {
    name: "viewLesson",
    data() {
      return {
        title: '个人信息',
      }
    },
    mounted: function() {},
    methods: {
      sendPwd2Email: function(event) {
        event.stopPropagation();
        this.$toast('发送成功')
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>