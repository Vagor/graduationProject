<template>
  <div>
    <mt-header :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link to="chooseCourse4paper" slot="right">
        <mt-button>组卷</mt-button>
      </router-link>
    </mt-header>
  
    <mt-navbar v-model="activeTab">
      <mt-tab-item v-for="(item, index) in courseList" :id="'course_'+index">{{item.courseName}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="activeTab" swipeable class="little-gap">
      <mt-tab-container-item :id="'course_'+index"  v-for="(paperList,index) in paperLists">
        <mt-cell v-for="item in paperList.paperList" is-link :to="{ name: 'viewPaperInfo', params: { questionId: item.paperId }}" v-bind:title="item.paperTitle" class="left">{{item.paperDesc}}</mt-cell>
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
        activeTab: 'course_0', //当前tab
        courseList: [{
          courseName: "微积分",
          courseId: 123
        }, {
          courseName: "数据结构",
          courseId: 123
        }, {
          courseName: "大学语文",
          courseId: 123
        }, {
          courseName: "电路理论",
          courseId: 123
        }, ],
        paperLists: [{
            paperList: [{
              paperTitle: '1',
              paperDesc: '1',
              timeLimit: 26,
              paperId: '1'
            }]
          }, {
            paperList: [{
              paperTitle: '2',
              paperDesc: '2',
              timeLimit: 26,
              paperId: '2'
            },{
              paperTitle: '2',
              paperDesc: '2',
              timeLimit: 26,
              paperId: '2'
            }]
          }, {
            paperList: [{
              paperTitle: '3',
              paperDesc: '3',
              timeLimit: 26,
              paperId: '3'
            }]
          }, {
            paperList: [{
              paperTitle: '4',
              paperDesc: '4',
              timeLimit: 26,
              paperId: '4'
            }]
          },
        ]
      }
    },
    methods: {},
    filters: {
      characterLimit: (value) => {
        return value
      }
    },
    mounted: function() {
      // 初始化tab信息
      this.$http.post('/initPaperBank', {
        teacherId: window._const.teacherId
      }).then((res) => {
        this.courseList = res.data.courseList
        this.paperLists = res.data.paperLists
      })
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

