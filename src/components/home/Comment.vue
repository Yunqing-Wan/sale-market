<template>
    <div class="tmp">
        <!--导入评论组件-->
        <Discuss :discussID="getId"></Discuss>
    </div>
</template>

<style scoped>
    .tmp{
        padding: 5px 0;
    }
</style>

<script type=text/ecmascript-6>
    import Discuss from '../sub/Discuss.vue'
    export  default {
        props:['id'], //接收传过来的id
        data(){
            return {
                getId:0
            }
        },
        components:{
            Discuss
        },
        created(){
            this.getId = this.$route.params.id;
            console.log(this.getId)
        }
    }
</script>

