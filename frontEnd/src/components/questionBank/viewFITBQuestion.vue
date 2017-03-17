<template>
<div>
  <mt-header  :title="title">
    <router-link to="" slot="left">
      <mt-button icon="back" @click.native="goBackPage()">返回</mt-button>
      <mt-button v-show="isEditMode" @click.native="exitEditMode()">取消修改</mt-button>
    </router-link>
    <mt-button icon="more" slot="right" @click.native="showActionSheet()"></mt-button>
  </mt-header>
  <label class="block-title">题目内容</label>
  <mt-field class="left" label="题干" placeholder="请输入题干……" type="textarea" rows="4" v-model="stem" :value="this.stem" :readonly="!isEditMode"></mt-field>
  <mt-field class="left" label="正确答案1" placeholder="请输入正确答案" :readonly="!isEditMode" v-model="answerOption1"></mt-field>
  <mt-field class="left" label="正确答案2" placeholder="请输入正确答案" :readonly="!isEditMode" v-model="answerOption2"></mt-field>
  <mt-field class="left" label="正确答案3" placeholder="请输入正确答案" :readonly="!isEditMode" v-model="answerOption3"></mt-field>
  <mt-field class="left" label="正确答案4" placeholder="请输入正确答案" :readonly="!isEditMode" v-model="answerOption4"></mt-field>
  </mt-radio>
  <label class="block-title">其他信息</label>
  <mt-field class="left" label="题目所属章节" placeholder="请输入章节数" type="number" v-model="chapter" :value="this.chapter" :readonly="!isEditMode"></mt-field>
  <mt-button v-show="isEditMode" type="primary" size="large" class="bottomBtn" @click.native="updateFITBQuestion()">确认修改</mt-button>
  <mt-actionsheet :actions="sheetActions" v-model="sheetVisible">
  </mt-actionsheet>
</div>
</template>

<script>
export default {
  name: 'createFITBQuestion',
  data() {
    return {
      sheetActions: [{
        name: '修改',
        method: () => {
          this.isEditMode = true
        }
      }, {
        name: '删除',
        method: () => {
          this.$messagebox.confirm('确定执行此操作?').then(action => {
            this.$http.post('/deleteFITBQuestion', {
              questionId: this.$route.params.questionId
            }).then((res) => {
              if (res.data.success == 1) {
                this.$toast({
                  message: '操作成功',
                  duration: 1000,
                });
                setTimeout(() => {
                  this.$router.push('/questionBank')
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
      }, ],
      sheetVisible: false,
      isEditMode: false,
      chapter: '',
      stem: '',
      blankCounter: '',
      answerOption1:'',
      answerOption2:'',
      answerOption3:'',
      answerOption4:'',
      title: '查看题目',
    }
  },
  filters: {
    num2option: (value) => {
      switch (value) {
        case 0:
          return "选项A"
          break;
        case 1:
          return "选项B"
          break;
        case 2:
          return "选项C"
          break;
        case 3:
          return "选项D"
          break;
        default:
      }
    }
  },
  methods: {
    goBackPage() {
      this.$router.go(-1)
    },
    exitEditMode() {
      this.isEditMode = false
    },
    showActionSheet() {
      this.sheetVisible = 1
    },
    updateFITBQuestion() {
      let _this = this;
      this.$messagebox.confirm('确定修改?').then(action => {
        _this.$http.post('/updateFITBQuestion', {
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
    // console.log(_this.$route.params.questionId);
    let _this = this;
    this.$http.post('/getFITBQuestionContent', {
      questionId: _this.$route.params.questionId
    }).then((res) => {
      this.stem = res.data.stem
      this.blankCounter = res.data.blankCounter
      this.chapter = res.data.chapter
      this.answerOption1 = res.data.answerOption1
      this.answerOption2 = res.data.answerOption2
      this.answerOption3 = res.data.answerOption3
      this.answerOption4 = res.data.answerOption4
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
