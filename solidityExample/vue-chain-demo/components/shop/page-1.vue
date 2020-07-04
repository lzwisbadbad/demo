<template>
    <a-carousel autoplay class="mtem card layout1200">
        <div><img :src="bannerPath" alt=""></div>
    </a-carousel>
</template>

<script>
    export default {
        name: 'page-1',
        data(){
            return{
                bannerPath:localStorage.getItem('Language')=='zh_CN'?require('~/assets/img/banner.png'):require('~/assets/img/banner_1.png')
            }
        },
        computed: {
			locale() {
				return this.$store.state.locale;
			}
		},
		watch: {
			locale: function(a, b) {
                if(a=='en'){
                    this.bannerPath = require('~/assets/img/banner_1.png')
                }else{
                    this.bannerPath = require('~/assets/img/banner.png')
                }
			}
		},

        
    }
</script>

<style scoped>
    .ant-carousel >>>.slick-slide {
        text-align: center;
        height: 225px;
        line-height: 225px;
        overflow: hidden;
    }
</style>
