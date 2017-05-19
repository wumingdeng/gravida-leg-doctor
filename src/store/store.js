import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './modules/user'
import projects from './modules/projects'
export default new Vuex.Store({
  modules: {
    projects,
    user
  }
})
