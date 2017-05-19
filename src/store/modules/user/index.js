import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
const initialState = {
  isLogged:false
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}