<template>
    <div class="buy-page-1-component">
        <div class="layout1200 list  font-main-color">
            <a-form
                :form="form"
                @submit="handleSubmit"
            >
                <a-form-item
                    :label="$t('t002')"
                    :label-col="{ span:3 }"
                    :wrapper-col="{ span: 12 }"
                >
                    <span class="span big18 font-main-color">1 bcbt≈ 1000Demo</span>
                </a-form-item>
                <a-form-item
                    :label="$t('t003')"
                    :label-col="{ span: 3 }"
                    :wrapper-col="{ span: 12 }"
                >
                    <a-radio-group v-decorator="['radio', { rules: [{ required: true, message: $t('t004') }] }]">
                        <a-radio value="1">
                            1 bcbt
                        </a-radio>
                        <a-radio value="5">
                            5 bcbt
                        </a-radio>
                        <a-radio value="10">
                            10 bcbt
                        </a-radio>
                        <a-radio value="50">
                            50 bcbt
                        </a-radio>
                        <a-radio value="100">
                            100 bcbt
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item>

                    <a-button
                        type="primary"
                        html-type="submit"
                        :loading="loading"
                        class="aloneBtn"
                    >
                        {{$t('t005')}}
                    </a-button>
                    <div class="row">
                        {{$t('t006')}}&ensp;<a
                            class="blue-color"
                            href="https://github.com/bcbwallet/bcbconnect/releases"
                            target="_blank"
                        >{{$t('t007')}}</a>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'buy-page-1',
    data() {
        return {
            form: this.$form.createForm(this),
            loading: false
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.loading = true
                    this.$wallet
                        .action({
                            note: 'ico Exchange',
                            gasLimit: '25000',
                            calls: [
                                {
                                    contract: 'bcbt3ScZC4SzPKEHZDYHe7Xsydu6PKoCxzV8g',
                                    method: 'Transfer(types.Address,bn.Number)',
                                    params: ['bcbtASRVRCir9W9iCGa6Bh7Eg9o9CzNYD4nj4', values.radio * 1e9]
                                },
                                {
                                    contract: 'bcbtLPy7Bu1mWUhYs6DWHsgojTt5F5MauhVag',
                                    method: 'Exchange()',
                                    params: []
                                }
                            ]
                        })
                        .then(hash => {
                            this.loading = false
                            console.log(hash)
                            if (hash) {
                                this.icon() 
                            }
                        })
                        .catch(() => {
                            this.$message.error(this.$t('t000'))
                            this.loading = false
                        })
                }
            })
        },
        icon() {
            this.$wallet
                .action({
                    note: 'ico Withdraw',
                    gasLimit: '25000',
                    calls: [
                        {
                            contract: 'bcbtLPy7Bu1mWUhYs6DWHsgojTt5F5MauhVag',
                            method: 'Withdraw()',
                            params: []
                        }
                    ]
                })
                .then(hash => {
                    if(hash){
                        this.$message.success(this.$t('t008'))
                    } 
                })
        }
    }
}
</script>
<style lang="less">
@import '~@/assets/css/webkit.less';

.buy-page-1-component {
    max-height: 323px;

    .ant-form label {
        font-size: 18px !important;
    }

    .ant-form-item {
        margin-bottom: 20px;
    }

    .ant-radio-checked .ant-radio-inner {
        border-color: #f3974d;
    }

    .ant-radio-inner::after {
        background-color: #f3974d;
    }

    .ant-radio-wrapper:hover .ant-radio,
    .ant-radio:hover .ant-radio-inner,
    .ant-radio-input:focus + .ant-radio-inner {
        border-color: #f3974d;
    }

    .aloneBtn {
        width: 372px;
        height: 41px;
    }

    .ant-btn-primary {
        background: #f3974d;
        border-color: #f3974d;
        font-size: 18px;
        color: #ffffff;
    }
    .ant-radio {
        vertical-align: middle;
    }
}
</style>
