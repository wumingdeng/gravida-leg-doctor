/**
 * @file
 * Created by hanan on 16/10/15.
 */
import {setCookie,getCookie,delCookie} from "../util/cookieUnit.js";
import g from "../globals/global.js";
import login from '../views/login.vue';
import order from '../views/order.vue';
import home from '../views/home.vue';
import fukuan from '../views/orders/fukuan.vue';
import shouhuo from '../views/orders/shouhuo.vue';
import weifukuan from '../views/orders/weifukuan.vue';
import weishouhuo from '../views/orders/weishouhuo.vue';
import visit from '../views/visits/visits.vue';
import visiter from '../views/visits/visiter.vue';
import report from '../views/visits/report.vue';
import user from '../views/users/user.vue';
import test from '../views/test.vue';
import NotFound from '../views/NotFound.vue';
import {checkHospital} from "../util/hospitalUntil.js";
export default [
  {path: '*', component: NotFound, name: 'notfound'},
  {
    path: '/home/:gs',
    component: home,
    children: [
        { path: '/home/:gs/visit', component: visit,name:"就诊列表"},
        { path: '/home/:gs/report/:no', component: report,name:"客人报告"},
        { path: '/home/:gs/visiter/:no', component: visiter,name:"客人信息"},
        { path: '/home/:gs/user', component: user,name:"用户管理"},
    ],
    beforeEnter:(to,from,next)=>{
        var gs = to.params.gs
        var user = getCookie('user')
        if(user==undefined || user==null|| user=='null'){
            if(gs=="fizzo" || gs=="yukiko"){
              console.log("返回登陆界面")
              next('/login/'+gs)
            }else{
              next('/login/fizzo')
            }
        }else if(gs=="180" || gs=="yukiko"){
            console.log('当前页面')
            next()
        }else{
          next('/login/fizzo')
        }        
    }
  },
  {
    path: '/',
    component: login,
    name:"login",
    beforeEnter:(to,from,next)=>{
        var gs = to.query.gs
        if(!checkHospital(gs)){
          next('*')
        }else{
          next()
        }
    }
  },
  {
    path: '/login/:gs',
    component: login,
    name:"login"
  }
];