<template>
<div>
  <mt-header :title="title">
    <router-link to="/createQuestion" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="/previewChoiceQuestion" slot="right">
      <mt-button @click.native="updateChoiceQuestion()">预览</mt-button>
    </router-link>
  </mt-header>
  <label class="block-title">题目内容</label>
  <mt-field class="left" label="题干" placeholder="请输入题干……" type="textarea" rows="4" v-model="choiceQuestionContent" :value="this.choiceQuestionContent"></mt-field>
  <mt-field class="left" label="选项A" placeholder="请输入选项" v-model="choiceA" :value="this.choiceA"></mt-field>
  <mt-field class="left" label="选项B" placeholder="请输入选项" v-model="choiceB" :value="this.choiceB"></mt-field>
  <mt-field class="left" label="选项C" placeholder="请输入选项" v-model="choiceC" :value="this.choiceC"></mt-field>
  <mt-field class="left" label="选项D" placeholder="请输入选项" v-model="choiceD" :value="this.choiceD"></mt-field>
  <mt-radio class="left" title="正确选项" v-model="choice" :options="choiceOptions" align="right">
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
      choice: '',
      chapter: '',
      choiceQuestionContent: '',
      title: '创建选择题',
      choiceA: '',
      choiceB: '',
      choiceC: '',
      choiceD: '',
      choiceOptions: [{
          label: '选项A',
          value: '1',
        },
        {
          label: '选项B',
          value: '2'
        },
        {
          label: '选项C',
          value: '3'
        },
        {
          label: '选项D',
          value: '4'
        }
      ],
    }
  },
  methods: {
    confirmCreation() {
      this.$messagebox.confirm('确定出题?').then(action => {
        console.log(action);
        this.$router.push('/questionBank')
      }, action => {
        console.log(action);
      });
    },
    updateChoiceQuestion() {
      this.updateChoiceQuestionContent();
      this.updateChoiceQuestionChoice();
      this.updateChoiceQuestionChpater();
    },
    updateChoiceQuestionContent() {
      this.$store.commit('newChoiceQuestionContent', this.choiceQuestionContent)
    },
    updateChoiceQuestionChoice() {
      let choice = {
        choiceA : this.choiceA,
        choiceB : this.choiceB,
        choiceC : this.choiceC,
        choiceD : this.choiceD,
      }
      this.$store.commit('newChoiceQuestionChoice', choice)
    },
    updateChoiceQuestionChpater() {
      this.$store.commit('newChoiceQuestionChapter', this.chapter)
    },
  },
  mounted: function() {
    this.choiceQuestionContent = this.$store.state.s_choiceQuestionContent
    this.choiceA = this.$store.state.s_choiceA
    this.choiceB = this.$store.state.s_choiceB
    this.choiceC = this.$store.state.s_choiceC
    this.choiceD = this.$store.state.s_choiceD
    this.chapter = this.$store.state.s_choiceQuestionChapter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
