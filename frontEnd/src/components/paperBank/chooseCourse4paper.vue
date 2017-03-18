<template>
  <div>
    <mt-header title="选择课程">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <label class="block-title">请选组课程</label>
    <mt-cell title="微积分" value="" is-link class="left" :to="{name:'createPaper_paperInfo'}"></mt-cell>
    <mt-cell title="数据结构" value="" is-link class="left" :to="{name:'createPaper_paperInfo'}"></mt-cell>
    <mt-cell title="电路理论" value="" is-link class="left" :to="{name:'createPaper_paperInfo'}"></mt-cell>
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
