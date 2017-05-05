<template>
  <div>
    <mt-header title="我的试卷">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">请选择课程</label>
    <mt-cell title="微积分" value="" is-link class="left" :to="{name:'s_myPaperList'}">
      <mt-badge type="primary">1</mt-badge>
    </mt-cell>
    <mt-cell title="电路理论" value="" is-link class="left" :to="{name:'nothing'}"></mt-cell>
    <mt-cell title="数据结构" value="" is-link class="left" :to="{name:'nothing'}"></mt-cell>
  </div>
</template>

<script>
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
