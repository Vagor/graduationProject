<template>
  <div>
    <mt-header :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-radio title="请选择课程" v-model="courseId" :options="courseOptions" class="left">
    </mt-radio>
    <mt-checklist title="请选组班级" v-model="lessonId" :options="lessonOptions" class="left">
    </mt-checklist>
    </mt-checklist>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '发布试卷',
        courseOptions: [{
            label: '微积分',
            value: '值F',
          },
          {
            label: '数据结构',
            value: '值A'
          },
          {
            label: '电路理论',
            value: '值B'
          }
        ],
        lessonOptions: [{
            label: '通信1305、通信1306',
            value: '值F',
          },
          {
            label: '通信1303、通信1304',
            value: '选中禁用的值',
          },
        ],
        courseId: '',
        lessonId: [],
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
