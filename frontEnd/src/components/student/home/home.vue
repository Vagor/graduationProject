<template>
  <div>
    <mt-header title="学生首页"></mt-header>
    <mt-cell title="我的课堂" value="" is-link class="left" :to="{name:'s_viewLesson'}"></mt-cell>
    <mt-cell title="我的试卷" value="" is-link class="left" :to="{name:'s_chooseCourse4PaperList'}"></mt-cell>
    <mt-cell title="个人信息" value="" is-link class="left" :to="{name:'student_myInfo'}"></mt-cell>
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
