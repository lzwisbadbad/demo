<template>
    <section class="help-page card layout1200 h100vh">
        <a-tabs default-active-key="page2" @change="callback">
            <a-tab-pane key="page1" :tab="$t('helper.getbcbt')">
            </a-tab-pane>
            <a-tab-pane key="page2" :tab="$t('helper.getdemo')">
            </a-tab-pane>
            <a-tab-pane key="page3" :tab="$t('helper.sendToken')" disabled>
            </a-tab-pane>
        </a-tabs>
        <component :is="activePage"></component>
    </section>
</template>

<script>
    import page1 from '~/components/helper/page-1.vue'
    import page2 from '~/components/helper/page-2.vue'
    import page3 from '~/components/helper/page-3.vue'

    export default {
        name: 'helper' ,
        data() {
            return {
                activePage: 'page2'
            }
        } ,
        components: {
            page1 , page2 , page3
        } , methods: {
            callback(val) {
                console.log(val)
                this.activePage = val
            }
        }
    }
</script>

<style scoped lang="less">
    .help-page {
        height: 323px;
        padding:0 40px;
        /deep/ .ant-tabs-nav .ant-tabs-tab-active {
            color: #F3974D !important;
        }
        /deep/ .ant-tabs-ink-bar {
            background: #F3974D !important;
        }
        /deep/ .ant-tabs-nav .ant-tabs-tab:hover{
            color:rgba(0, 0, 0, 0.65);
        }

    }
</style>
