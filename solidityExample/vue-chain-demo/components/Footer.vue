<template>
    <div class="footer-component ">
        <a-row class="copy-right  tleft flex big16">
            <a-col>
                Copyright © 2020 demo.bcbchain.io
            </a-col>
            <!-- <a-col class="tright flex_1">
                捐赠: <a href="https://www.bcbscan.io/address/bcbt5rzgE1tSJbJuegEj4vbAkotmwRkxwiSyV" target="_blank"
                class="blue-color">bcbt5rzgE1tSJbJuegEj4vbAkotmwRkxwiSyV</a>
            </a-col> -->
        </a-row>
    </div>
</template>
<script>
export default {
    name: 'c-footer'
}
</script>
<style lang="less">
.ant-layout {
    background-color: transparent;
}
.footer-component {
    background: #333;
    padding: 20px 0px;
    .ant-col {
        color: #f6f7fb;
        width: 1200px;
        margin: 0 auto;
    }
}
</style>
