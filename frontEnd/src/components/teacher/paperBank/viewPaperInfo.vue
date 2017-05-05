<template>
  <div>
    <mt-header :title="title">
      <router-link to="" slot="left">
        <mt-button icon="back" @click.native="goBack()">返回</mt-button>
        <mt-button v-show="isEditMode" @click.native="exitEditMode()">取消修改</mt-button>
      </router-link>
      <mt-button icon="more" slot="right" @click.native="showActionSheet()"></mt-button>
    </mt-header>
    <label class="block-title">试卷基本信息</label>
    <mt-field class="left" label="标题" placeholder="请输入试卷标题" :value="this.paperTitle"  :readonly="!isEditMode"></mt-field>
    <mt-field class="left" label="试卷简介" placeholder="请输入试卷简单介绍" :value="this.paperDesc" type="textarea" rows="4" :readonly="!isEditMode"></mt-field>
    <label class="block-title gap">其他信息</label>
    <mt-cell title="是否共享试卷" class="left" value="是" v-show="!isEditMode"></mt-cell>
    <mt-cell class="left" title="是否共享试卷" v-show="isEditMode">
      <mt-switch v-model="sharePaper"></mt-switch>
    </mt-cell>
    <mt-cell class="left" title="时长" :value="rangeValue+'分钟 '" v-show="!isEditMode"></mt-cell>
    <mt-cell class="left" title="限制时长" v-show="isEditMode">
      <mt-switch v-model="timeLimit"></mt-switch>
    </mt-cell>
    <mt-cell class="left" v-if="timeLimit" title="时长" :value="rangeValue+'分钟 '" v-show="isEditMode"></mt-cell>
    <mt-range v-if="timeLimit" class="little-gap" v-model="rangeValue" :min="0" :max="150" :step="10"></mt-range>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="goToLink()"  v-show="!isEditMode">查看题目</mt-button>
    <mt-button type="primary" size="large" class="bottomBtn" @click.native="updatePaper()"  v-show="isEditMode">确认修改</mt-button>
    <mt-actionsheet :actions="sheetActions" v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>


<script>
  export default {
    name: 'viewPaperInfo',
    data() {
      return {
        sheetActions: [{
            name: '修改',
            method: () => {
              this.isEditMode = true
            }
          },
          {
            name: '删除',
            method: () => {
              this.$messagebox.confirm('确定执行此操作?').then(action => {
                this.$http.post('/deletePaper', {
                  paperId: this.$route.params.paperId
                }).then((res) => {
                  if (res.data.success == 1) {
                    this.$toast({
                      message: '操作成功',
                      duration: 1000,
                    });
                    setTimeout(() => {
                      this.$router.push('/paperBank')
                    }, 1000);
                  } else {
                    this.$toast({
                      message: '删除失败',
                      duration: 1000,
                    });
                  }
                })
              });
            }
          },
        ],
        sheetVisible: false,
        rangeValue: 0,
        timeLimit: 0,
        title: '查看试卷',
        paperTitle: "",
        paperDesc: "",
        sharePaper: 1,
        isEditMode:0,
      }
    },
    methods: {
      goToLink() {
        this.$router.push('/viewPaper/'+this.$store.state.s_viewPaperCache.paperId)
      },
      exitEditMode() {
        this.isEditMode = false
      },
      showActionSheet() {
        this.sheetVisible = 1
      },
      updatePaper() {
        let _this = this;
        this.$messagebox.confirm('确定修改?').then(action => {
          _this.$http.post('/updatePaper', {
            type: 1, // type=0 ===>新建；type=1 ===>更新；
            FITBQuestion: {
              questionId: _this.$route.params.questionId,
              stem: _this.stem, //题干
              answerOption1: _this.answerOption1, //正确项
              answerOption2: _this.answerOption2, //正确项
              answerOption3: _this.answerOption3, //正确项
              answerOption4: _this.answerOption4, //正确项
              courseId: window._const.courseId, //所属课程
              chapter: _this.chapter, //所属章节
              teacherId: window._const.teacherId, //出题人
            }
          })
          _this.$toast({
            message: '操作成功',
            duration: 1000,
          });
          _this.$router.push('/questionBank')
        })
      }
    },
    mounted: function() {
      let _this = this;
      this.$store.commit('updateViewPaperCache', {
        paperId: _this.$route.params.paperId,
      })
      this.$http.post('/getPaperInfo', {
        paperId: _this.$route.params.paperId
      }).then((res) => {
        this.paperTitle = res.data.paperTitle
        this.paperDesc = res.data.paperDesc
      })
    }
  
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
