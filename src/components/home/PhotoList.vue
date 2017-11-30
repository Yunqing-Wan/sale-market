<template>
  <div class="tmp">
    <div class="container-wrap">
        <ul class="container">
            <li class="box" >
                <a @click="getPhotoList(0)">全部</a>
            </li>
            <li class="box" v-for="(item,index) in classify" :key="index">
                <a @click="getPhotoList(item.id)">{{item.title}}</a>
            </li>
        </ul>
    </div>
    <div class="photoListData">
        <div v-for="(item,index) in photoListData" :key="index">
            <router-link v-bind="{to:'/photo_info/'+item.id}">
                <img :src="item.img_url">
                <p>{{item.zhaiyao}}</p>
            </router-link>
        </div>
    </div>
  </div>
</template>
<script type=text/ecmascript-6>
    import Common from '../../tools/Common.js'
    export default{
        data(){
            return {
                classify:[],
                photoListData:[]
            }
        },
        methods:{
            getClassifyData(){
                var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/getimgcategory`;
                this.$http.get(url).then(
                    response=>{
                        //console.log(response)
                        this.classify = response.body.message;
                    },
                    err=>{
                        console.log(err+'出错了');
                    }
                )
            },
            getPhotoList(id){
                //console.log(id);
                var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/getimages/${id}`;
                this.$http.get(url).then(
                    response=>{
                        //console.log(response);
                        this.photoListData = response.body.message;
                    },
                    err=>{
                        console.log(err+'出错了')
                    }
                )
            },
        },
        created(){
            this.getClassifyData();
            this.getPhotoList(0);
        }
    }
</script>
<style scoped>
    ul{
        padding: 0;
        margin: 0;
    }
    .photoListData > div{
        position: relative;
        margin: 0 0 10px 0;
    }
    .photoListData img{
        width: 100%;
        height: 300px;
        display: block;
    }
    .photoListData p{
        position: absolute;
        bottom: -10px;
        background: rgba(0, 0, 0, .5);
        color: #fff;
        text-indent: 2rem;
        font-size: 0.8rem;
        line-height: 1.2rem;
        padding: 5px;
    }
    .container-wrap {
        width: 100%;
        height: 30px;
        white-space: nowrap;
        overflow: hidden;
        overflow-x: auto; /* 1 */
        backface-visibility: hidden;/*隐藏被旋转的div元素的背面*/
        perspective: 1000;/*设置元素被查看位置的视图 safari&chrome*/
        -webkit-overflow-scrolling: touch; /* 2 */
        text-align: justify; /* 3 */
    }
    .container-wrap::-webkiat-scrollbar{/* 4 */
        width: 0;
        height: 0;
        display: none;
    }
    .container a{
        color: #333;
    }
    .box{
        display: inline-block;
        height: 30px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        font-size: 0.8rem;
        padding: 0 0.2rem;
    }
</style>
