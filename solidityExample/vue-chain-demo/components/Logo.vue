<template>
    <nuxt-link to="/shop" class="logo-comp flex  acenter ">
        <img src="../assets/img/logo.png" alt="" width="41" height="41">
        <p class="big20" style="margin: 0 0 0 16px">{{$t('menu.title')}}</p>
    </nuxt-link>

</template>
<script>
    export default {
        name: 'logo',
        computed: {
            brandinfo() {
                return this.$store.state.brandinfo
            }
        }
    }
</script>
<style lang="less">
    .logo-comp{
        font-size: 35px;
        color: #fff;
        height: 80px;
        padding-right: 40px;
    }
</style>
