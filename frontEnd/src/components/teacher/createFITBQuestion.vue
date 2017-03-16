<template>
<div>
  <mt-header :title="title">
    <router-link to="/createQuestion" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="/previewFITBQuestion" slot="right">
      <mt-button @click.native="updateFITBQuestionContent">预览</mt-button>
    </router-link>
  </mt-header>
  <label class="block-title">题目内容</label>
  <mt-field class="left" label="题干" placeholder="请输入题干……" type="textarea" rows="4" v-model="stem" :value="this.stem"></mt-field>
  <mt-cell class="left" title="添加填空处" label="点击此处可以在题干中增加一个填空处（至多4空）" is-link @click.native="addBlank"></mt-cell>
  <label class="block-title">正确答案</label>
  <mt-field v-for="n in blankCounter" class="left" label="正确答案" placeholder="请输入正确答案" v-model="$scope['goods_'+$index]"></mt-field>
  <label class="block-title gap">其他信息</label>
  <mt-field class="left" label="题目所属章节" placeholder="请输入章节数" type="number" v-model="chapter" :value="this.chapter"></mt-field>
  <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认出题</mt-button>
</div>
</template>

<script>
export default {
  name: 'createFITBQuestion',
  data() {
    return {
      title: '创建填空题',
      stem:'',
      blankCounter: 0,
      chapter: '',
    }
  },
  methods: {
    confirmCreation() {
      let _this = this;
      this.$messagebox.confirm('确定出题?').then(action => {
        console.log(action); // confirm
        _this.$http.post('/updateFITBQuestion', {
          type: 0, // type=0 ===>新建；type=1 ===>更新；
          choiceQuestion: {
            stem: _this.stem, //题干
            blankCounter: _this.blankCounter, //正确选项
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
    addBlank() {
      if (this.blankCounter < 4) {
        this.blankCounter++;
        this.stem += '________';
      }
    },
    updateFITBQuestionContent() {
      this.$store.commit('newFITBQuestionContent', {stem:this.stem,blankCounter:this.blankCounter})
    }
  },
  mounted: function() {
    this.stem = this.$store.state.s_FITBQuestionContent.stem
    this.blankCounter =  this.$store.state.s_FITBQuestionContent.blankCounter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
