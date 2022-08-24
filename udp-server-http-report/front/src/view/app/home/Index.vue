<template>
    <div>
        <div class="mouse-wheel-vertical-scroll">
            <div class="title">
                <div class="logo">
                    <img :src="logo_img" alt="logo">
                </div>
                <div class="name">伟明环保数据上报平台</div>
            </div>
            <div class="mouse-wheel-wrapper" ref="scroll">
                <Table border :columns="columns" :data="datalist" size="small" :loading="loading" class="tb" :max-height="tbHeight ? tbHeight : 0">
                    <template slot="flag" slot-scope="{ row }">
                        <div>{{row.flag == 'success' ? '成功' : row.flag == 'fail' ? '失败' : '未上报'}}</div>
                    </template>
                </Table>
            </div>
            <div class="pager">
                <Page size="small"
                      :total="total"
                      :current="page"
                      :page-size="num"
                      show-total
                      class="pg-content"
                      @on-change="pageChange"
                      :style="{'text-align': 'right'}"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapGetters, mapState } from 'vuex';

    import {
        Input,
        Button,
        DatePicker,
        Icon,
        Table,
        Page
    } from 'iview';

    Vue.component('Input', Input);
    Vue.component('Button', Button);
    Vue.component('DatePicker', DatePicker);
    Vue.component('Icon', Icon);
    Vue.component('Table', Table);
    Vue.component('Page', Page);

    export default {
        computed: {
            ...mapState([
                'host',
                'wsURL',
                'baseURL'
            ])
        },
        data() {
            return {
                loading: false,
                tbHeight: '',
                num: 15,
                total: 0,
                page: 1,
                logo_img: require('../../../assets/img/wm_logo.png'),
                datalist: [],
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '参数',
                        key: 'paramId',
                        ellipsis: true,
                        tooltip: true,
                        minWidth: 100
                    },
                    {
                        title: '变量名称',
                        key: 'tag',
                        ellipsis: true,
                        tooltip: true,
                        minWidth: 100
                    },
                    {
                        title: '值',
                        key: 'value',
                        minWidth: 60
                    },
                    {
                        title: '类型',
                        key: 'paramType',
                        minWidth: 60
                    },
                    {
                        title: '单位',
                        key: 'paramUnit',
                        minWidth: 60
                    },
                    {
                        title: '采集时间',
                        key: 'time',
                        minWidth: 60
                    },
                    {
                        title: '上报时间',
                        key: 'createdAt',
                        minWidth: 150
                    },
                    {
                        title: '状态',
                        slot: 'flag',
                        minWidth: 70
                    }
                ]
            }
        },
        methods:{
            pageChange(pageNumber=1) {
                let vm = this;
                vm.page = pageNumber;
                if(!vm.loading){
                    vm.loading = true;
                    vm.ajax({
                        method: 'get',
                        noauth: true,
                        params: {
                            pageSize: vm.num,
                            currentPage: vm.page
                        },
                        url: vm.baseURL + "/city/page",
                        success: (data) => {
                            vm.loading = false;
                            vm.datalist = data.list;
                            vm.total = data.count;
                        },
                        fail() {
                            vm.loading = false;
                        }
                    });
                }
            },
            calculateTableHeight() {
                let clientHeight = document.documentElement.clientHeight;
                this.tbHeight = clientHeight - 200;
            },
            websocket(){
                let vm = this;
                const log = console.log;
                // init
                const socket = io(vm.wsURL + '/', {
                    // 实际使用中可以在这里传递参数
                    query: {
                        room: 'room_avs',
                        userId: `client_${Math.random()}`,
                    },

                    transports: ['websocket']
                });

                socket.on('connect', () => {
                    const id = socket.id;
                    log('#connect,', id, socket);

                    // 监听自身 id 以实现 p2p 通讯
                    socket.on(id, msg => {
                        log('#receive,', msg);
                    });

                    socket.on('newcoming', msg => {
                        if(msg.type == 'success'){
                            vm.showMessage('上报成功', 'success');
                            vm.page = 1;
                            vm.pageChange();
                        }
                        else{
                            vm.showMessage('上报失败');
                            vm.page = 1;
                            vm.pageChange();
                        }
                        log('#newcoming,', msg);
                    });
                });

                // 接收在线用户信息
                socket.on('online', msg => {
                    log('#online,', msg);
                });

                // 系统事件
                socket.on('disconnect', msg => {
                    log('#disconnect', msg);
                });

                socket.on('disconnecting', () => {
                    log('#disconnecting');
                });

                socket.on('error', () => {
                    log('#error');
                });

                window.socket = socket;
            }
        },
        mounted() {
            this.calculateTableHeight();
            this.pageChange();
            this.websocket();
        }
    }
</script>
<style scoped lang="scss">
    @import '../../../assets/scss/base/mixins';
    @import '../../../assets/scss/base/placeholder';

    .mouse-wheel-vertical-scroll{
        height: 100%;
        box-sizing: border-box;
        & /deep/ .ivu-table-cell{
            padding-left: 8px;
            padding-right: 8px;
        }
        & .title{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            & .logo{
                height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                & img{
                    height: 35px;
                    display: block;
                }
            }
            & .name{
                margin-left: 15px;
                text-align: center;
                height: 100px;
                line-height: 100px;
                font-size: 30px;
            }
        }
        & .mouse-wheel-wrapper{
            height: calc( 100% - 200px );
            overflow: hidden;
            text-align: center;
            & .tb{
                width: 1300px;
                margin: 0 auto;
                border-radius: 3px;
            }
            & /deep/ .ivu-table{
                opacity: 0.8;
            }
        }
        .pager{
            padding-top: 30px;
            height: 100px;
            box-sizing: border-box;
            padding-right: 0px;
            text-align: center;
            & .pg-content{
                width: 1300px;
                margin: 0 auto;
            }
            & /deep/ .ivu-page-total{
                color: white;
            }
        }

        @media (min-width: 900px) and (max-width: 1199px){
            & .mouse-wheel-wrapper{
                & .tb{
                    width: 800px!important;
                }
            }
            .pager{
                & .pg-content{
                    width: 800px!important;
                }
            }
        }
        @media (min-width: 1200px) and (max-width: 1499px){
            & .mouse-wheel-wrapper{
                & .tb{
                    width: 1100px!important;
                }
            }
            .pager{
                & .pg-content{
                    width: 1100px!important;
                }
            }
        }
        @media(min-width: 1500px) and (max-width: 1899px){
            & .mouse-wheel-wrapper{
                & .tb{
                    width: 1300px!important;
                }
            }
            .pager{
                & .pg-content{
                    width: 1300px!important;
                }
            }
        }
        @media(min-width: 1900px) and (max-width: 2499px){
            & .mouse-wheel-wrapper{
                & .tb{
                    width: 1600px!important;
                }
            }
            .pager{
                & .pg-content{
                    width: 1600px!important;
                }
            }
        }
        @media(min-width: 2500px) and (max-width: 3500px){
            & .mouse-wheel-wrapper{
                & .tb{
                    width: 2100px!important;
                }
            }
            .pager{
                & .pg-content{
                    width: 2100px!important;
                }
            }
        }
    }

</style>
