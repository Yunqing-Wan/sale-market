<template>
  <div class="tmp">
    <Lunbo :lunboData="lunboInfo"></Lunbo>

    <!--商品基本信息-->
    <div class="title">
        <h4>{{infoData.title}}</h4>
        <div class="price">
            市场价:¥{{infoData.sell_price}}
            <div>
                销售价:<del>¥{{infoData.market_price}}</del>
            </div>
        </div>
        <div class="count">
            购买数量:  <Number v-on:send="getNumber"></Number>
            <transition
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
            >
                <div v-show="isshow" class="ball"></div>
            </transition>
        </div>
        <div class="button">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="goToCar">加入购物车</mt-button>
        </div>
    </div>

    <!--商品参数-->
    <div class="info">
        商品信息:
        <ul>
            <li>商品货号:{{infoData.goods_no}}</li>
            <li>库存情况:{{infoData.stock_quantity}}</li>
            <li>上架时间:{{infoData.add_time | moment_filter('YYYY-MM-DD')}}</li>
        </ul>
    </div>

    <!--按钮-->
    <div class="buttons">
        <mt-button plain type="primary" size="large" @click="goToDesc">图文描述</mt-button>
        <mt-button class="btn_mt" plain type="danger" size="large" @click="goToDiscuss">商品评论</mt-button>
    </div>
  </div>
</template>
<script type=text/ecmascript-6>
  import Common from '../../tools/Common.js'
  import Lunbo from '../sub/Lunbo.vue'
  import Number from '../sub/Number.vue'
  import GoodsDesc from './GoodsDesc.vue'
  import {setItem} from '../../tools/LocalStorageHelper.js'
  import {vueBus} from '../../tools/VueBus.js'
  export default {
    props:['id'], //通过路由传递过来的参数 id
    data(){
        return {
            lunboInfo:{},
            infoData:{},
            shopNumber:1,    //number+-默认为:1
            isshow: false
        }
    },
    components:{
        Lunbo,
        Number
    },
    methods:{
        //元素进入界面之前调用的方法
        beforeEnter: function (el) {
            el.style.transform = 'translate3d(0,0,0)';
        },
        //元素进入界面
        enter: function (el, done) {
            var offsetWidth = el.offsetWidth;
            var offsetHeight = el.offsetHeight;
            // console.log(offsetWidth,offsetHeight)
            el.style.transform = "translate3d(40px,260px,0)"
            done()
        },
        //元素离开界面
        afterEnter: function (el) {
            this.isshow = !this.isshow;
        },
        //获取Number子组件发来的数据
        getNumber(num){
            console.log(num);
            this.shopNumber = num;
        },
        //获取轮播图数据
        getLunboData(id){
           var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/getthumimages/${id}`
            this.$http.get(url).then(
                res=>{
                    this.lunboInfo=res.body.message;
                    //console.log(res)
                },
                err=>{
                    console.log('err1');
                }
            )
        },
        //获取商品基本信息
        getInfoData(id){
            var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/goods/getinfo/${id}`
            this.$http.get(url).then(
                res=>{
                    this.infoData=res.body.message[0];
                    //console.log(res)
                },
                err=>{
                    console.log('err2');
                }
            )
        },
        //去图文描述页面
        goToDesc(){
            var id = this.$route.params.id;
            //由于是点击跳转页面, 通过this.$router.push()
            this.$router.push({name:'goods_desc', params:{id:id}})
        },
        //去评论页
        goToDiscuss(){
            var id = this.$route.params.id;
            this.$router.push({name:'comment', params:{id:id}})
        },
        //加入购物车
        goToCar(){
            //1.0 小球动画
            this.isshow = !this.isshow;

            //2.0 点击加入购物车, 更改购物车的number值
            //引入第三方变量 ↑
            //兄弟组件之间传值
            vueBus.$emit('sendNum', this.shopNumber);
            //console.log(this.shopNumber)

            //3.0 存入数据库 要存入的数据有id number
            var id = this.$route.params.id;
            var data = {'goodsid':id,'number':this.shopNumber};
            //调用子组件中导出的 存数据setItem方法, 将data{}对象存入缓存
            //引入 工具类:存储数据到localstorage
            setItem(data);
        }
    },
    created(){
        var id = this.$route.params.id;
        this.getInfoData(id);
        this.getLunboData(id);
    }
  }
</script>
<style scoped>
  .mint-swipe{
      min-height: 300px;
  }
  /*基本信息*/
  .title{
      padding: 0 5px;
      border-bottom: 1px solid #ddd;
  }
  .title h4{
      font-size: 1rem;
      line-height: 1.5rem;
      margin:0 0 10px;
  }
  .price,.count,.button{
      display: flex;
      justify-content:space-around;
      font-size: 0.8rem;
      margin:0 0 10px;
  }
  /*商品参数*/
  .info{
      font-size: 0.8rem;
      margin: 10px 0;
      padding: 0 5px;
  }
  ul,li{
      list-style: none;
      padding: 0;
      margin: 0;
  }
  ul{
      border-top: 1px dashed #ddd;
      border-bottom: 1px solid #ddd;
  }
  .buttons{
      padding: 0 5px;
  }
  /*小球动画*/
  .count{
      position: relative;
      z-index:8
  }
  .ball{
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: red;
      color: #fff;
      position: absolute;
      bottom: 5px;
      right: 26%;
      transition: all 1s cubic-bezier(.46,-0.31,.45,.54);
      z-index:9;
  }
  .btn_mt{
      margin-top:10px;
      border-color:#ffd100;
      color:#ffd100;
  }
</style>
