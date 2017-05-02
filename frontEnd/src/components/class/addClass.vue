<template>
  <div>
    <mt-header :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="/addClass" slot="right">
        <mt-button >新建课程</mt-button>
      </router-link>
    </mt-header>
      <label class="block-title">选择现有课堂添加班级</label>
          <label class="block-title right">请选组课程</label>
    <mt-cell title="微积分" value="" is-link class="left" :to="{name:'createPaper_paperInfo'}"></mt-cell>
    <mt-cell title="数据结构" value="" is-link class="left" :to="{name:'createPaper_paperInfo'}"></mt-cell>
    <mt-cell title="电路理论" value="" is-link class="left" :to="{name:'createPaper_paperInfo'}"></mt-cell>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '添加课堂',
        courseOptions: [{
            label: '微积分',
            value: '0'
          },
          {
            label: '数据结构',
            value: '1'
          },
          {
            label: '电路理论',
            value: '2'
          }
        ],
        lessonOptions: [
          [{
              label: '通信1305、通信1306',
              value: '通信1305、通信1306',
            },
            {
              label: '通信1303、通信1304',
              value: '通信1303、通信1304',
            },
          ],
          [{
              label: '电信1305、电信1306',
              value: '值F',
            },
            {
              label: '通信1303、通信1304',
              value: '选中禁用的值',
            },
          ],
          [{
              label: '卓越1305、提高1306',
              value: '值F',
            },
            {
              label: '电中英1303、电中英1304',
              value: '选中禁用的值',
            },
          ]
        ],
        courseChosed: '0',
        lessonSelected: [
          [],
          [],
          [],
          [],
          [],
        ],
      }
    },
    mounted: function() {
      // // 初始化tab信息
      // this.$http.post('/initPublishBasicInfo', {
      //   teacherId: window._const.teacherId
      // }).then((res) => {
      // this.courseOptions = res.data.courseOptions
      // this.lessonOptions = res.data.lessonOptions
      // })
    },
    methods: {
      confirm() {
        this.$messagebox.confirm('确定为\n' + this.lessonSelected[this.courseChosed].toString() + '\n出卷?').then(action => {
          console.log(action);
          this.$router.push('/publish/paperBank4publish')
        }, action => {
          console.log(action);
        });
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
