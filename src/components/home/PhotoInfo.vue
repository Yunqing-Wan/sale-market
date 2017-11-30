<template>
    <div class="tmp">
        <lg-preview class="mask"></lg-preview>
        <div class="info">
            <div class="info_title">
                <h4>{{PhotoInfoData.title}}</h4>
                <span>{{PhotoInfoData.add_time | moment_filter('YYYY-MM-DD')}}</span>
                <span>浏览分类：经济民生</span>
            </div>
            <div class="info_content">
                <div class="mui-content">
                    <ul class="mui-table-view mui-grid-view mui-grid-9">
                        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3" v-for="(item,index) in PhotoImgData" :key="index">
                            <img :src="item.src" v-preview="item.src">
                        </li>
                    </ul> 
                </div>
                <div class="cont_txt" v-html="PhotoInfoData.content"></div>
            </div>
        </div>
        <Discuss :discussID="sendID"></Discuss>
    </div>
</template>
<script type=text/ecmascript-6>
    import Common from '../../tools/Common.js'
    //导入 Discuss 组件
    import Discuss from '../sub/Discuss.vue'
    export default{
        props:['id'],//通过路由拿到id this.$route.params.id
        data(){
            return{
                PhotoInfoData:{},
                PhotoImgData:{},
                //先声明一个sendID(传给子组件Discuss.vue)
                sendID:''
            }
        },
        components:{
            Discuss
        },
        methods:{
            getPhotoInfoData(id){
                var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/getimageInfo/${id}`;
                this.$http.get(url).then(
                    response=>{
                        //console.log(response.body.message);
                        this.PhotoInfoData = response.body.message[0];
                        //console.log(response);
                    },
                    err=>{
                        console.log(err)
                    }
                )
            },
            getPhotoImgData(id){
                var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/getthumimages/${id}`;
                this.$http.get(url).then(
                    response=>{
                        //console.log(response.body.message);
                        this.PhotoImgData = response.body.message;
                        //console.log(response);
                    },
                    err=>{
                        console.log(err)
                    }
                )
            }         
        },
        created(){
            var id = this.$route.params.id;
            this.getPhotoInfoData(id);
            this.getPhotoImgData(id);
            //将路由的id 赋值给sendID
            this.sendID = id;
        }
    }
</script>
<style scoped>
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .info{
        margin: 0 0 15px;
    }
    .info_title{
        border-bottom: 1px solid #ddd;
        padding: 0 5px 8px;
    }
    .info_title h4{
        font-size:1rem;
        line-height: 1.5rem;
    }
    .info_title span{
        font-size:0.8rem;
        color: #999;
    }
    .info_content{
        padding: 0 5px;
    }
    .cont_txt{
        font-size: 0.8rem;
        color: #666;
    }
    .mui-content a{
        padding: 0;
    }
    .mui-grid-view.mui-grid-9 li.mui-table-view-cell{
        padding: 0 5px;
    }
    ul{
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        display: flex;
        width: 100%;
    }
    li{
        float: left
    }
    li img{
        width:100%;
    }
</style>
