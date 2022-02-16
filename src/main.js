import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './promission'

import '@/styles/index.scss'
import '@/assets/css/reset.scss'

console.log('main.js 执行了');
// use
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
