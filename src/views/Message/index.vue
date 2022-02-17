<template>
  <div class="message-box">
    <el-card class="box-card">
      <header class="header">留言板</header>
      <section class="section">您好~欢迎您来到我的个人博客👏😊</section>
      <img class="feel-img" src="@/assets/images/maoto.png" alt="心情说说">
    </el-card>
      <Comment :messageType="messageType">
      </Comment>
  </div>
</template>
<script>
import Comment from '@/components/Comment'
export default {
  name: 'Message',
  data() {
    return {
      messageType: 'message'
    }
  },
  components: {
    Comment
  }
}
</script>
<style lang="scss" scoped>
.message-box{
  
  .box-card{
    margin-bottom: 20px;
    .header{
      text-align: center;
      font-size: 25px;
      font-weight: bolder;
    }
    .section{
      margin-top: 20px;
      padding-left: 30px;
      font-size: 18px;
      font-weight: bolder;
    }
  }
 
}
</style>