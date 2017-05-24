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
      <mt-tab-item v-for="(item, index) in courseList" :id="index">{{item.courseName}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="activeTab" swipeable class="little-gap">
      <mt-tab-container-item :id="index" v-for="(paperListWithId,index) in paperLists">
        <mt-cell v-for="item in paperListWithId.paperList" is-link :to="{ name: 'viewPaperInfo', params: { paperId: item._id }}" :title="item.paperTitle | characterLimit4title" class="left">{{item.paperDesc | characterLimit4desc}}</mt-cell>
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
        activeTab: 0, //当前tab
        courseList: [],
        paperLists: [],
      }
    },
    methods: {},
    filters: {
      characterLimit4desc: (value) => {
        if(value.length > 4){
          return value.slice(0,5)+"..."
        }else {
          return value          
        }
      },
      characterLimit4title: (value) => {
        if(value.length > 15){
          return value.slice(0,14)+"..."
        }else {
          return value          
        }
      },
    },
    mounted: function() {
      // 初始化tab信息
      let _this = this
      this.$http.post('/initPaperBank', {
        teacherId: window._const.teacherId
      }).then((res_CL) => {
        this.courseList = res_CL.data.courseList
        for (let key in res_CL.data.courseList) {
          if (res_CL.data.courseList.hasOwnProperty(key)) {
            this.$http.post('/getPaperListByCIdAndTId', {
              teacherId: window._const.teacherId,
              courseId: res_CL.data.courseList[key].courseId
            }).then((res_PL) => {
              this.paperLists.push({
                paperList: res_PL.data.paperList,
                courseId: res_CL.data.courseList[key].courseId
              })
            })
          }
        }
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