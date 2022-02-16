<template>
  <div class="container-box">
    <el-card class="box-card">
      <header class="header">心情说说</header>
      <img class="feel-img" src="@/assets/images/head_pic2.jpeg" alt="心情说说">
      <span class="record fa fa-pencil" ><strong >用心记录生活的轨迹...</strong></span>
    </el-card>
    <el-card  class="box-card">
      <span>暂未内容，敬请期待</span>
    </el-card>
    <ul class="box-card" v-if="flag">
      <li>
        <span class="feel-icon">
          <img src="../../assets/images/head_pic3.jpeg" alt="头像">
        </span>
        <span>今天下雨了，。。没有阳光了</span><img src="../../assets/images/head_pic1.jpeg" alt="心情说说">
        <footer class="footer">
          <div class="el-row-top">
            <i class="evl-time">2022-12-3</i><el-link type="primary" :underline="false" class="el-link-item" @click="showEvalFlag=!showEvalFlag">评价(2)</el-link>
          </div>
          <div v-show="showEvalFlag">
            <Comment :messageType="messageType"></Comment>
          </div>
        </footer>
      </li> 
    </ul>
  </div>
</template>
<script>
import Comment from '@/components/Comment'
export default {
  name: 'FeelList',
  data() {
    return {
      flag:false,
      textarea:'',
      showEvalFlag:false,
      messageType:'feel'
    }
  },
  components: {
    Comment
  }
}
</script>
<style lang="scss" scoped>
.container-box {
  .box-card {
    margin-bottom: 20px;
    padding-left: 0;
    background-color: #fff;
    li {
      border-radius: 5px;
      background-color: #fff;
      margin-bottom: 20px;
      padding: 20px 30px 10px 20px;
      position: relative;
      .footer {
        position: relative;
        margin-top: 20px;
        .el-row-top {
          display: flex;
          color: #ccc;
          // border-bottom: 1px solid #ddd;
          padding-bottom: 20px;
          .evl-time {
            flex: 1;
            font-size: 13px;
          }
        }
        .btn-box{
          text-align: right;
          .el-button {
            margin-top: 10px;
            background-color:#b2dbf7;
          }
        }

      }
    }
    .feel-icon{
      position: absolute;
      top: 20px;
      left: -20px;
      width: 0;
      height: 0;
      border: 10px solid;
      border-color: transparent #fff transparent transparent;
      img {
        width: 40px;
        height: 40px;
        border-radius: 3px;
        // border: 1px solid #ccc;
        position: absolute;
        top: -10px;
        left: -50px;
        box-shadow: 1px 1px 1px #ccc;
      }
    }
    .header {
      text-align: center;
      font-size: 25px;
      font-weight: bolder;
    }
    .feel-img{
      width: 90px;
      height: 90px;
      border-radius: 50%;
      margin-left: 30px;
      margin-bottom: 20px;
    }
    .record{
      position: absolute;
      top: 120px;
      left: 170px;
      font-size: 14px;
      font-weight: 500;
      padding-left: 10px;
      font-style: oblique;
    }
  }
}
</style>
