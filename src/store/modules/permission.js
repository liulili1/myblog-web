
import {constantRoutes} from '../../router'

function filterRoutes(routes,role){
  return routes.filter(item => {
    return !(item.meta && item.meta.roles && !item.meta.roles.some((i)=> i==role))
  })
}
const state = {
  permisson_routes:[]
}

let mutations = {
  SET_ROUTES: (state, routes) => {
    state.permisson_routes = routes
  }
}
let actions = {
  generteRoutes({commit}, role){
    return new Promise((resolve) => {
      if(!role || role!='admin') {
       const per_routes =  filterRoutes(constantRoutes,role)
        commit('SET_ROUTES',per_routes)
      }else {
        let routes = constantRoutes
        commit('SET_ROUTES',routes)
      }
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}