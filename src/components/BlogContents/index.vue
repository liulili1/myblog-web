<template>
  <div class="blog-content">
    <span class="blog-content-date"><p class="month">{{content.createDate | monthFilter}}月</p><p class="day">{{content.createDate | dayFilter}}</p></span>
    <content-head 
    :title="content.title" 
    :blogId="content.id"
    :createDate="content.createDate" 
    :commentNum="content.commentNum">
    </content-head>
    <tab-image  :textContent="textContent"></tab-image>
    <div class="blog-article">
      <Content ref="content" :mdContent='article' :height="height"></Content>
      <el-button type="success" size="mini" @click="goDetail(content.id)">查看全文 <i class="el-icon-d-arrow-right"></i></el-button>
    </div>
  </div>
</template>
<script>
import ContentHead from '@/components/BlogContents/components/ContentHead.vue'
import Content from '@/components/Content'
import TabImage from '@/components/TabImage'
import { parseTime } from '@/utils'
export default {
  name: 'BlogContents',
  data() {
    return {
      textContent: '技术分享',
      article: this.content.content,
      height:'300px',
      detailFlag: false
    }
  },
  filters:{
    monthFilter(time){
    return parseTime(time,'{m}')
    },
    dayFilter(time) {
      return parseTime(time, '{d}')
    }
  },
  components:{
    ContentHead,
    TabImage,
    Content
  },
  props:{
    content:{
      type: Object,
      require: true
    }
  },
  created(){
    console.log('content:',this.content);
  },
  methods: {
    goDetail(id) {
      this.$router.replace({
        path:  `/home/blogDetail/${id}` 
      })
    },
  }
}
</script>
<style lang="scss" scoped>
@import url('../../assets/css/markdown.scss');
$icon_bg_color:#a7ddfa;
$fn_color:#fff;
.blog-content{
  position: relative;
  border-radius: 5px;
  background-color: $fn_color;
  .blog-content-date{
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: $icon_bg_color;
    top: -20px;
    left: -30px;
    color: $fn_color;
    .month{
      text-align: center;
      margin-top: 1px;
    }
    .day{
      font-size: 30px;
      /* margin-bottom: 13px; */
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      bottom: -23px;
      font-weight: 600;
    }
  }
  .blog-article{
    margin-top: 30px;
    padding-bottom: 50px;
    position: relative;
      .el-button{
        background-color: $icon_bg_color;
        border: 0;
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
      }
  }
  
}
</style>