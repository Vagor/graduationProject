<template>
    <div>
        <label class="block-title">选择题</label>
        <mt-field class="left" label="问题" type="textarea" rows="4" readonly v-model="stem"></mt-field>
        <mt-radio class="left" title="选项" v-model="choice" :options="choiceOptions">
        </mt-radio>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '微积分A卷',
                stem: '',
                choice: '',
                choiceOptions: [{
                        label: 'A.' + this.$store.state.s_choiceQuestionContent.choiceA,
                        value: '1',
                    },
                    {
                        label: 'B.' + this.$store.state.s_choiceQuestionContent.choiceB,
                        value: '2'
                    },
                    {
                        label: 'C.' + this.$store.state.s_choiceQuestionContent.choiceC,
                        value: '3'
                    },
                    {
                        label: 'D.' + this.$store.state.s_choiceQuestionContent.choiceD,
                        value: '4'
                    }
                ],
            }
        },
        methods: {
            goToLink() {
                this.$router.push('/student/paperCompletion')
            },
        },
        computed: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
