<template>
  <div class="personal-card">
    <img src="@/assets/images/head_pic5.jpeg" alt="名片">
    <div class="card-info">
      <span class="card-name">刘莉莉</span>
      <span class="card-occupation">前端工程师</span>
    </div>
    <hr>
     <ul>
      <li class="info-icon">
        <a :href="catchMeObj.git" target="_black"><i class="fa fa-github"></i></a>
      </li>
      <li class="info-icon">
        <a :href="catchMeObj.wechat" target="_black"><i class="fa fa-wechat"></i></a>
      </li>
      <li class="info-icon">
        <a :href="catchMeObj.qq" target="_black"><i class="fa fa-qq"></i></a>
      </li>
      <li class="info-icon">
        <a @click="goto"><i class="fa">...</i></a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'PersonalCard',
  data(){
    return{
      catchMeObj: {
        // 抓住我 个人信息{  
        git: 'https://github.com/liulili1',
        sina: 'https://weibo.com/u/2242812941',
        qq: require('@/assets/images/qq.jpg'),
        wechat: require('@/assets/images/weixin.jpg'),
        csdn: 'http://blog.csdn.net/Aimee1608',
      }
    }
  },
  methods:{
    goto(){
      this.$router.push({
        path: '/home/aboutMe'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.personal-card{
  width: 360px;
  height: 440px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  margin-top: 50px;
  img{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 230px;
    width: 330px;
    top: 15px;
  }
  .card-info{
    text-align: center;
    font-size: 25px;
    font-family: cursive;
    padding-top: 270px;
    .card-name{
      margin-right: 60px;
    }
  }
  hr{
    width: 330px;
    opacity: 0.3;
    margin-top: 20px;
  }
  ul{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    padding-left: 0;
    li {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #ddd;
      text-align: center;
      line-height: 40px;
      margin-right: 10px;
      cursor: pointer;
      z-index: 999;
      &:hover{
        background-color: chocolate;
      }
      a{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    
   
    
  }
}
</style>