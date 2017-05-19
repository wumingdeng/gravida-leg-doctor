import { http } from 'vue'
import {
  PROJECTS
} from './mutation-types'

import g from '../../../globals/global'
export function getProjects ({commit, state},data) {
    var _self = data.self
    _self.$http.post(g.debugUrlPrefix+'manageProject/getProject',
        data.info).then((response) => {
        if(response.body.err){
          _self.$f7.alert("wrong password","error")
        }else{
            if (data.callback) {
                data.callback(_self,response);
            }
        }       
      }, (response) => {
        _self.$f7.alert(response.err.toString())
      });
}

