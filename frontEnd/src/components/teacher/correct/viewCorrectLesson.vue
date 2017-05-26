<template>
    <div>
        <mt-header :title="title">
            <router-link v-on:click.native="goBack()" to="" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <label class="block-title">选择试卷</label>
        <template v-for="item in paperOptions">
            <mt-cell class="left" :title="item.label" is-link :to = "{ name: 'viewCorrectPaper', params: {paperId: item.paperId }}"></mt-cell>
        </template>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '批改试卷',
        paperOptions: [],
        courseChosed: '0',
      }
    },
    mounted: function() {
      // 初始化
      // 获取课堂id
      var ID = this.$route.params.lessonId;
      this.$http.post('/getWaitCheckPaperList', {
        teacherId: window._const.teacherId,
        lessonId: ID
      }).then((res) => {
        this.paperOptions = res.data.waitCheckPaperCollectionList.map((row, index) => {
            return {
                label: row.paperTitle,
                motherPaperId: row.paperId,
                paperId: row._id
            }
        })
      })
    },
    methods: {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>