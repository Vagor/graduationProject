<template>
<div>
  <mt-header  :title="title">
            <router-link v-on:click.native="goBack()" to="" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    <router-link to="/createChoiceQuestion" slot="right">
      <mt-button>返回修改</mt-button>
    </router-link>
  </mt-header>
  <mt-field class="left" label="问题" type="textarea" rows="4" readonly v-model="stem"></mt-field>
  <mt-radio class="left" title="选项" v-model="choice" :options="choiceOptions">
  </mt-radio>
  <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认出题</mt-button>
</div>
</template>

<script>
export default {
  name: 'previewChoiceQuestion',
  data() {
    return {
      title: '创建选择题',
      choice:'',
      choiceOptions: [{
          label: 'A.'+ this.$store.state.s_choiceQuestionContent.choiceA,
          value: '1',
        },
        {
          label: 'B.'+ this.$store.state.s_choiceQuestionContent.choiceB,
          value: '2'
        },
        {
          label: 'C.'+ this.$store.state.s_choiceQuestionContent.choiceC,
          value: '3'
        },
        {
          label: 'D.'+ this.$store.state.s_choiceQuestionContent.choiceD,
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
    }
  },  computed: {
      stem () {
        return this.$store.state.s_choiceQuestionContent.stem
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
