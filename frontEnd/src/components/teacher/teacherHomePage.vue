<template>
  <div>
    <mt-header title="教师首页"></mt-header>
    <mt-cell title="我的题库" value="" is-link class="left" :to="{name:'chooseCourse4question'}"></mt-cell>
    <mt-cell title="我的卷库" value="" is-link class="left" :to="{name:'paperBank'}"></mt-cell>
    <mt-cell title="发布试卷" value="" is-link class="left" :to="{name:'chooseBasicInfo'}"></mt-cell>
    <mt-cell title="管理班级" value="" is-link class="left" :to="{name:'chooseClass'}"></mt-cell>
    <mt-cell title="个人信息" value="" is-link class="left" :to="{name:'teacher_myInfo'}"></mt-cell>
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
