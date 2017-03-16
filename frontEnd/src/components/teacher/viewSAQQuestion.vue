<template>
<div>
  <mt-header :title="title">
    <router-link to="" slot="left">
      <mt-button icon="back" @click.native="goBackPage()">返回</mt-button>
      <mt-button v-show="isEditMode" @click.native="exitEditMode()">取消修改</mt-button>
    </router-link>
    <mt-button icon="more" slot="right" @click.native="showActionSheet()"></mt-button>
  </mt-header>
  <label class="block-title">题目内容</label>
  <mt-field class="left" label="题干" placeholder="请输入题干……" type="textarea" rows="4" v-model="stem" :value="this.stem" :readonly="!isEditMode"></mt-field>
  <label class="block-title">正确答案</label>
  <mt-field class="left" label="正确答案" placeholder="请输入答案" type="textarea" rows="4" v-model="answer" :readonly="!isEditMode"></mt-field>
  <label class="block-title">其他信息</label>
  <mt-field class="left" label="题目所属章节" placeholder="请输入章节数" type="number" v-model="chapter" :value="this.chapter" :readonly="!isEditMode"></mt-field>
  <mt-button v-show="isEditMode" type="primary" size="large" class="bottomBtn" @click.native="updateSAQQuestion()">确认修改</mt-button>
  <mt-actionsheet :actions="sheetActions" v-model="sheetVisible">
  </mt-actionsheet>
</div>
</template>

<script>
export default {
  name: 'viewSAQQuestion',
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
            this.$http.post('/deleteSAQQuestion', {
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
      answer:'',
      chapter: '',
      stem: '',
      title: '查看题目',
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
    updateSAQQuestion() {
      let _this = this;
      this.$messagebox.confirm('确定修改?').then(action => {
        _this.$http.post('/updateSAQQuestion', {
          type: 1, // type=0 ===>新建；type=1 ===>更新；
          SAQQuestion: {
            questionId: _this.$route.params.questionId,
            stem: _this.stem, //题干
            answer: _this.answer, //正确选项
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
    this.$http.post('/getSAQQuestionContent', {
      questionId: _this.$route.params.questionId
    }).then((res) => {
      this.stem = res.data.stem
      this.answer = res.data.answer
      this.chapter = res.data.chapter
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
