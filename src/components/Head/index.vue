<template>
  <div>
      <HeadPC @hiddenHeader="hiddenHeader"></HeadPC>
    <div v-show="showBackPic" class="headImgBox">
      <h1>Hi,Leiona</h1>
    </div>
  </div>
</template>
<script>
import HeadPC from '@/components/Head/components/HeadPC.vue'
export default {
  name:'Head',
   data() {
      return {
       showBackPic:true
      };
    },
    components:{
      HeadPC
    },
    methods: {
      hiddenHeader(){
        this.$emit("hiddenHomeHeader")
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style lang="scss" scoped>

.headImgBox{
  width: 100%;
  height: 650px;
  background-image: url('../../assets/images/back_head.jpeg');
  h1{
    font-size: 90px;
    margin-top: 0;
    text-shadow:1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
    font-family: fantasy;
    padding-top: 200px;
    color: #fff;
    font-weight: 900;
    text-align: center;
  }
}
</style>
