<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="chooseCourse4paper" slot="right">
        <mt-button>组卷</mt-button>
      </router-link>
    </mt-header>
    <mt-navbar v-model="activeTab">
      <mt-tab-item id="course_0">{{courseName}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="activeTab" swipeable class="little-gap">
      <mt-tab-container-item id="course_0">
        <mt-cell v-for="item in paperList" is-link :to="{ name: 'paperInfo4publish', params: { paperId: item._id }}" v-bind:title="item.paperTitle" class="left">
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  export default {
    name: 'questionBank',
    data() {
      return {
        title: '试卷库',
        activeTab: 'course_0',
        paperList: [],
      }
    },
    methods: {},
    filters: {
      characterLimit: (value) => {
        return value
      }
    },
    mounted: function() {
      // 初始化
      this.$http.post('/getPaperListByCIdAndTId', {
        teacherId: window._const.teacherId,
        courseId: this.$store.state.s_publishCache.courseId
      }).then((res) => {
        this.paperList = res.data.paperList
      })
    },
    computed: {
      courseName: function() {
        return this.$store.state.s_publishCache.courseName
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .changeTabBtnGroup {
    padding: 10px;
    background-color: #eee;
    text-align: left;
  }
  
  .wrap-content {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

