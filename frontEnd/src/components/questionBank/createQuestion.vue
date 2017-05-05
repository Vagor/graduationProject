<template>
  <div>
    <mt-header :title="title">
      <router-link v-on:click.native="goBack()" to="" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/nothing" slot="right">
        <mt-button>新增课程</mt-button>
      </router-link>
    </mt-header>
    <mt-radio class="left" title="请选择课程" v-model="courseValue" :options="courseOptions" align="right">
    </mt-radio>
    <mt-radio class="left" title="请选择题型" v-model="questionType" :options="questionOptions" align="right">
    </mt-radio>
    </mt-cell>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="creationBegin">开始出题</mt-button>
  
  </div>
</template>

<script>
  export default {
    name: 'createQuestion',
    data() {
      return {
        courseValue: '',
        questionType: '',
        title: '出题',
        courseOptions: [],
        questionOptions: [{
            label: '选择题',
            value: '1',
          },
          {
            label: '填空题',
            value: '2'
          },
          {
            label: '问答题',
            value: '3'
          }
        ]
      }
    },
    methods: {
      creationBegin() {
        if (this.courseValue && this.questionType) {
          switch (this.questionType) {
            case '1':
              this.$router.push('/createChoiceQuestion');
              break;
            case '2':
              this.$router.push('/createFITBQuestion');
              break;
            case '3':
              this.$router.push('/createSAQQuestion');
              break;
            default:
  
          }
        } else {
          this.$toast({
            message: '请检查选项',
            duration: 1000,
          });
        }
      }
    },
    mounted: function() {
      // 默认课程
      this.courseValue = this.$store.state.s_questionBankCache.courseId,
      // 初始化选择题列表
      this.$http.post('/getCListByTId', {
        teacherId: window._const.teacherId
      }).then((res) => {
        for (var key in res.data.courseList) {
          if (res.data.courseList.hasOwnProperty(key)) {
            this.courseOptions.push({
              label: res.data.courseList[key].courseName,
              value: res.data.courseList[key].courseId
            })
          }
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
