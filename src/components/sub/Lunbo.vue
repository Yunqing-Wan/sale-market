<template>
    <!-- 抽离的只是组件, 请求还是父组件的事情, 多个页面共用的只是组件, 请求不能共用 -->
    <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(item,index) in lunboData" :key="index">
            <a :href="item.url">
                <img :src="item.img">            
            </a>
        </mt-swipe-item>
    </mt-swipe>
    
</template>
<style scoped>
    img{
        width: 100%;
        height: auto;
    }
    .mint-swipe {
        height: 143px;
        color: #fff;
        font-size: 30px;
        text-align: center;
    }
    .mint-swipe-item {
        line-height: 200px;
    }
</style>
<script type=text/ecmascript-6>
    export default{
        props:['lunboData']  //子组件接收父组件的传值
    }
</script>