import {
  PROJECTS
} from './mutation-types'
import g from '../../../globals/global'
const mutations = {
  [PROJECTS] (state, projectInfos) {
    state.projectInfos = projectInfos
  }
}

export default mutations
