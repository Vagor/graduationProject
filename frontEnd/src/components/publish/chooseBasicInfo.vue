<template>
  <div>
    <mt-header :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-radio title="请选择课程" v-model="courseChosed" :options="courseOptions" class="left">
    </mt-radio>
    <!--通过加上空字符，让数字变成字符串，如(''+index)-->
    <mt-checklist title="请选组班级" v-model="lessonSelected[index]" :options="item" class="left" v-if="courseChosed === (''+index)" v-for="(item,index) in lessonOptions"></mt-checklist>
    <mt-cell title="标题文字" is-link class="left" to="//github.com">
      <mt-button v-on:click.prevent="add()" size="small">添加</mt-button>
    </mt-cell>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirm()">去选择试卷</mt-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '发布试卷',
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
      add() {
        console.log('add')
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
