
import { login, getInfo } from "../../api/user"
import { setToken,removeToken } from "../../utils/auth"



let state = {
  count: 6,
  token: '',
  username: '',
  roles: [],
  userIp: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, username) => {
    state.username = username
  },
  SET_ROLES: (state, role) => {
    state.roles = role
  },
  RESET_TOKEN: (state) => {
    state.token = 0
  },
  SET_USER_IP: (state, ip) => {
    state.userIp = ip
  }
}
let actions = {
  login({commit}, userInfo) {
    const {username, passWord} = userInfo
    return new Promise((resolve, reject) => {
      login({username,password:passWord}).then(data => {
        if(data.code === 0) {
          commit('SET_TOKEN',data.data.token)
          setToken(data.data.token)
          // setUser(username)
          resolve(data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({commit}){
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if(res.code === 0){
          const {username, role} = res.data[0]
          commit('SET_USER',username)
          commit('SET_ROLES',role)
          resolve(role)
        }else {
          reject ('获取用户信息报错')
        }
      }).catch( err=> {
        reject(err)
      })
    })
  },
  resetToken({commit}) {
    return new Promise((resolve, reject) => {
      try {
        commit('RESET_TOKEN','')
        commit('SET_USER',"")
        commit('SET_ROLES',"")
        removeToken()
      resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  saveUserIp({commit},ip) {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_USER_IP',ip)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}