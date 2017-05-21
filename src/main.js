import Vue from 'vue'
import Vuex from 'vuex';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import routes from './routes';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import store from './store/store';

Vue.use(VueResource)
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

	
Vue.http.options.credentials = true;

// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

router.beforeEach((to,from,next)=>{
  window.scrollTo(0,0)
  console.log("1234")
  next()
})

new Vue({
  el: '#app',
  router,	
  store,
  render: h => h(App)
})
