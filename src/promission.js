import router from './router'
// import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from './utils/get-page-title'
import { getToken } from './utils/auth'

import store from './store'
import {Message} from 'element-ui'

NProgress.configure({ showSpinner: false})

// const whiteList = ['/login', '/', '/home/getDetail', '/home/blogList']

router.beforeEach(async (to, from, next) => {
 
  //显示进度条
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  //获取token
  const hasToken = getToken();
  let user_role = ''
  //如果token存在，说明用户已经登陆
  if(hasToken) { //已经登陆
    //1,获取用户角色，根据角色得到权限路由
   await store.dispatch('user/getInfo').then(role => {
      user_role = role
      if(role){
        if(to.meta && to.meta.roles){
         const result = to.meta.roles.some(item => {
            return item === role
          })
          if(!result){
            Message.warning('对不起，您没有权限访问此页面！')
            next(false)
          }
        }
      }
    })
   
    await store.dispatch('permission/generteRoutes',user_role).then(() => {
      if(to.path === '/login') {
        next({ path: '/'}) //直接重定向到 '/'
        //如果不是login，原则上先判断用户的权限，有权限直跳转相应的路由页面，没有权限则
      }else {
        next()
        next(false)
      }
    }).catch(err=> {
      Message.error('出错了:',err)
      next(from.path)
    })
    //再判断目标路由是否为login，如果是login，直接重定向到‘/’
  }else {
    if(to.meta&&to.meta.roles){
      Message.warning('对不起，您没有权限访问此页面！')
      next(from.path)
    }
    store.dispatch('permission/generteRoutes',user_role).then(() => {
      next()
      next(false)
    }).catch(err=> {
      Message.error('出错了:',err)
      next(from.path)
    })
  }
  
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})