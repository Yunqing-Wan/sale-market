// 导入 vue
import Vue from 'vue';
//导入 App.vue根组件
import App from './App.vue';
//导入 router路由
import router from './router/index.js';
//导入 mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
import './assets/css/mint-ui.css';
//导入 mui.css fonts
import './assets/css/mui.css';
import './assets/fonts/mui.ttf';
//导入 字体图标库
import './assets/fontIcon/iconfont.css';
//导入 moment 时间插件
import Moment from 'moment';
//定义一个全局的过滤器,过滤时间
Vue.filter('moment_filter', function(input,formatString){
  return Moment(input).format(formatString);
})
//导入 vue-picture-preview 图片放大插件
import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview);
//导入 进度条和加载转圈
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.http.interceptors.push((request, next) => {
  NProgress.start();

  next((response)=>{
    NProgress.done();
  });
});
// Vue.config.productionTip = false

// 实例化 vue 对象
new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  // components: { App },
  render:create=>create(App)
})
