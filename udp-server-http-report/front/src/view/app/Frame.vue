<template>
    <div class="view-content">
        <div class="main">
            <div v-loading="loading" class="loading"></div>
            <transition :name="transitionName">
                <router-view class="child-view"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapGetters, mapState } from 'vuex'
    import {
        Loading
    } from 'element-ui'

    import {
        Icon,
        Tooltip
    } from 'iview';

    Vue.use(Loading);
    Vue.component('Icon', Icon);
    Vue.component('Tooltip', Tooltip);

    export default {
        computed: {
            ...mapState([
                'userInfo',
                'sitename'
            ]),
            ...mapGetters([
                'loading',
            ])
        },
        data () {
            return {
                transitionName: 'fade',
            }
        },
        methods:{

        },
        components:{

        },
        watch: {
            '$route' (to, from) {
                if(from.name == 'center'){
                    this.transitionName = 'fade';
                }
                else if(to.name == 'center'){
                    this.transitionName = 'fade';
                }
                else{
                    this.transitionName = 'fade';
                }
                this.setCurrentMenu(true);
            }
        },
        mounted: function() {

        }
    }
</script>

<style scoped="scoped" lang="scss">
    .view-content{
        width:100%;
        height:100%;
        overflow: auto;
        position: relative;
        text-align: center;
        background: url(../../assets/img/o_background2.jpg) fixed;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .router-link-active{
        color:#f60;
        font-size: 0.6rem;
    }
    .child-view {
        position: absolute;
        width:100%;
        height:100%;
        left: 0;
        top:0;
        transition: all 300ms cubic-bezier(.55,0,.1,1);
        backface-visibility: hidden;
        z-index: 0;
        overflow: hidden;
        box-sizing: border-box;
        text-align: center;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    .fadeup-enter-active {
        animation: fadeInUp .4s;
    }
    .fadeup-leave-active {
        animation: fadeInUp .4s reverse;
    }
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes fadeOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translate3d(0, -30px, 0);
        }
    }
    .clear{
        clear: both;
    }
    .loading{
        z-index: 99;
        position: absolute;;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .view-content .main {
        height: 100%;
        width:100%;
        margin: 0 auto;
        position: relative;
    }
</style>
