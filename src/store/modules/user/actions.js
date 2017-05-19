import { http } from 'vue'
import {
  LOGIN
} from './mutation-types'

import g from '../../../globals/global'
export function getUserLogin ({commit, state},data) {
    var _self = data.self
    _self.$http.post(g.debugUrlPrefix+'users/signOn',
        data.info).then((response) => {
        if(response.body.err){
          _self.$f7.alert("wrong password","error")
        }else{
          commit(LOGIN, response.body)
        }       
      }, (response) => {
        _self.$f7.hidePreloader()
        _self.$f7.alert("error occur","error")
      });
}
