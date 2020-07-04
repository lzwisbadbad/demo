<template>
    <div class="pets layout1200 font-main-color big16 h100vh">
        <section class="card pad2824">
            <div class="flex jbetween">
                <p class="big26">{{$t('mine.center')}}</p>
                <a-button
                    type="primary"
                    @click="getMoneyVal"
                >
                    {{$t('mine.getMsg')}}
                </a-button>
            </div>
            <a-table
                :columns="personal"
                :dataSource="personalData"
                :bordered="true"
                :pagination="false"
                class="big16"
                :loading="personaLoading"
            ></a-table>
        </section>
        <section class="card pad2824 mtem">
            <div class="flex jbetween">
                <p class="big26">{{$t('mine.myPet')}}</p>
                <a-button
                    type="primary"
                    @click="getPets"
                >
                   {{$t('mine.getPetMsg')}}
                </a-button>
            </div>

            <a-table
                :columns="pets"
                :dataSource="petsDataList"
                :bordered="true"
                class="big16"
                :loading="petsLoading"
            >
                <template
                    slot="operation"
                    slot-scope="text, record"
                >
                    <a-popconfirm
                        v-if="petsDataList.length"
                        :title="$t('mine.saleSure')"
                        @confirm="() => onDelete(record.key)"
                    >
                        <a
                            href="javascript:;"
                            class="blue-color"
                        >{{$t('mine.sale')}}</a>
                    </a-popconfirm>
                </template>
                <template
                    slot="index"
                    slot-scope="text, record,index"
                >
                    <span>{{index+1}}</span>
                </template>
                <template
                    slot="name"
                    slot-scope="text, record,index"
                >
                 <!-- v-if="record.editable" -->
                    <a-input
                        :value="record.name"
                        :disabled='!record.editable'
                        class="w40"
                        @change="e => handleChange(e.target.value, record.key,'name')"
                    />
                    <span v-if="record.editable">
                        <a
                            class="blue-color"
                            @click="() => save(record.key)"
                        >{{$t('mine.save')}}</a>
                    </span>
                    <span v-else>
                        <a
                            class="blue-color"
                            :disabled="editingKey !== ''"
                            @click="() => edit(record.key)"
                        >{{$t('mine.edit')}}</a>
                    </span>

                </template>
            </a-table>
        </section>
        <section class="card pad2824 mtem saleRecord">
            <div class="flex jbetween">
                <p class="big26">{{$t('mine.viewRecords')}}</p>
                <a-button
                    type="primary"
                    @click="getSalePets"
                >
                    {{$t('mine.getRecords')}}
                </a-button>
            </div>
            <a-table
                :columns="sel"
                :dataSource="selData"
                :bordered="true"
                class="big16"
                :loading="selDataLoading"
            >
                <template
                    slot="href"
                    slot-scope="text, record"
                >
                    <a
                        :href="`https://titan.bcbscan.io/tx/${record.string}`"
                        target="_blank"
                        class="blue-color"
                    >{{record.string}}
                    </a>
                    <a
                        class="blue-color"
                        type="primary"
                        @click="copyLink(record.string)"
                    >
                        {{$t('shop.copy')}}
                    </a>

                </template>
            </a-table>
        </section>
    </div>
</template>

<script>
export default {
    name: 'pets',
    data() {
        return {
            index: 0,
            personaLoading: false,
            petsLoading: false,
            selDataLoading: false,
            saleloading: false,
            listllength: null,
            initList: 0,
            nowValue: null,
            eduit: false,
            mockData: {},
            editingKey: '',
            personal: [
                {
                    title: this.$t('mine.address'),
                    dataIndex: 'address',
                    width: 600,
                    align: 'center'
                },
                {
                    title: this.$t('mine.integral'),
                    dataIndex: 'string',
                    width: 600,
                    align: 'center'
                },
                {
                    title: this.$t('mine.demobalance'),
                    dataIndex: 'demoBlance',
                    width: 600,
                    align: 'center'
                }
            ],
            personalData: [],
            pets: [
                {
                    title: this.$t('mine.No'),
                    dataIndex: 'index',
                    align: 'center',
                    width: '20%',
                    scopedSlots: { customRender: 'index' }
                },
                {
                    title: this.$t('mine.petType'),
                    dataIndex: 'type',
                    align: 'center',
                    width: '20%'
                },
                {
                    title:  this.$t('mine.petName'),
                    dataIndex: 'name',
                    align: 'center',
                    width: '20%',
                    ellipsis: true,
                    scopedSlots: { customRender: 'name' }
                },
                {
                    title:  this.$t('mine.value'),
                    dataIndex: 'point',
                    align: 'center',
                    width: '20%'
                },
                {
                    width: '20%',
                    title:  this.$t('mine.handle'),
                    dataIndex: 'operation',
                    align: 'center',
                    scopedSlots: { customRender: 'operation' }
                }
            ],
            petsDataList: [],
            cacheData: [],
            sel: [
                {
                    key: '1',
                    title: this.$t('mine.No'),
                    dataIndex: 'index',
                    align: 'center',
                    width: '50'
                },
                {
                    key: '12',
                    title: this.$t('mine.time'),
                    dataIndex: 'time',
                    align: 'center',
                    width: '10%'
                },
                {
                    key: '3',
                    title: this.$t('mine.hash'),
                    dataIndex: 'string',
                    align: 'center',
                    width: '60%',
                    ellipsis: true,
                    scopedSlots: { customRender: 'href' }
                },
                {
                    key: '4',
                    title: this.$t('mine.salePet'),
                    dataIndex: 'type',
                    align: 'center',
                    width: '10%'
                },
                {
                    key: '15',
                    width: '10%',
                    title: this.$t('mine.getintegral'),
                    dataIndex: 'point',
                    align: 'center',
                    scopedSlots: { customRender: 'operation' }
                }
            ],
            selData: []
        }
    },
    created() {
        // this.getMoneyVal()
        //链机制问题只能一次请求一次链
    },
    computed: {
        address() {
            return this.$store.state.Authorization
        },
        locale() {
            return this.$store.state.locale;
        }
    },
    watch: {
        locale: function(a, b) {
            this.$router.go(0);
        }
    },
    methods: {
        onDelete(val) {
            this.petsLoading = true
            this.petsDataList.find((item, index) => {
                if (item.key == val) {
                    item.sale = false
                }
                return item
            })

            this.getDel(val)
        },
        //获取删除的交易hash
        getDel(val) {
            if ($wallet.isLogin()) {
                this.$wallet
                    .action({
                        note: 'sale pet',
                        gasLimit: '25000000',
                        calls: [
                            {
                                type: 'bvm',
                                contract: 'bcbtLkLPRwqpizvg9Q1Ui9P5ShGAd1RkJmznQ',
                                method: 'Sale(uint)',
                                params: [val]
                            }
                        ]
                    })
                    .then(hash => {
                        if (hash) {
                            this.getList(hash, 'sale')
                        }
                    })
                    .catch(e => {
                        this.petsLoading = false
                    })
            }
        },
        //获取钱包积分
        getMoneyVal() {
            this.personaLoading = true
            if ($wallet.isLogin()) {
                this.$wallet
                    .action({
                        note: "get player's point",
                        gasLimit: '250000',
                        calls: [
                            {
                                type: 'bvm',
                                contract: 'bcbtLkLPRwqpizvg9Q1Ui9P5ShGAd1RkJmznQ',
                                method: 'GetPlayerPoint()',
                                params: []
                            }
                        ]
                    })
                    .then(hash => {
                        console.log('查询hash', hash)
                        if (hash) {
                            this.getList(hash, 'money')
                            // this.getPets()
                        }
                    })
                    .catch(e => {
                        this.personaLoading = false
                        // this.getPets()
                    })
            }
        },
        //获取
        getList(val, type) {
            this.$axios
                .$get(`/tx?hash="${val}"`)
                .then(data => {
                    if (data) {
                        let dataObj
                        if (type === 'money') {
                            this.personalData = []
                            dataObj = Object.assign(
                                {},
                                {
                                    key: '120',
                                    address: this.address,
                                    string: JSON.parse(data && data.deliver_tx.data)[0]
                                }
                            )
                            this.getDemo(dataObj)
                        } else if (type === 'pets') {
                            this.petsDataList = (JSON.parse(data && data.deliver_tx.data)[0] || [])
                                .map((item, index) => {
                                    return {
                                        key: item && item.PetID,
                                        index: index + 1,
                                        name: item && item.Name,
                                        point: item && item.Point,
                                        type: item && item.Type,
                                        sale: item && item.IsSaled
                                    }
                                })
                                .filter(item => {
                                    return !item.sale
                                })
                            this.cacheData = this.petsDataList
                            this.petsLoading = false
                        } else if (type === 'sale') {
                            data && data.check_tx.code == 200 ? (this.getMoneyVal(), this.$message.success(this.$t('mine.saleSuccess'))) : ((this.petsLoading = false), this.$message.error(this.$t("mine.saleFailed")))
                            this.petsLoading = false
                        } else if (type === 'save') {
                            console.log(data)
                        } else {
                            ;(JSON.parse(data && data.deliver_tx.data)[0] || []).map((item, index) => {
                                this.getHashAddress(item, index)
                            })
                            this.listllength = (JSON.parse(data && data.deliver_tx.data)[0] || []).length
                        }
                    }
                })
                .catch(() => {
                    this.personaLoading = false
                    this.petsLoading = false
                })
        },
        // 获取demo币余额
        getDemo(dataObj){
            this.$axios
                .$get(`/abci_query?path="/account/ex/${this.address}/token/bcbtJ4zVVdGeVNNhBNYRNzoYAvDyyZdtwcDXS"`)
                .then(data => {
                    if(data){
                        let demo = window.atob(data.response.value)
                        dataObj.demoBlance = (JSON.parse(demo).balance)/1e9
                        this.personalData.push(dataObj)
                        this.personaLoading = false
                    }
                })
                .catch(() => {
                })
        },
        //获取宠物列表
        getPets() {
            this.petsLoading = true
            if ($wallet.isLogin()) {
                this.$wallet
                    .action({
                        note: "get player's pet message",
                        gasLimit: '25000000000',
                        calls: [
                            {
                                type: 'bvm',
                                contract: 'bcbtLkLPRwqpizvg9Q1Ui9P5ShGAd1RkJmznQ',
                                method: 'GetPlayerPets()',
                                params: []
                            }
                        ]
                    })
                    .then(hash => {
                        if (hash) {
                            this.getList(hash, 'pets')
                        }
                    })
                    .catch(e => {
                        this.petsLoading = false
                    })
            }
        },
        //获取出售记录
        getSalePets() {
            this.selDataLoading = true
            if ($wallet.isLogin()) {
                this.$wallet
                    .action({
                        note: "get player's sale record",
                        gasLimit: '2500000000',
                        calls: [
                            {
                                type: 'bvm',
                                contract: 'bcbtLkLPRwqpizvg9Q1Ui9P5ShGAd1RkJmznQ',
                                method: 'GetSaleRecord()',
                                params: []
                            }
                        ]
                    })
                    .then(hash => {
                        if (hash) {
                            this.selData=[]
                            this.getList(hash, 'salePets')
                        }
                    })
                    .catch(e => {
                        this.selDataLoading = false
                    })
            }
        },
        //更改名字
        handleChange(value, key, name) {
            const newData = [...this.petsDataList]
            const target = newData.filter(item => key === item.key)[0]
            if (target) {
                target[name] = value
                this.petsDataList = newData
            }
            this.nowValue = value
        },
        edit(key) {
            const newData = [...this.petsDataList]
            const target = newData.filter(item => key === item.key)[0]
            this.editingKey = key
            if (target) {
                target.editable = true
                this.petsDataList = newData
            }
        },
        save(key) {
            const newData = [...this.petsDataList]
            const newCacheData = [...this.cacheData]
            const target = newData.filter(item => key === item.key)[0]
            const targetCache = newCacheData.filter(item => key === item.key)[0]
            if (target && targetCache) {
                delete target.editable
                this.petsDataList = newData
                Object.assign(targetCache, target)
                this.petsDataList = newCacheData
            }
            this.editingKey = ''
            //请求接口
            this.getNewList(key, this.nowValue)
        },
        //保存编辑
        getNewList(key, val) {
            if(!val){
                this.$message.success(this.$t('mine.savetip'))
                return
            }
            console.log(typeof String(val), val, 'val', typeof String(key), 'key', key)
            if ($wallet.isLogin()) {
                this.$wallet
                    .action({
                        note: "change pet's name",
                        gasLimit: '250000',
                        calls: [
                            {
                                type: 'bvm',
                                contract: 'bcbtLkLPRwqpizvg9Q1Ui9P5ShGAd1RkJmznQ',
                                method: 'ChangePetName(string,uint)',
                                params: [String(val),String(key)]
                            }
                        ]
                    })
                    .then(hash => {
                        if (hash) {
                            this.$message.success(this.$t('mine.editSuccess'))
                            console.log(hash)
                            // this.getList(hash , 'save')
                        }
                    })
                    .catch(e => {})
            }
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
        },
        //根据高度获取hash
        getHashAddress(item, index) {
            // this.mockData={};
            this.$axios
                .$get(`/block_results?height=${item.Height}`)
                .then(data => {
                    this.mockData = Object.assign(
                        {},
                        {
                            key: index,
                            index: index + 1,
                            string: data && (data.results.DeliverTx[0].tx_hash || ''),
                            type: item.Type,
                            time: item.Time,
                            point: item.Point
                        }
                    )
                    this.selData.push(this.mockData)
                    this.initList++
                    this.initList >= this.listllength ? (this.selDataLoading = false) : (this.selDataLoading = true)
                    this.indexSort()
                })
                .catch(() => {
                    this.selDataLoading = false
                })
        },
        //sort index
        indexSort() {
            this.selData.sort((a, b) => {
                return b.index - a.index
            })
        }
    }
}
</script>

<style scoped>
.saleRecord{
    margin-bottom: 20px;
}
</style>
