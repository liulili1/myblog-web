import Vue from "vue"
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import permission from './modules/permission'
import home from "./modules/home"

Vue.use(Vuex)
//require.context 实现自动化导入正则匹配到的文件，不需要再挨个导入
// const modulesFiles = require.context('./modules', true, /\.js$/)

// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moudleName = modulePath.replace(/^\.\/(.*)\.w+$/,'$1')
//   const value = modulesFiles(modulePath)

//   modules[moudleName] = value.default
//   return modules
// },{})


const store = new Vuex.Store({
  modules:{
    user,
    permission,
    home
  },
  getters
})
export default store