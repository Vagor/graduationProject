<template>
    <div>
        <mt-header :title="title">
            <router-link to="" slot="left">
                <mt-button icon="back" @click.native="goBackPage()">返回</mt-button>
                <mt-button v-show="isEditMode" @click.native="exitEditMode()">取消修改</mt-button>
            </router-link>
            <mt-button icon="more" slot="right" @click.native="showActionSheet()"></mt-button>
        </mt-header>
        <label class="block-title">题目内容</label>
        <mt-field class="left" label="题干" placeholder="请输入题干……" type="textarea" rows="4" v-model="stem" :value="this.stem" :readonly="!isEditMode"></mt-field>
        <label class="block-title">正确答案</label>
        <mt-field class="left" label="正确答案" placeholder="请输入答案" type="textarea" rows="4" v-model="answer" :readonly="!isEditMode"></mt-field>
        <label class="block-title">其他信息</label>
        <mt-field class="left" label="题目所属章节" placeholder="请输入章节数" type="number" v-model="chapter" :value="this.chapter" :readonly="!isEditMode"></mt-field>
        <mt-button v-show="isEditMode" type="primary" size="large" class="bottomBtn" @click.native="updateSAQQuestion()">确认修改</mt-button>
        <mt-actionsheet :actions="sheetActions" v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<script>
    export default {
        name: 'viewSAQQuestion',
        data() {
            this.$router.replace("/questionBank4selectedQuestion")
            return {}
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
