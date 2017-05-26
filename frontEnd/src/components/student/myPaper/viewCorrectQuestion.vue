<template>
  <div>
    <mt-header title="题目情况">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        index: 0,
        QCount: 0,
      }
    },
    methods: {
      goToPaperChecked() {
        this.$router.push('/student/paperChecked/' + this.$store.state.s_viewChechedQuestionCache.paperId)
      },
    },
    mounted: function() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
