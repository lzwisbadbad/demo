<template>
    <div class="sub-header">
        <div class="mobile-header flex acenter">
            <div class="sidebar_div flex_1">
                <logo></logo>
            </div>
            <div class="user-center">
                <a-button
                    class="menu-btn"
                    @click="show_dia_menu = true"
                ></a-button>
            </div>
        </div>
        <div class="sub-header-component flex acenter">
            <div class="sidebar_div flex acenter">
                <logo></logo>

            </div>
            <div class="flex_1 main-div">
                <dl class="el-menu">
                    <dd class="el-menu-item">
                        <nuxt-link
                            to="/shop"
                            class="title-wrapper opacity"
                        >{{$t('menu.tab1')}}</nuxt-link>
                    </dd>
                    <dd class="el-menu-item">
                        <nuxt-link
                            to="/pets"
                            class="title-wrapper opacity"
                        >{{$t('menu.tab2')}}</nuxt-link>
                    </dd>
                    <dd class="el-menu-item">
                        <nuxt-link
                            to="/helper"
                            class="title-wrapper opacity"
                        >{{$t('menu.tab3')}}</nuxt-link>
                    </dd>
                </dl>
            </div>
            <div class="user-center">
                <a
                    class="login-btn"
                    v-if="!address"
                    @click="$wallet.isLogin"
                >
                    <a-icon type="user"></a-icon>
                    {{$t('menu.denglu')}}
                </a>
                <span
                    class="user-info"
                    v-else
                >
                    <svg-icon icon-class="用户"></svg-icon> {{$t('menu.account')}}：{{address | address}}
                </span>
                <span
                    class="user-info"
                    v-show="address"
                    @click="show"
                    style="cursor:pointer"
                >
                    {{$t('menu.loginOut')}}
                </span>
                <language class="language-outer"></language>
            </div>
        </div>
        <div>
            <a-modal
                v-model="visible"
                :title="$t('menu.loginOut')"
                @ok="handleOk"
                :footerStyle="{}"
                centered
                :closable="false"
            >
                <p class="big22 font-main-color tcenter">{{$t('menu.loginOutTip')}}</p>
            </a-modal>
        </div>
    </div>

</template>
<script>
import language from '~/components/footer/language.vue'
import Logo from '~/components/Logo.vue'

export default {
    props: ['layouts'],
    data() {
        return {
            showmenu: false,
            show_dia_menu: false,
            gameType: 1,
            visible: false,
            newAddress: null
        }
    },
    components: {
        language,
        Logo
    },
    computed: {
        address() {
            return this.$store.state.Authorization
        }
    },
    watch:{
        $route(to,from){
            this.$wallet.isLogin()
        }
    },
    created() {
        this.refreshWallet()
        // 钱包登录或者退出时监听事件
        this.$bus.$on('wallet-accound-change', () => {
            this.refreshWallet()
        })
    },
    methods: {
        refreshWallet() {
            let wallet = this.$wallet.selectedAccount()
            if (wallet) {
                // 更新钱包信息
                this.$store.dispatch('updateWallet')
            }
        },
        show() {
            this.visible = !this.visible
        },
        handleOk() {
            this.$store.commit('SET_USER', '')
            this.visible = false
        }
    }
}
</script>
<style lang="less" scoped>
@import '~@/assets/css/var.less';

.mobile-header {
    background: #f3974d;
    display: none;
}

.sub-header {
    width: 100%;
    background: #f3974d;
}

.sub-header-component {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    // padding: 0 360px;

    .logo {
        height: 28px;
        margin: 0 40px 0 0;
    }

    .txt-button {
        border: 0;
        background: transparent;
        color: #fff;
    }

    .user-center {
        color: #fff;

        .svg-icon {
            vertical-align: -1px;
            margin-right: 5px;
            color: #fff;
        }
    }

    .login-btn {
        color: #fff;
        height: 34px;
        border: 0;
        font-size: 16px;
    }

    .language-outer {
        margin-left: 20px;
    }

    .main-div {
        position: relative;
        height: 80px;

        .el-menu {
            position: relative;
            z-index: 2;
            display: block;
            border: 0;
            line-height: 80px;
            background: transparent;
            color: #fff;
            font-size: 16px;
            margin: 0;
            height: 80px;

            .el-menu-item {
                display: inline-block;
                white-space: nowrap;
                position: relative;
                margin: 0;
                padding: 0 15px;

                .nuxt-link-active {
                    opacity: 1;
                }

                .nuxt-link-exact-active {
                    opacity: 1;
                }

                .title-wrapper {
                    color: #fff;
                }

                .title-wrapper {
                    cursor: pointer;
                }

                .nuxt-link-active {
                    font-weight: 700;
                }
            }
        }
    }

    .opacity {
        opacity: 0.5;
    }
    .btn {
    }
    .cancleBtn {
    }
    .confirmBtn {
    }
}
</style>
