<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="scss">
    @import './assets/scss/base/reset';
    #app {
        font-family: PingFangSC-Regular;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width:100%;
        height:100%;
        overflow: hidden;
        font-size: 14px;
    }
    body,html{
        margin: 0px;
        height: 100%;
        width: 100%;
        font-size: 14px;
        overflow: hidden;
    }
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar
    {
        width: 8px;
        height: 8px;
        background-color: #f5f5f5;
    }
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
        border-radius: 10px;
        background-color: #f5f5f5;
    }
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #999;
    }
</style>
