<template>
  <div class="about-box">
    <header>关于我</header>
    <img src="@/assets/images/about_me2.jpeg" alt="">
    <div class="content">
      <p>大家好，我叫刘莉莉，90后小姐姐💖</p>
      <p>喜欢画画，喜欢美食，静若处子动若脱兔大概说的就是我吧😁</p>
      <p>欢迎大家关注我👏，一起进步，一起成长....⛽️</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AboutMe'
}
</script>
<style lang="scss" scoped>
.about-box {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  header{
    text-align: center;
    font-size: 25px;
    font-weight: bolder;
  }
  img{
    height: 400px;
    width: 400px;
  }
  .content{
    margin-left: 20px;
  }
}
</style>