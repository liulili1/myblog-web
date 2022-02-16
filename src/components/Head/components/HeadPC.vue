<template>
  <div class="head-box">
    <el-menu
      ref="menu"
      :default-active="$route.path"
      class="el-menu-head"
      mode="horizontal"
      text-color="#fff"
      active-text-color="#a7ddfa"
      background-color="#545c64"
      :router="isRouterMode"
      >
      <el-menu-item v-for="item in newMenus"
      :key="item.index" :ref="item.path" :index="item.path" @click="handleSelect"><span>{{item.title}}</span></el-menu-item>
    </el-menu>
    <a class="loginBtn">
      <span @click="loginHandle" v-show="!token">登录</span>
      <span @click="loginOut" v-show="token">登出</span>
    </a>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getToken} from '@/utils/auth'
  export default {
    data() {
      return {
        isRouterMode: true,
        activeIndex2: '1',
        menus: [],
        token: getToken()
      };
    },
    computed: {
      ...mapGetters(['permisson_routes']),
      newMenus() {
       let i = 1;
       return this.menus.map(item => {
         return {title:item.title,path:item.path,index:Number(i++)}
       })
      }
    },
    watch:{
      permisson_routes(){
        this.menus = []
         this.generateMenus(this.permisson_routes,'')
      }
    },
    components: {
      
    },
    created() {
      this.generateMenus(this.permisson_routes,'')
    },
    
    methods: {
      generateMenus(routes,rootPath) {
        routes.forEach(item => {
          if(item.meta && item.meta.title) {
            this.menus.push({title:item.meta.title,path:rootPath+'/'+item.path})
          }
          if(item.children) {
            this.generateMenus(item.children,item.path)
          }
        })
        console.log("menus",this.menus);
      },
      handleSelect() {
        this.$emit("hiddenHeader")
      },
      loginHandle(){
        this.$router.push({
          path:'/login'
        })
      },
      loginOut(){
        this.$store.dispatch('permission/generteRoutes','')
        this.$store.dispatch('user/resetToken').then(()=>{
         this.$message({
            type:'warning',
            title:'提示:',
            message:'已退出登陆',
            offset:50
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.head-box {
  background-color: #545c64;
  opacity: 0.9;
  width: 100vw;
  height: 45px;
  padding-left: 60px;
  position: fixed;
  top: 0;
  z-index: 9999999;
  display: flex;
  color: #fff;
  font-size: 20px;
  .loginBtn{
     position: absolute;
     right: 30px;
     height: 45px;
     line-height: 45px;
     vertical-align: middle;
     text-align: center;
     font-size: 14px;
   }
  ul.el-menu-head{
   border-bottom: none;
   opacity: 0.9;
  // width: 100px;
   li{
     height: 45px;
     line-height: 45px;
     text-align: center;

     
   }
   
  }
}

</style>