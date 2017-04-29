<template>
    <div>
        <mt-header title="试卷信息">
            <router-link to="/student/doQuestion/doCQ" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <label class="block-title">选择题（5/20）</label>
        <mt-cell title="题目内容" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="题目内容" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <label class="block-title">填空题（10/20）</label>
        <mt-cell title="题目内容" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="题目内容" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <mt-cell title="题目内容" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="题目内容" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <label class="block-title">简答题（5/20）</label>
        <mt-cell title="题目内容" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="标题文字" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="题目内容" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <mt-button type="primary" size="large" class="bottomBtn" @click.native="confirmCreation()">确认交卷</mt-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                paperDesc: '',
                paperTitle: '',
            }
        },
        methods: {
            confirmCreation() {
                let _this = this
                _this.$http.post('/publish', {
                    paperId: _this.$route.params.paperId,
                    courseId: _this.$store.state.s_publishInfo.courseId,
                    lessonId: _this.$store.state.s_publishInfo.lessonId,
                })
                _this.$messagebox.confirm('确定执行此操作').then(action => {
                    _this.$toast({
                        message: '操作成功',
                        iconClass: 'mintui-success mintui',
                        duration: 1000,
                    });
                    setTimeout(() => {
                        // _this.$router.push('/')
                    }, 1000);
                }, action => {
                    console.log(_this);
                });
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
