<template>
  <div class="history-list-box">
    <header class="header">归档博客</header>
    <section class="sort-box">
      <h2>分类</h2>
      <ul class=sort-list >
        <li v-for="item in catetoryList" :key="item.categoryId"><a class="sort-item" @click="initList(item.categoryId)">{{item.categoryText}}({{item.num}})</a></li>
      </ul>
    </section>
     <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :hide-timestamp="true"
          >
          <span class="timestamp">{{activity.createDate | timeFilter}}</span><a @click="gotoDetail(activity.id)">{{activity.title}}</a>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
import { getList, getCategory } from '@/api/blog'
import {parseTime} from '@/utils'
export default {
  name: 'HistoryBlog',
  data() {
    return {
      reverse: true,
      activities: [],
      catetoryList:[]
    }
  },
  filters: {
    timeFilter(time) {
      return parseTime(time, '{y}-{m}-{d}')
    }
  },
  created(){
    this.getCatetory()
    this.initList()
    
  },
  methods:{
    gotoDetail(id){
       this.$router.push({
        path:  `/home/blogDetail/${id}` 
      }) 
    },
    getCatetory(){
      getCategory().then(data => {
        if(data.code === 0){
          this.catetoryList = data.data
        }
      })
    },
    initList(categoryId){
      getList({categoryId}).then(data => {
        if(data.code === 0){
          this.activities = data.data.result
          this.activities = this.activities.map(item => {
            return {
              id:item.id,
              title:item.title,
              createDate:item.createDate,
              color:'#11b4e6'
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.history-list-box{
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;
  .header {
    text-align: center;
    font-size: 25px;
    font-weight: 900;
  }
  .sort-box {
    margin-bottom: 30px;
    font-size: 14px;
    .sort-list{
      padding-left: 20px;
      height: 30px;
      li{
        float: left;
        margin-right: 10px;
        color: lightsalmon;
        .sort-item{
          width: 100%;;
        }
      }
    }
    
  }
  .block {
    font-size: 14px;
    ::v-deep .el-timeline-item__node{
      width: 6px;
      height: 6px;
      left: 2px;
      z-index: 999;
    }
    ::v-deep .el-timeline-item__tail{
      border-left: 3px solid #f6fcfe;
    }
    .timestamp{
      color: #11b4e6;
      margin-right: 10px;
      font-size: 12px;
    }
  }
  
  

}
</style>