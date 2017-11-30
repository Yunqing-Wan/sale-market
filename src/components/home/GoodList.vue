<template>
  <div class="tmp">
    <ul class="mui-table-view mui-grid-view">
      <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="(item,index) in goodsListData" :key="index">
          <router-link v-bind="{to:'/goods_detail/'+item.id}">
              <img class="mui-media-object" :src="item.img_url">
              <div class="mui-media-body info">
                <p>{{item.title}}</p>
                <span>￥{{item.market_price}}</span><span><del>￥{{item.sell_price}}</del></span>
                <span class="hot_num">热卖中剩余{{item.stock_quantity}}件</span>
              </div>
          </router-link>
      </li>
    </ul>
  </div>
</template>
<script type=text/ecmascript-6>
  import Common from '../../tools/Common.js'
  export default {
    data(){
      return {
        goodsListData:[]
      }
    },
    methods:{
      getListData(){
        var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/getgoods?pageindex=1`;
        this.$http.get(url).then(
          response=>{
            this.goodsListData = response.body.message;
            //console.log( response.body.message)
          },
          err=>{
            console.log(err+'出错了');
          }
        )
      }
    },
    created(){
      this.getListData();
    }
  }
</script>
<style scoped>
  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    height: 40px;
  }
  .info p{
    font-size: 0.8rem;
    width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;

  }
  span{
    float: left;
    font-size: 0.6rem;
    color: #666;
  }
  .hot_num{
    float: right;
  }
</style>
