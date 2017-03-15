<template>
<div>
  <mt-header :title="title">
    <router-link to="/createQuestion" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="/previewSAQQuestion" slot="right">
      <mt-button @click.native="updateSAQQuestionContent">预览</mt-button>
    </router-link>
  </mt-header>
  <label class="block-title">题目内容</label>
  <mt-field class="left" label="题干" placeholder="请输入题干" type="textarea" rows="4" v-model="stem" :value="this.stem"></mt-field>
  <label class="block-title">正确答案</label>
  <mt-field class="left" label="正确答案" placeholder="请输入答案" type="textarea" rows="4"></mt-field>
  <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认出题</mt-button>
</div>
</template>

<script>
export default {
  name: 'createSAQQuestion',
  data() {
    return {
      title: '创建问答题',
      stem: ''
    }
  },
  methods: {
    confirmCreation() {
      let _this = this;
      this.$messagebox.confirm('确定出题?').then(action => {
        console.log(action); // confirm
        _this.$http.post('/updateChoiceQuestion', {
          type: 0, // type=0 ===>新建；type=1 ===>更新；
          choiceQuestion: {
            stem: _this.stem, //题干
            options: [_this.choiceA, _this.choiceB, _this.choiceC, _this.choiceD], //选项
            answerOption: _this.answerOption, //正确选项
            courseId: window._const.courseId, //所属课程
            chapter: _this.chapter, //所属章节
            teacherId: window._const.teacherId, //出题人
          }
        }).then((res) => {
          if (res.data.success == 1) {
            _this.$toast({
              message: '操作成功',
              duration: 1000,
            })
            _this.$router.push('/questionBank')
          }
        })
      })
    },
    updateSAQQuestionContent() {
      this.$store.commit('newSAQQuestionContent', {stem:this.stem})
    }
  },
  mounted: function() {
    this.stem = this.$store.state.s_SAQQuestionContent.stem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
