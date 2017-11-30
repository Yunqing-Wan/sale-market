<template>
  <div class="tmp">
    <h4>{{infoData.title}}</h4>
    <span>{{infoData.add_time | moment_filter('YYYY-MM-DD')}}</span>
    <span>浏览分类：经济民生</span>
    <hr />
    <div v-html="infoData.content"></div>
  </div>
</template>
<script type=text/ecmascript-6>
  import Common from '../../tools/Common.js'
  export default{
    props:['id'],
    data(){
        return{
            infoData: {}
        }
    },
    //拿到通过 路由传过来的参数
    methods:{
        getInfoDta(){
            var id = this.$route.params.id;
            var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/getnew/${id}`;
            this.$http.get(url).then(
                response=>{
                    console.log(response);
                    this.infoData = response.body.message[0];
                },
                err=>{
                    console.log(err);
                }
            )
        }
    },
    created(){
        this.getInfoDta();
    }
  }
</script>
<style scoped>
  .tmp{
     text-align: left;
     padding: 0 0.5rem;
  }
  h4{
      font-size: 1rem;
      line-height: 1.5rem;
  }
  span{
      font-size: 0.8rem;
      color: #999;
  }
</style>
