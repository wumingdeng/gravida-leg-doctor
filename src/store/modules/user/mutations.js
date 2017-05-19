import {
  LOGIN
} from './mutation-types'
import g from '../../../globals/global'
const mutations = {
  [LOGIN] (state, uuserinfo) {
    state.userinfo = uuserinfo
    state.isLogged = true
    g.isLogged = true
  }
}

export default mutations
