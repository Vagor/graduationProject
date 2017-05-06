<template>
  <div>
    <mt-header :title="title">
      <router-link to="/student/paperCompletion" slot="left">
        <mt-button>整体情况（1/10）</mt-button>
      </router-link>
      <router-link v-on:click.native="goBack()" to="" slot="right">
        <mt-button>上一题</mt-button>
      </router-link>
    </mt-header>
    <router-view></router-view>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="goToLink()">下一题</mt-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '微积分A卷',
      }
    },
    methods: {
      goToLink() {
        this.$router.push('/student/paperCompletion')
      },
    },
    mounted: function() {
      this.title = this.$store.state.s_doQuestionCache.paperTitle
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
