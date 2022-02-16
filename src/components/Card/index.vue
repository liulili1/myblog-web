<template>
  <div class="card-box" :style="{top: top}">
      <img src="@/assets/images/head_pic.jpeg" alt="头像">
     
        <span>但行好事莫问前程</span>
      
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: ['top']
}
</script>
<style lang="scss" scoped>
.card-box{
  margin: -125px auto;
  width: 70vw;
  height: 200px;
  background-color: #fff;
  opacity: 0.7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: -75px;
  img{
    height: 90px;
    width: 90px;
    border-radius: 50%;
  }
  span{
    font-family: cursive;
    font-size: 16px;
    margin-top: 20px;
  
  }
}
</style>