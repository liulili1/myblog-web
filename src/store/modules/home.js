
const state = {
  viewFlag:true
}

let mutations = {
  SET_VIEW: (state) => {
    state.viewFlag = !state.viewFlag
  }
}
let actions = {
  changeView({commit}){
    commit('SET_VIEW')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}