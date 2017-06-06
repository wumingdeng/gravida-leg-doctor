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
  base:'/gd/',
  mode:'history',
  routes: routes,
});

new Vue({
  el: '#app',
  router,	
  store,
  render: h => h(App)
})
