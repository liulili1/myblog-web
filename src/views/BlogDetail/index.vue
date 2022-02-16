<template>
  <div class="blog-detail-content">
    <span class="blog-content-date"
      ><p class="month">1月</p>
      <p class="day">02</p></span
    >
    <content-head 
    ref="contentHead"
    :title="content.title" 
    :showMore="showMore" 
    :createDate="content.createDate" 
    :commentNum="content.commentNum">
    </content-head>
    <tab-image :textContent="textContent"></tab-image>
    <div class="blog-article">
      <Content
        ref="content"
        :mdContent="mdContent"
        :height="height"
      ></Content>
    </div>
    <Comment :blogId="content.id" :messageType="messageType"></Comment>
  </div>
</template>
<script>
import { getDetail } from '@/api/blog';
import Content from '@/components/Content';
import ContentHead from '@/components/BlogContents/components/ContentHead.vue';
import TabImage from '@/components/TabImage';
import Comment from '@/components/Comment';

import { mapGetters } from 'vuex';
export default {
  name: 'BlogDetail',
  data() {
    return {
      height: '100%',
      messageType: 'blog',
      content: {
        content: ''
      },
      textContent: '技术分享',
      showMore:true
    };
  },
  components: {
    ContentHead,
    TabImage,
    Content,
    Comment
  },
  computed:{
    ...mapGetters(['viewFlag','userIp']),
    mdContent(){
      return this.content.content
    }
  },
   watch: {
    $route(){
      this.initData()
    },
  },
  created() {
    this.initData()
  },
  mounted(){
    document.getElementsByClassName('container')[0].scrollTop = 683
  },
  methods: {
    initData() {
       if (this.$route.params.id) {
        getDetail(this.$route.params.id,this.userIp)
          .then((data) => {
            if (data.code === 0) {
              this.content = data.data[0];
              this.$refs.contentHead.initData()
            }
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: err
            });
          });
      }
    },
   
  
    
  }
};
</script>
<style lang="scss" scoped>
@import url('../../assets/css/markdown.scss');
$icon_bg_color: #a7ddfa;
$fn_color: #fff;
.blog-detail-content {
  position: relative;
  border-radius: 5px;
  background-color: $fn_color;
  .blog-content-date {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: $icon_bg_color;
    top: -30px;
    left: -30px;
    color: $fn_color;
    .month {
      text-align: center;
      margin-top: 1px;
    }
    .day {
      font-size: 30px;
      /* margin-bottom: 13px; */
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      bottom: -15px;
      font-weight: 700;
    }
  }
  .blog-article {
    margin-top: 30px;
    position: relative;
    .el-button {
      background-color: $icon_bg_color;
      border: 0;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>