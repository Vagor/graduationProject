<template>
  <div>
    <label class="block-title">选择题</label>
    <mt-field class="left" label="问题" type="textarea" rows="4" readonly v-model="stem"></mt-field>
    <mt-field class="left" :label="'选项'+item.label" :value="item.content" v-for="item in choiceOptions"></mt-field>
    <label class="block-title">正确选项</label>
    <mt-cell class="left" title="正确选项">{{answerOption}}</mt-cell>
    </mt-radio>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stem: '',
        answerOption: '',
        choiceOptions: [],
        choice: '',
      }
    },
    methods: {
      initPage() {
        this.$http.post('/getChoiceQuestionContent', {
          questionId: this.$route.params.questionId
        }).then((res) => {
          // 待接口完善（返回answerOption）
          res.data.answerOption = "A"
          this.stem = res.data.stem
          this.answerOption = res.data.answerOption
          this.choiceOptions = [{
            label: 'A',
            content: res.data.options[0],
            value: '1'
          }, {
            label: 'B',
            content: res.data.options[1],
            value: '2'
          }, {
            label: 'C',
            content: res.data.options[2],
            value: '3'
          }, {
            label: 'D',
            content: res.data.options[3],
            value: '4'
          }]
        })
      }
    },
    mounted: function() {
      this.initPage()
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
