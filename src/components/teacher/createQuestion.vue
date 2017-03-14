<template>
<div>
  <mt-header :title="title">
    <router-link to="/" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="/nothing" slot="right">
      <mt-button>新增课程</mt-button>
    </router-link>
  </mt-header>
  <mt-radio class="left" title="请选择课程" v-model="courseName" :options="courseOptions" align="right">
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
      courseName: '',
      questionType: '',
      title: '出题',
      courseOptions: [{
          label: '微积分',
          value: '1',
        },
        {
          label: '电路理论',
          value: '2'
        },
        {
          label: '数据结构',
          value: '3'
        }
      ],
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
      if (this.courseName && this.questionType) {
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
        this.$toast('请检查选项');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
