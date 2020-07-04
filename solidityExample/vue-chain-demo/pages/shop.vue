<template>
    <section class="h100vh">
        <page1></page1>
        <page2></page2>

    </section>
</template>

<script>
    import page1 from '~/components/shop/page-1.vue'
    import page2 from '~/components/shop/page-2.vue'


    export default {
        name: 'shop' ,
        components: {
            page1 , page2
        }
    }
</script>

<style scoped>

</style>
