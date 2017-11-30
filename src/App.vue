<template>
  <div id="app">
    <!-- 导航条nav -->
    <mt-header fixed title="mini-market" class="zc_bg">
      <router-link to="" slot="left">
        <mt-button v-show="isshow" icon="back" @click="goBack">返回</mt-button>
      </router-link>
    </mt-header>

    <!-- 视口坑 -->
    <router-view></router-view>

    <!-- tabs -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home iconfont icon-shouye"></span>
				<span class="mui-tab-label">home</span>
			</router-link>
			<router-link class="mui-tab-item" to="/product">
				<span class="mui-icon mui-icon-email iconfont icon-ps"></span>
				<span class="mui-tab-label">design</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-contact iconfont icon-daima"></span>
				<span class="mui-tab-label">code</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-gear iconfont icon-gouwuche"><span id="badge" class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
		</nav>
  </div>
</template>

<script type=text/ecmascript-6>
  //导入 vueBus 工具类
  import {vueBus} from './tools/VueBus'
  //通过 $on 接收兄弟组件间的传值number
  vueBus.$on('sendNum',function(number){
    //console.log(number)
    //拿到DOM元素
    var badge = document.getElementById('badge');
    //console.log(badge)
    //拿到innerText 注意:是个字符串,-0转一下
    var shopNum = badge.innerText-0;
    //拿到的数字+穿过来的数字 = 新的购物车数字
    //console.log(shopNum)
    shopNum += number;
    //再赋值回去
    badge.innerText = shopNum;
  })

  export default {
    data(){
      return {
        isshow:false
      }
    },
    watch:{
      //判断什么时候 显示&隐藏
      //监听路线
      '$route':function(newVal, oldVal){
        //console.log(newVal)
        //得到路径
        var path = newVal.path;
        if(path == '/home'){
          this.isshow = false;
        }else{
          this.isshow = true;
        }
      }
    },
    methods:{
      //返回上一页
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .zc_bg{
    background: #ffd100;
  }
  .tmp{
    margin: 40px 0 50px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
