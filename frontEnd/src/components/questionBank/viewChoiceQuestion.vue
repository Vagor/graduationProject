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
  <mt-field class="left" label="选项A" placeholder="请输入选项" v-model="choiceA" :value="this.choiceA" :readonly="!isEditMode"></mt-field>
  <mt-field class="left" label="选项B" placeholder="请输入选项" v-model="choiceB" :value="this.choiceB" :readonly="!isEditMode"></mt-field>
  <mt-field class="left" label="选项C" placeholder="请输入选项" v-model="choiceC" :value="this.choiceC" :readonly="!isEditMode"></mt-field>
  <mt-field class="left" label="选项D" placeholder="请输入选项" v-model="choiceD" :value="this.choiceD" :readonly="!isEditMode"></mt-field>
  <mt-field v-show="!isEditMode" class="left little-gap" label="正确选项" placeholder="请输入正确选项" type="string" :value="answerOption | num2option" :readonly="!isEditMode"></mt-field>
  <mt-radio v-show="isEditMode" class="left" title="正确选项" v-model="answerOption" :options="choiceOptions" align="right">
  </mt-radio>
  <label class="block-title">其他信息</label>
  <mt-field class="left" label="题目所属章节" placeholder="请输入章节数" type="number" v-model="chapter" :value="this.chapter" :readonly="!isEditMode"></mt-field>
  <mt-button v-show="isEditMode" type="primary" size="large" class="bottomBtn" @click.native="updateChoiceQuestion()">确认修改</mt-button>
  <mt-actionsheet :actions="sheetActions" v-model="sheetVisible">
  </mt-actionsheet>
</div>
</template>

<script>
export default {
  name: 'viewChoiceQuestion',
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
            this.$http.post('/deleteChoiceQuestion', {
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
      answerOption: '',
      chapter: '',
      stem: '',
      title: '查看题目',
      choiceA: '',
      choiceB: '',
      choiceC: '',
      choiceD: '',
      choiceOptions: [{
          label: '选项A',
          value: '0',
        },
        {
          label: '选项B',
          value: '1'
        },
        {
          label: '选项C',
          value: '2'
        },
        {
          label: '选项D',
          value: '3'
        }
      ],
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
    updateChoiceQuestion() {
      let _this = this;
      this.$messagebox.confirm('确定修改?').then(action => {
        _this.$http.post('/updateChoiceQuestion', {
          type: 1, // type=0 ===>新建；type=1 ===>更新；
          choiceQuestion: {
            questionId: _this.$route.params.questionId,
            stem: _this.stem, //题干
            options: [_this.choiceA, _this.choiceB, _this.choiceC, _this.choiceD], //选项
            answerOption: _this.answerOption, //正确选项
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
    this.$http.post('/getChoiceQuestionContent', {
      questionId: _this.$route.params.questionId
    }).then((res) => {
      this.stem = res.data.stem
      this.answerOption = res.data.answerOption
      this.chapter = res.data.chapter
      this.choiceA = res.data.options[0]
      this.choiceB = res.data.options[1]
      this.choiceC = res.data.options[2]
      this.choiceD = res.data.options[3]
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
