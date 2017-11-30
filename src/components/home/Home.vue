<template>
  <div class="tmp">
    <!-- 轮播图的坑 -->
    <!-- 父组件接收子组件的传值 -->
    <!-- Lunbo标签为: 导入的子组件名 -->
    <!-- lunboData属性名为: 子组件接收传值的名props:['lunboData'] -->
    <!-- msg对应的属性值为: 父组件的data返回的值 -->
    <Lunbo v-bind:lunboData="msg"></Lunbo>
    <!-- 九宫格的坑 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/film">
            <span class="mui-icon mui-icon-more iconfont icon-dianying"></span>
            <div class="mui-media-body">豆瓣电影</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <span class="mui-icon mui-icon-info iconfont icon-yinle"></span>
            <div class="mui-media-body">音乐播放</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/goods_list">
            <span class="mui-icon mui-icon-more iconfont icon-taobao"></span>
            <div class="mui-media-body">淘宝产品</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/news_list">
            <span class="mui-icon mui-icon-more iconfont icon-xinwen-copy"></span>
            <div class="mui-media-body">新闻列表</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/photo_list">
            <span class="mui-icon mui-icon-more iconfont icon-zhuangxiu"></span>
            <div class="mui-media-body">装修图片</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/design_list">
            <span class="mui-icon mui-icon-email iconfont icon-zuopin"><span class="mui-badge">5</span></span>
            <div class="mui-media-body">设计链接</div>
          </router-link>
        </li>
      </ul> 
		</div>

  </div>
</template>
<script type=text/ecmascript-6>
  //导入轮播子组件
  import Lunbo from '../sub/Lunbo.vue'
  //导入工具类:url
  import Common from '../../tools/Common.js'
  export default {
    data(){
      return{
        msg:[]
      }
    },
    components:{
      Lunbo
    },
    methods:{
      //请求轮播图的数据
      getLunboData(){
        //拼接url
        var url = 'api/getImgList';
        this.$http.get(url).then(
          res => {
            //成功的回调
            console.log(res);
            this.msg = res.body;
          },
          err => {
            //失败的回调
            console.log('请求轮播图数据出错了');
          }
        )
      }
    },
    //在data methods初始化之后 调用中间件(钩子)
    created(){
      this.getLunboData();
    }
  }
</script>
<style scoped>
  .mui-grid-view.mui-grid-9 .mui-media .mui-icon{
    font-size: 2rem;
  }
  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size: 0.8rem;
  }
  /*.icon-youxiang:before{
    font-size: 1.8rem;
  }*/
</style>
