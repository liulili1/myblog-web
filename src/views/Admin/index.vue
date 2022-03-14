<template>
  <el-container>
    <el-aside width="180px">
     <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#ccc"
      @open="handleOpen"
      @close="handleClose"
      :router="isRouter"
      >
       <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">博客首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>博客管理</span>
        </template>
          <el-menu-item index="/admin/listView"> 
            <i class="el-icon-document"></i>
            <span slot="title">博客列表</span>
          </el-menu-item>
          <el-menu-item index="/admin/addView"> 
            <i class="el-icon-document"></i>
            <span slot="title">博客新增</span>
          </el-menu-item>
       
      </el-submenu>
       <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">好书推荐</span>
      </el-menu-item>
     
    </el-menu>
    </el-aside>
    <!-- <div class="line">
    </div> -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'Admin',
  data(){
    return{
      isRouter: true
    }
  },
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style lang="scss" scoped>
// .line {
//   width: 0;
//   height: 100vh;
//   background: cadetblue;
// }
.el-aside{
  display: flex;
  height: 100vh;
  ul{
    flex: 1;
  }
}
.el-main {
  padding: 0
  ;
}
</style>