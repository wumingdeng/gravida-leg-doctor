// GLOBAL ROUTER ACCESS DEFAULT
// 1.if you use import xx from thismodule,will use default
// 2.if you use import {xx} from this module,will use the varible have name of xx and will be read only
// 3.if you use import * as xx from thismoudele,will use all as one object name xx
export default {
  r:{},
  login:false,
  gs:'',
  h_no:'',
  d_no:'',
  debugUrl:'http://192.168.18.165:8101/api/',
  pregnantAdd:'http://180yxd.sujudao.com:8097/api/'
  // pregnantAdd:'http://192.168.18.111:8097/api/'
  // debugUrl:'http://121.40.254.174:8101/api/'
}