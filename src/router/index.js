import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home.vue'
import Product from '@/components/product/Product.vue'
import Search from '@/components/search/Search.vue'
import Shopcar from '@/components/shopcar/Shopcar.vue'
import DesignList from '@/components/home/DesignList.vue'
import NewsList from '@/components/home/NewsList.vue'
import NewsInfo from '@/components/home/NewsInfo.vue'
import PhotoList from '@/components/home/PhotoList.vue'
import PhotoInfo from '@/components/home/PhotoInfo.vue'
import GoodList from '@/components/home/GoodList.vue'
import GoodsDetail from '@/components/home/GoodsDetail.vue'
import GoodsDesc from '@/components/home/GoodsDesc.vue'
import Comment from '@/components/home/Comment.vue'

//导入 vue-resource 框架
import VueResource from 'vue-resource'
Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  linkActiveClass:'mui-active',
  routes: [
    {name: 'home', path: '/', redirect: './home'},
    {name: 'home', path: '/home', component: Home},
    {name: 'product', path: '/product', component: Product},
    {name: 'search', path: '/search', component: Search},
    {name: 'shopcar', path: '/shopcar', component: Shopcar},
    {name: 'design_list', path: '/design_list', component: DesignList},
    {name: 'news_list', path: '/news_list', component: NewsList},
    {name: 'news_info', path: '/news_info/:id', component: NewsInfo},
    {name: 'photo_list', path: '/photo_list', component: PhotoList},
    {name: 'photo_info', path: '/photo_info/:id', component: PhotoInfo},
    {name: 'goods_list', path: '/goods_list', component: GoodList},
    {name: 'goods_detail', path: '/goods_detail/:id', component: GoodsDetail},
    {name: 'goods_desc', path: '/goods_desc', component: GoodsDesc},
    {name: 'comment', path: '/comment', component: Comment}
  ]
})

// export default{
//   install(Vue){
//     Vue.component('hello', Hello)
//   }
// }
