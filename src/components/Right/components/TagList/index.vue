<template>
  <div class="friendLint-list" @scroll="hhh">
    <tab-image :textContent= "title" :top="top"></tab-image>
     <div class="list-content">
        <el-row class="el-row-item">
          <el-col :span="12"><el-link :underline="false" >马士兵个人博客</el-link></el-col>
          <el-col :span="12"><el-link :underline="false" >aimme个人博客</el-link></el-col>
        </el-row>
         <el-row class="el-row-item">
          <el-col :span="12"><el-link :underline="false">leiona博客空间</el-link></el-col>
          <el-col :span="12"><el-link :underline="false">老刘笔记</el-link></el-col>
        </el-row>
     </div>
  </div>
</template>
<script>
import TabImage from '@/components/TabImage'
export default {
  name: 'TagList',
  data() {
    return {
      title: '友情链接',
      top: '30px'
    }
  },
  components: {
    TabImage
  },
   mounted(){
     let height = document.getElementsByClassName('friendLint-list')[0].offsetTop
     console.log("height:",height);
  },
  methods:{
    hhh(e){
      console.log(e);
    }
  }
}
</script>
<style lang="scss" scoped>
.friendLint-list{
  z-index: 999;
  width: 360px;
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 25px;
  .list-content{
    margin-top: 70px;
    margin-left: 20px;
    .el-row-item{
      margin-bottom: 15px;
      padding-left: 20px;
    }
  }
  .fa-free-code-camp{
    position: absolute;
    top: 40px;
    right: 57px;
    color: orangered;
  }
}
</style>