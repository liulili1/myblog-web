import Vue from "vue";
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
 
  {
    path: '/',
    component: () => import('@/views/Home'),
    redirect: '/home',
    children:[
      {
        path: '/',
        component:() => import('@/views/BlogList/index.vue'),
      }
    ]
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/login/index'),
  },
  {
    path: '/home',
    component:() => import('@/views/Home'),
    children:[
    {
      path: 'blogList',
      meta: {title: '首页'},
      component:() => import('@/views/BlogList/index.vue'),
    },{
      path: 'historyBlog',
      meta: {title: '归档博客'},
      component:() => import('@/views/HistoryBlog')
    },{
      path: 'feelList',
      meta: {title: '心情说说'},
      component:() => import('@/views/FeelList')
    },{
      path: 'message',
      meta: {title: '留言板'},
      component:() => import('@/views/Message')
    },{
      path: 'aboutMe',
      meta: {title: '关于我'},
      component:() => import('@/views/AboutMe')
    },{
      path: 'blogDetail/:id',
      hidden: true,
      component:() => import('@/views/BlogDetail')
    }
  ]
  },
  {
    path:'/404',
    component: () => import('@/views/error/error-404.vue')
  },
  {
    path: '/admin',
    meta: {roles:['admin']},
    component:() => import('@/views/Admin'),
    children: [
      {
        path: 'listView',
        name:'listView',
        meta: {title:'博客管理', roles:['admin']},
        component: () => import('@/views/Admin/ListView.vue'),
        
      },{
        path: 'addView',
        name: 'AddView',
        meta: {roles:['admin']},
        component: () => import('@/views/Admin/AddView.vue')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service supportww
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

export default router