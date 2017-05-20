<template>
    <div>
        <mt-header title="整体情况">
            <router-link v-on:click.native="goBack()" to="" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <label class="block-title">选择题（5/20）</label>
        <mt-cell title="栈和队列的共同特点是" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <mt-cell title="用链接方式存储的队列，在进行插入运算时" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="以下数据结构中哪一个是非线性结构？" is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="设有一个二维数组A[m][n]，假设..." is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="树最适合用来表示" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <label class="block-title">填空题（10/20）</label>
        <mt-cell title="二叉树的第k层的结点数最多为" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <mt-cell title="若有18个元素的有序表存放在一维数..." is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="对n个记录的文件进行快速排序，所..." is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="对于线性表（7，34，55，25，64..." is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="设有6个结点的无向图，该图至少..." is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <mt-cell title="通常从四个方面评价算法的质量" is-link class="left" to="//github.com">
            <mt-badge type="error">未完成</mt-badge>
        </mt-cell>
        <mt-cell title="一个算法的时间复杂度为(n3+n4..." is-link class="left" to="//github.com">
            <mt-badge type="success">已完成</mt-badge>
        </mt-cell>
        <mt-cell title="假定一棵树的广义表表示为A（C..." is-link class="left" to="//github.com">
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
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
