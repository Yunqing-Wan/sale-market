<template>
    <div class="tmp">
        <div class="post_discuss">
            <h4>提交评论</h4>
            <textarea ref="txtVal" placeholder="请输入评论..." rows="4" cols="20"></textarea>
            <a class="zc_bg" @click="postDiscussListData">提交评论</a>
        </div>
        <div class="discuss_list">
            <h4>评论列表</h4>
            <ul>
                <li v-for="(item,index) in DiscussListData" :key="index">
                    <p>{{item.content}}</p>
                    <div class="other">
                        {{item.user_name}}
                        <span>{{item.add_time | moment_filter('YYYY-MM-DD')}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type=text/ecmascript-6>
    //导入 提示框 插件
    import { Toast } from 'mint-ui';
    import Common from '../../tools/Common.js';
    export default{
        props:['discussID'],  //接收父组件的传值, 由于页面没有跳转, 这个discussID可以直接通过 this.discussID获得
        data(){
            return{
                DiscussListData:[],
            }
        },
        methods:{
            //获取评论列表
            getDiscussListData(){
                var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/getcomments/${this.discussID}?pageindex=1`;
                this.$http.get(url).then(
                    response=>{
                        //console.log(response.body.message);
                        this.DiscussListData = response.body.message;
                    },
                    err=>{
                        console.log(err)
                    }
                )
            },
            //发送评论
            postDiscussListData(){
                var txtVal = this.$refs.txtVal.value;
                if(!txtVal){
                    Toast('评论不能为空');
                    return;
                }
                if(txtVal.trim().length<10){
                    Toast('评论必须输入10个字');
                    return;
                }
                var id = this.$route.params.id;
                var url = `${Common.HTTP}${Common.SERVER_PATH}:${Common.PORT}/api/postcomment/${this.$route.params.id}`
                this.$http.post(url,{content:txtVal},{emulateJSON:true}).then(
                    response=>{
                        //清空 输入框
                        this.$refs.txtVal.value='';
                        //再次获取评论列表
                        this.getDiscussListData(id);
                    },
                    err=>{
                        console.log('出错了');
                    }
                )
            }
        },
        created(){
            this.getDiscussListData();
        }
    }
</script>

<style scoped>
    .tmp{
        padding: 0 5px;
    }
    /*提交评论*/
    .post_discuss{
        margin: 0 0 15px;
    }
    textarea{
        font-size:0.8rem;
        padding: 5px;
        margin: 0 0 5px;
    }
    /*评论列表*/
    ul{
        padding: 0;
        margin: 0;
    }
    li{
        list-style: none;
        border-bottom: 1px solid #ddd;
        padding: 8px 0;
    }
    li:last-child{
        border: none;
    }
    .discuss_list p{
        color: #333;
        margin: 0 0 5px;
    }
    .other{
        display:flex;
        justify-content: space-between;
        font-size: 0.8rem;
        color: #999;
    }
    .zc_bg{
        display: block;
        width:100%;
        line-height: 40px;
        color: #fff;
        background: #ffd100;
        text-align: center;
        border-radius: 3px;
    }
</style>