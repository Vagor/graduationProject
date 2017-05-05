<template>
<div>
  <mt-header  :title="title">
            <router-link v-on:click.native="goBack()" to="" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="/previewChoiceQuestion" slot="right">
      <mt-button @click.native="updateChoiceQuestionContent()">预览</mt-button>
    </router-link>
  </mt-header>
  <label class="block-title">题目内容</label>
  <mt-field class="left" label="题干" placeholder="请输入题干……" type="textarea" rows="4" v-model="stem" :value="this.stem"></mt-field>
  <mt-field class="left" label="选项A" placeholder="请输入选项" v-model="choiceA" :value="this.choiceA"></mt-field>
  <mt-field class="left" label="选项B" placeholder="请输入选项" v-model="choiceB" :value="this.choiceB"></mt-field>
  <mt-field class="left" label="选项C" placeholder="请输入选项" v-model="choiceC" :value="this.choiceC"></mt-field>
  <mt-field class="left" label="选项D" placeholder="请输入选项" v-model="choiceD" :value="this.choiceD"></mt-field>
  <mt-radio class="left" title="正确选项" v-model="answerOption" :options="choiceOptions" align="right">
  </mt-radio>
  <label class="block-title">其他信息</label>
  <mt-field class="left" label="题目所属章节" placeholder="请输入章节数" type="number" v-model="chapter" :value="this.chapter"></mt-field>
  <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认出题</mt-button>
</div>
</template>

<script>
export default {
  name: 'createChoiceQuestion',
  data() {
    return {
      answerOption: '', // 0==>A;.....3==>D
      chapter: '',
      stem: '',
      title: '创建选择题',
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
            courseId: _this.$store.state.s_questionBankCache.courseId, //所属课程
            chapter: _this.chapter, //所属章节
            teacherId: window._const.teacherId, //出题人
          }
        }).then((res) => {
          if (res.data.success == 1) {
            _this.$toast({
              message: '操作成功',
              duration: 1000,
            })
            _this.$router.push('/questionBank/'+_this.$store.state.s_questionBankCache.courseId)
          }
        })
      })
    },
    updateChoiceQuestionContent() {
      let questionContent = {
        stem: this.stem,
        choiceA: this.choiceA,
        choiceB: this.choiceB,
        choiceC: this.choiceC,
        choiceD: this.choiceD,
        chapter: this.chapter,
        answerOption: this.answerOption,
      }
      this.$store.commit('newChoiceQuestionContent', questionContent)
    },
  },
  mounted: function() {
    this.stem = this.$store.state.s_choiceQuestionContent.stem
    this.choiceA = this.$store.state.s_choiceQuestionContent.choiceA
    this.choiceB = this.$store.state.s_choiceQuestionContent.choiceB
    this.choiceC = this.$store.state.s_choiceQuestionContent.choiceC
    this.choiceD = this.$store.state.s_choiceQuestionContent.choiceD
    this.chapter = this.$store.state.s_choiceQuestionContent.chapter
    this.answerOption = this.$store.state.s_choiceQuestionContent.answerOption
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
