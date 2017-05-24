<template>
  <div>
    <mt-header title="整体情况">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <label class="block-title">选择题（5/20）</label>
    <mt-cell v-for="item in choiceQList " is-link :to="{ name: 's_doCQ', params: { questionId: item.questionId }} " v-bind:title="item.stem | characterLimit " class="left ">
      <mt-badge type="error">未完成</mt-badge>
    </mt-cell>
    <mt-cell title="栈和队列的共同特点是" is-link class="left" to="//github.com">
      <mt-badge type="error">未完成</mt-badge>
    </mt-cell>
    <mt-cell title="用链接方式存储的队列，在进行插入运算时" is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="以下数据结构中哪一个是非线性结构？" is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="设有一个二维数组A[m][n]，假设..." is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="树最适合用来表示" is-link class="left" to="//github.com">
      <mt-badge type="error">未完成</mt-badge>
    </mt-cell>
    <label class="block-title">填空题（10/20）</label>
    <mt-cell title="二叉树的第k层的结点数最多为" is-link class="left" to="//github.com">
      <mt-badge type="error">未完成</mt-badge>
    </mt-cell>
    <mt-cell title="若有18个元素的有序表存放在一维数..." is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="对n个记录的文件进行快速排序，所..." is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="对于线性表（7，34，55，25，64..." is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="设有6个结点的无向图，该图至少..." is-link class="left" to="//github.com">
      <mt-badge type="error">未完成</mt-badge>
    </mt-cell>
    <mt-cell title="通常从四个方面评价算法的质量" is-link class="left" to="//github.com">
      <mt-badge type="error">未完成</mt-badge>
    </mt-cell>
    <mt-cell title="一个算法的时间复杂度为(n3+n4..." is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="假定一棵树的广义表表示为A（C..." is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="标题文字" is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="题目内容" is-link class="left" to="//github.com">
      <mt-badge type="error">未完成</mt-badge>
    </mt-cell>
    <label class="block-title">简答题（5/20）</label>
    <mt-cell title="题目内容" is-link class="left" to="//github.com">
      <mt-badge type="error">未完成</mt-badge>
    </mt-cell>
    <mt-cell title="标题文字" is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="标题文字" is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="标题文字" is-link class="left" to="//github.com">
      <mt-badge type="success">已完成</mt-badge>
    </mt-cell>
    <mt-cell title="题目内容" is-link class="left" to="//github.com">
      <mt-badge type="error">未完成</mt-badge>
    </mt-cell>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认交卷</mt-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        paperDesc: '',
        paperTitle: '',
        choiceQList: [],
        fQList: [],
        sQList: [],
        SQCount: 0,
        FQCount: 0,
        CQCount: 0,
      }
    },
    methods: {
      initPage() {
        // 初始化选择题列表
        this.$http.post('/getCQLByPId', {
          paperId: this.$route.params.paperId
        }).then((res) => {
          var temp;
          for (var i = 0; i < res.data.choiceQList.length; i++) {
            temp = {
              questionId: res.data.choiceQList[i]._id,
              stem: res.data.choiceQList[i].stem,
              chapter: '第' + res.data.choiceQList[i].chapter + '章'
            }
            this.choiceQList.push(temp)
          }
        })
        // 初始化填空题列表
        this.$http.post('/getFQLByPId', {
          paperId: this.$route.params.paperId
        }).then((res) => {
          var temp;
          for (var i = 0; i < res.data.fQList.length; i++) {
            temp = {
              questionId: res.data.fQList[i]._id,
              stem: res.data.fQList[i].stem,
              chapter: '第' + res.data.fQList[i].chapter + '章'
            }
            this.fQList.push(temp)
          }
        })
        // 初始化问答题列表
        this.$http.post('/getSQLByPId', {
          paperId: this.$route.params.paperId
        }).then((res) => {
          var temp;
          for (var i = 0; i < res.data.sQList.length; i++) {
            temp = {
              questionId: res.data.sQList[i]._id,
              stem: res.data.sQList[i].stem,
              chapter: '第' + res.data.sQList[i].chapter + '章'
            }
            this.sQList.push(temp)
          }
        })
        this.SQCount = this.sQList.length
        this.FQCount = this.fQList.length
        this.CQCount = this.choiceQList.length
        // updateDoQuestionCache
        this.$store.commit('updateDoQuestionCache', {
          sQList: this.sQList,
          choiceQList: this.choiceQList,
          fQList: this.fQList,
          SQCount: this.SQCount,
          FQCount: this.FQCount,
          CQCount: this.CQCount,
        })
      }
    },
    mounted: function() {
      this.initPage()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
