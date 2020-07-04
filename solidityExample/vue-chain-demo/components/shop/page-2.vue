<template>
    <div class="shop">
        <section
            class="layout1200 card"
            style="padding: 28px 100px;"
        >
            <a-row>
                <a-col
                    :span="12"
                    class="tcenter"
                >
                    <div class="imgWrap">
                        <img
                            :src="changeBg()"
                            alt=""
                            class="imgborder"
                        >
                        <span v-if="loading"></span>
                    </div>
                    <div class="buttonWrap">
                        <a-button
                            type="primary"
                            size="large"
                            :loading="loading"
                            block
                            @click="start"
                            class="big18"
                        >{{$t('shop.luckDraw')}}
                        </a-button>
                    </div>
                </a-col>
                <a-col
                    :span="12"
                    class="font-main-color"
                >
                    <p class="big24">{{$t("shop.rlue")}}：</p>
                    <p class="big16">{{$t("shop.rlue1")}}</p>
                    <div
                        class="big14"
                        style="margin-bottom: 10px"
                    >
                        <a-table
                            :columns="columns"
                            :dataSource="dataArray"
                            :bordered="true"
                            :pagination="false"
                        ></a-table>
                    </div>
                    <p class="big16">{{$t("shop.rlue2")}}</p>
                    <p class="big16">{{$t("shop.rlue3")}}</p>
                    <p class="big16">{{$t("shop.rlue4")}}</p>

                </a-col>

                <!--            <a-col :span="8">-->
                <!--                <a class="blue-color big22 tright">我的宠物仓库</a>-->
                <!--            </a-col>-->
            </a-row>
        </section>
        <section class="card layout1200 mtem">
            <div class="tabelList">
                <div class="flex">
                    <p class="big26 flex_1">{{$t("shop.record")}}</p>
                    <!-- <a-button
                        type="primary"
                        @click="getPetList"
                    >
                        获取抽奖记录
                    </a-button> -->
                    <!--                    <p class="flex_1 tright">-->
                    <!--                        <a-button type="primary" @click="getPetList">刷新</a-button>-->
                    <!--                    </p>-->
                </div>
                <a-table
                    :columns="columns2"
                    :dataSource="dataList"
                    :bordered="true"
                    :loading="loading2"
                >
                    <template
                        slot="href"
                        slot-scope="text, record"
                    >
                        <a
                            :href="`https://titan.bcbscan.io/tx/${record.percent}`"
                            target="_blank"
                            class="blue-color"
                        >{{record.percent}}
                        </a>
                        <a
                            class="blue-color"
                            type="primary"
                            @click="copyLink(record.percent)"
                        >
                            {{$t('shop.copy')}}
                        </a>

                    </template>
                </a-table>
            </div>
        </section>

    </div>
</template>

<script>
export default {
    name: 'page-2',
    data() {
        return {
            loading2: false,
            listllength: null,
            initList: 0,
            startGetPet: false,
            imgname: 'wawa',
            imgs: [],
            imgen: [
                { name: 'monkey', src: require('../../assets/img/monkey_1.png') },
                { name: 'wawa', src: require('../../assets/img/wawa.png') },
                { name: 'panda', src: require('../../assets/img/panter_1.png') },
                { name: 'dog', src: require('../../assets/img/dog_1.png') },
                { name: 'cat', src: require('../../assets/img/cat_1.png') }
            ],
            imgzh: [
                { name: 'monkey', src: require('../../assets/img/monkey.png') },
                { name: 'wawa', src: require('../../assets/img/wawa.png') },
                { name: 'panda', src: require('../../assets/img/panter.png') },
                { name: 'dog', src: require('../../assets/img/dog.png') },
                { name: 'cat', src: require('../../assets/img/cat.png') }
            ],
            columns: [
                {
                    title: this.$t("shop.PetType"),
                    dataIndex: 'type',
                    width: 100,
                    align: 'center'
                },
                {
                    title: this.$t("shop.ratio"),
                    dataIndex: 'percent',
                    width: 100,
                    align: 'center'
                },
                {
                    title: this.$t("shop.integral"),
                    dataIndex: 'percent2',
                    width: 100,
                    align: 'center'
                }
            ],
            columns2: [
                {
                    title: this.$t("shop.No"),
                    dataIndex: 'index',
                    width: 50,
                    align: 'center'
                },
                // {
                //     title: '时间' ,
                //     dataIndex: 'time' ,
                //     width: 100 ,
                //     align: 'center'
                // } ,
                {
                    title: this.$t("shop.hash"),
                    dataIndex: 'percent',
                    width: 400,
                    align: 'center',
                    ellipsis: true,
                    scopedSlots: { customRender: 'href' }
                },
                {
                    title: this.$t("shop.result"),
                    dataIndex: 'type',
                    width: 50,
                    align: 'center'
                }
            ],
            dataArray: [
                {
                    key: '1',
                    type: this.$t("shop.cat"),
                    percent: '20',
                    percent2: '20'
                },
                {
                    key: '2',
                    type: this.$t("shop.dog"),
                    percent: '10',
                    percent2: '40'
                },
                {
                    key: '3',
                    type: this.$t("shop.monkey"),
                    percent: '4',
                    percent2: '100'
                },
                {
                    key: '4',
                    type: this.$t("shop.panda"),
                    percent: '2',
                    percent2: '200'
                }
            ],
            dataList: JSON.parse(localStorage.getItem('list')) || [],
            loading: false,
            mockData: {
                index: 0,
                time: '',
                percent: '',
                type: ''
            }
        }
    },
    computed: {
        locale() {
            return this.$store.state.locale;
        }
    },
    watch: {
        locale: function(a, b) {
            this.$router.go(0);
            if(a=='en'){
                this.imgs = this.imgen
            }else{
                this.imgs = this.imgzh
            }
        }
    },
    created(){
        if(localStorage.getItem('Language')=='zh_CN'){
            this.imgs = this.imgzh
        }else{
             this.imgs = this.imgen
        }
        
    },
    methods: {
        //返回交易hash 抽奖
        start() {
            if ($wallet.isLogin()) {
                this.loading = true
                if (this.startGetPet) {
                    this.imgname = 'wawa'
                }
                this.$wallet
                    .action({
                        note: 'catch pet',
                        gasLimit: '25000',
                        calls: [
                            {
                                contract: 'bcbtJ4zVVdGeVNNhBNYRNzoYAvDyyZdtwcDXS',
                                method: 'Transfer(types.Address,bn.Number)',
                                params: ['bcbtLkLPRwqpizvg9Q1Ui9P5ShGAd1RkJmznQ', '50000000000']
                            },
                            {
                                type: 'bvm',
                                contract: 'bcbtLkLPRwqpizvg9Q1Ui9P5ShGAd1RkJmznQ',
                                method: 'Catch()',
                                params: []
                            }
                        ]
                    })
                    .then(hash => {
                        console.log('抽奖hash:', hash)
                        this.loading = false
                        if (hash) {
                            this.getlist(hash, 'item')
                        }
                    })
                    .catch(e => {
                        console.log('异常')
                        this.loading = false
                    })
            }
        },
        //getlist 根据hash 然后获取data
        getlist(hash, type) {
            this.$axios
                .$get(`/tx?hash="${hash}"`)
                .then(data => {
                    type == 'list'
                        ? ((this.listllength = (JSON.parse(data.deliver_tx.data)[0] || []).length),
                          (JSON.parse(data.deliver_tx.data)[0] || []).map((item, ind) => {
                              this.getHashAddress(item, ind)
                              // this.getTime(item , ind)
                          }))
                        : ((this.imgname = JSON.parse(data.deliver_tx.data)[0] || []),
                          this.changeBg(),
                          (this.loading = false),
                          (this.startGetPet = true),
                          this.getHashAddress(
                              {
                                  Type: JSON.parse(data.deliver_tx.data)[0],
                                  Height: data.deliver_tx.height
                              },
                              this.dataList.length
                          ))
                })
                .catch(() => {
                    this.loading = false
                })
        },
        //获取抽奖记录
        getPetList() {
            this.clearAll() //避免重复数据
            this.loading2 = true
            this.$wallet
                .action({
                    note: "get player's catch record",
                    gasLimit: '2500000',
                    calls: [
                        {
                            type: 'bvm',
                            contract: 'bcbtLPy7Bu1mWUhYs6DWHsgojTt5F5MauhVag',
                            method: 'GetCatchRecord()',
                            params: []
                        }
                    ]
                })
                .then(hash => {
                    console.log('日志记录hash：', hash)
                    this.loading2 = false
                    if (hash) {
                        this.getlist(hash, 'list')
                    }
                })
                .catch(err => {
                    this.loading2 = false
                    console.log('获取抽奖记录异常：', err)
                })
        },
        changeBg() {
            let name = this.imgs.find(item => {
                return item.name === this.imgname ? item.src : ''
            })
            return name.src
        },
        //根据高度获取hash
        getHashAddress(item, index) {
            this.$axios
                .$get(`/block_results?height=${item.Height}`)
                .then(data => {
                    this.mockData = Object.assign(
                        {},
                        {
                            key: index,
                            index: index + 1,
                            percent: data && (data.results.DeliverTx[0].tx_hash || ''),
                            type: item.Type,
                            height: item.Height,
                            time: ''
                        }
                    )
                    this.dataList.push(this.mockData)
                    this.initList++
                    this.initList >= this.listllength ? ((this.loading2 = false), localStorage.setItem('list', JSON.stringify(this.dataList))) : (this.loading2 = true)
                    this.indexSort()
                })
                .catch(() => {
                    this.loading2 = false
                })
        },
        //sort index
        indexSort() {
            this.dataList.sort((a, b) => {
                return b.index - a.index
            })
        },
        //获取时间
        // getTime(item) {
        //     this.$axios.$get(`/block?height=${item.Height}`).then(data => {
        //         let time = data && data.block.header.time.substr(0 , 10)
        //         this.changeItmeTime(item.Height , time)
        //
        //     })
        // } ,
        // //赋值time
        // changeItmeTime(height , time) {
        //     for(let i=0;i<this.dataList.length; i++){
        //          if(this.dataList[i].height===height){
        //              for(let j in this.dataList[i]){
        //                  this.$set(this.dataList[i],'time',time)
        //              }
        //          }
        //     }
        //
        //
        //
        // } ,
        clearAll() {
            this.dataList = []
            this.initList = 0
            this.loading2 = true
        },
        //copy
        copyLink(value) {
            this.$copyText(value).then(
                res => {
                    this.$message.success(this.$t("shop.copySucceeded"))
                },
                err => {
                    this.$message.error(this.$t("shop.copyFailed"))
                }
            )
        }
    }
}
</script>

<style scoped lang="less">
.shop {
    .tabelList {
        width: 100%;
        padding: 28px 22px;
        margin: 50px auto;
    }

    .imgWrap {
        width: 408px;
        height: 435px;
        overflow: hidden;
        margin: 0px auto 20px auto;
        position: relative;

        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    span {
        position: absolute;
        box-sizing: border-box;
        background-image: url('../../assets/img/loading.png');
        display: block;
        width: 408px;
        height: 435px;
        line-height: 300px;
        top: 0px;
        z-index: 999;
    }

    .buttonWrap {
        width: 372px;
        height: 40px;
        margin: 0 auto;
        border-radius: 8px;

        .ant-btn-primary {
            background: #f3974d;
            border-color: #f3974d;
        }
    }

    .aloneStyle {
        padding: 50% 0 0 50%;
    }

    .tabelList {
    }
}
</style>
