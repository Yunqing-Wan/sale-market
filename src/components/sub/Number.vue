<template>
    <div class="number">
        <div class="left" @click="sub">
            -
        </div>
        <div class="middle">
            {{number}}
        </div>
        <div class="right" @click="add">
            +
        </div>
    </div>
</template>
<style scoped>
    .number{
        display: flex;
    }
    .left{
        border-radius: 3px 0 0 3px;
    }
    .right{
        border-radius: 0 3px 3px 0;
    }
    .left,.right {
        width: 30px;
        height: 25px;
        border: 1px solid rgba(1,1,1,0.6);
        text-align: center;
    }
    .middle {
        width: 35px;
        height: 25px;
        border: 1px solid rgba(1,1,1,0.6);
        text-align: center;
    }
</style>
<script type=text/ecmascript-6>
    export default {
        // props:['shopCarNum'], //接收购物车组件中传来的 商品数目
        data(){
            return{
                number: 1
            }
        },
        methods:{
            //减法
            sub(){
                //判断
                if(this.number <= 1){
                    this.number = 1;
                    return;
                }
                //自减
                this.number--;
                //将number提交
                this.sendNumber();
            },
            //加法
            add(){
                this.number++;
                this.sendNumber();
            },
            //向父组件传值
            sendNumber(){
                console.log(this.number)
                this.$emit('send', this.number);
            }
        }
    }
</script>

