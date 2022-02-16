<template>
  <div class="hot-list" v-if="isShow">
    <tab-image :textContent= "title" :top="top"></tab-image>
    <i class="fa fa-free-code-camp"></i>
     <div class="list-content">
        <el-row class="el-row-item" v-for="item in hotList" :key="item.id">
          <el-col :span="3"><i>{{item.index}}</i></el-col>
          <el-col :span="21"><el-link :underline="false" @click="goDetail(item.id)" >{{item.title}}</el-link><span class="watch-count"><i>{{item.watchNum}}</i></span></el-col>
        </el-row>
     </div>
  </div>
</template>
<script>
import TabImage from '@/components/TabImage'
import {getHotList} from '@/api/blog'
import { mapGetters } from 'vuex'
export default {
  name: 'HotList',
  data() {
    return {
      title: '热门点击',
      top: '30px',
      hotList:[],
      isShow:false,
    }
  },
  components: {
    TabImage
  },
  computed:{
    ...mapGetters(['viewFlag'])
  },
  created(){
    this.initList()
  },
  methods:{
    initList(){
      getHotList().then(data => {
        if(data.code === 0){
          if(data.data.length>0){
            this.isShow =true
          }
          let i = 0
          this.hotList = data.data.map(item => {
            return {
              index:++i,
              id:item.id,
              title:item.title,
              watchNum:item.watchNum
            }
          })
        }
      })
    },
    goDetail(id) {
      this.$store.dispatch('home/changeView')
      this.$router.replace({
        path: `/home/blogDetail/${id}` 
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.hot-list{
  z-index: 999;
  position: relative;
  width: 360px;
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
      ::v-deep .el-link--inner{
        width: 200px;
        overflow: hidden;    
        text-overflow:ellipsis;    
        white-space: nowrap;
        font-size: 14px;
      }
      .watch-count{
        font-size: 14px;
        opacity: 0.7;
      }
      &:nth-child(1) {
        color: red;
      }
      &:nth-child(2),&:nth-child(3) {
        color: orange;
      }
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