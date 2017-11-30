<template>
  <div class="tmp">
    <div class="goods" v-for="item in collecData">
        <div class="img">
            <img :src="item.thumb_path">
        </div>
        <div class="info">
            <h4>{{item.title}}</h4>
            <div class="buy">
                购买数量:<Number class="shopNum" :send="getNumber"></Number>
            </div>
            <div class="price">
                售价:{{item.sell_price}}
            </div>
            <a class="del_goods" href="#">删除</a>
        </div>
    </div>
  </div>
</template>
<script type=text/ecmascript-6>
    import Common from '../../tools/Common.js'
    import {getItem} from '../../tools/LocalStorageHelper.js'
    import Number from '../sub/Number.vue'
    export default {
    data(){
        return {
            collecData:[],
            number:1,
        }
    },
    components:{
        Number
    },
    methods:{
        //发请求, 从数据库拿到购物车数据
        getCollecData(){
            //1.0 拿到数据展示数据 拼接url
            //从数据库取data
            //localStorage的数据: '[{"goodsid":"89","number":"89"},{"goodsid":"89","number":2}]'
            var arr = getItem();

            //定义一个goods产品对象
            var goods = {};

            //遍历数据库取出的数据arr
            arr.forEach(item=>{
                if(goods[item.goodsid]){
                    //如果产品对象里 有这条数据, 就给这条数据累加
                    //0.1 先取出goods产品对象这条数据的 number
                    var tmpNum = goods[item.goodsid];
                    //0.2 已有的number累加新添加的number
                    tmpNum += item.number;
                    //0.3 将累加好的最终的number放进产品对象
                    goods[item.goodsid] = tmpNum;
                }else{
                    //如果产品对象里 没有这条数据, 就添加这条数据
                    goods[item.goodsid] = [item.number]
                }
            })
            //最终的arr => {89:10,87:5,86:2}
            //拼接url
            var urlIdArr = [];
            for(var k in goods){
                urlIdArr.push(k)
            }
            var ids = urlIdArr.join(',');
            console.log(ids)
            // /api/goods/getshopcarlist/87,88,89
            var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/goods/getshopcarlist/${ids}`
            this.$http.get(url).then(
                res=>{
                    console.log(res)
                    this.collecData = res.body.message;
                },
                err=>{
                    console.log('shopCar页面请求数据出错')
                }
            )
        },
        //拿到子组件Number传递过来的 数据
        getNumber(num){
            this.number = num
        }
    },
    created(){
        this.getCollecData()
    }
    }
</script>
<style scoped>
    .goods{
        padding: 10px;
        background:#fff;
        margin: 0 0 10px;
    }
    .img{
        width:60px;
        float:left;
        padding: 0 5px 0 0;
    }
    .img img{
        width:100%;
    }
    .info{
        font-size: 0.8rem;
        overflow: hidden;
    }
    .info h4{
        font-size: 0.8rem;
    }
    .buy{
        line-height: 26px;
    }
    .shopNum{
        float:right;
        margin: 0 0 0 5px;
    }
    .del_goods{
        float:right;
        color: #333;
    }
    .price{
        float:left;
    }
</style>
