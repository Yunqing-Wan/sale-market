<template>
  <div class="tmp">
    <div class="desc">
        <h4>{{descData.title}}</h4>
        <div v-html="descData.content"></div>
    </div>
  </div>
</template>
<script type=text/ecmascript-6>
  import Common from '../../tools/Common.js'
  export default {
    props:['id'], //通过路由传递过来的参数 id
    data(){
      return {
        descData:{}
      }
    },
    methods:{
      //请求图文描述数据
      getDescData(id){
        var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/goods/getdesc/${id}`
        this.$http.get(url).then(
            res=>{
                this.descData=res.body.message[0];
                console.log(res)
            },
            err=>{
                console.log('图文描述数据出错');
            }
        )
      }
    },
    created(){
      var id = this.$route.params.id;
      this.getDescData(id);
    }
  }
</script>
<style scoped>
  .desc{
    padding: 5px;
  }
  h4{
    font-size: 1rem;
  }
</style>
