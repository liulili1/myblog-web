
<template>
          <div class="container">
          <Head @hiddenHomeHeader="hiddenHomeHeader"></Head>
          <Card v-show="showHeader" :top="top"></Card>
          <div class="blog-content">
            <el-row>
              <el-col :span="15">
                <div class="content-box">
                  <router-view />
                </div>
              </el-col>
              <el-col :span="9">
                <Right></Right>
              </el-col>
            </el-row>
          </div>
          <transition
            name="bounce"
        >
             <img class="up" @click="goTop" v-show="isshow" src="@/assets/images/up2.jpeg" alt="">
        </transition>
      </div>
</template>

<script>
import Head from '@/components/Head'
import Card from '@/components/Card'
import Right from '@/components/Right'
import {mapGetters} from 'vuex'
export default {
  name:'Home',
  data() {
    return{
      showHeader: true,
      top: '575px',
      flag: false,
      isshow:false
    }
  },
  components:{
    Head,
    Card,
    Right
  },
  created() {
    // eslint-disable-next-line no-undef
    // console.log(aa);
      //已登陆
      // eslint-disable-next-line no-undef
      this.$store.dispatch('user/saveUserIp',returnCitySN["cip"])
  },
  computed:{
    ...mapGetters(['viewFlag'])
  },
  watch:{
    viewFlag(){
      this.hiddenHomeHeader()
    }
  },
  mounted(){
   window.addEventListener('scroll',this.handleScroll,true)
  },
  destroyed(){
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  methods:{
    hiddenHomeHeader(){
      document.getElementsByClassName('container')[0].scrollTop = 683
    },
    handleScroll(){
      if(Math.floor(document.getElementsByClassName('container')[0].scrollTop) > 705){
       this.isshow = true 
      }
      if(Math.floor(document.getElementsByClassName('container')[0].scrollTop) < 705){
       this.isshow = false 
      }
      
    },
    goTop(){
      document.getElementsByClassName('container')[0].scrollTop = 0
    }
  },
  
}
</script>
<style lang="scss" scoped>
.container{
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/images/back1.jpeg');
  overflow-y: auto;
  position: relative;
  .blog-content{
    margin-top: 50px;
    margin-left: 70px;
    position: relative;
    ::v-deep .content-box {
      margin-left: 70px;
      margin-top: 30px;
      width: 52vw;
      padding-top: 20px;
    }
  }
  .up{
    position: fixed;
    right: 20px;
    bottom: 40px;
    height: 80px;
    width: 80px;
   
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

}
</style>