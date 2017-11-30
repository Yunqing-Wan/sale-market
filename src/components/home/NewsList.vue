<template>
  <div class="tmp">
    <ul class="mui-table-view" v-for="(item,index) in NewsList" :key="index">
      <li class="mui-table-view-cell mui-media">
        <!-- 通过路由传参 -->
        <router-link v-bind="{to:'/news_info/'+item.id}">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <p>{{item.title}}</p>
            <!-- 伸缩布局:平分剩余的空间 -->
            <div  class="otitle">
                <!-- vue2.x版本,过滤器用 小括号() -->
                发布时间:{{item.add_time | moment_filter('YYYY-MM-DD HH:mm:ss')}}
                <span>
                  点击量:{{item.click}}
                </span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script type=text/ecmascript-6>
  //导入工具url
  import Common from '../../tools/Common.js'
  export default{
    data(){
      return{
        NewsList:[]
      }
    },
    methods:{
      getNewsListData(){
        //发起请求
        //拿到url
        var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/getnewslist`;
        this.$http.get(url).then(
          response=>{
            console.log(response);
            this.NewsList = response.body.message;
          },
          err=>{
            console.log(err);
          }
        )
      }
    },
    created(){
      this.getNewsListData();
    }
  }
</script>
<style scoped>
  p{
    font-size: 1rem;
    color:#333;
    width:15rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .otitle{
    display:flex;
    font-size: 0.7rem;
    color:#999;
    justify-content: space-between;
  }
</style>
