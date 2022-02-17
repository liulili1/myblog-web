<template>
  <div class="active-head">
    <span class="active-title">{{title}}</span>
    <div class="icons-box">
       <ul class="icon_lists">
            <li class="dib"> 
              <i class="fa fa-user"></i><span>发表于</span>
            </li>
            <li class="dib"> 
              <i class="fa fa-clock-o"></i><span>{{createDate | timeFilter}}</span>
            </li>
             <li class="dib"> 
              <a @click="goToComment"><i class="fa fa-commenting"></i><span>{{commentNum}}评论</span></a>
            </li>
              <li class="dib" v-if="showMore"> 
              <i class="fa fa-eye"></i><span>{{watchNum}}浏览</span>
            </li>
             <li class="dib" v-if="showMore"> 
              <a @click="likeClick"><i class="fa fa-heart-o" v-if="likeNum===0"></i><i v-if="likeNum>0" class="fa fa-heart"></i><span>{{likeNum}}喜欢</span></a>
            </li>
            <!--
             <li class="dib"> 
              <i class="fa fa-star-o"></i><span>1收藏</span>
            </li> -->
          </ul>
        
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import { updateEavl, getBlogEvalInfo } from '@/api/blog'
export default {
  name: 'ContentHead',
  data(){
    return {
      watchNum:0,
      likeNum:0,
      blogId: Number(this.$route.params.id)
    }
  },
  props: {
    title: {
      type: String,
      require: true
    },
    createDate:Number,
    commentNum:Number,
    showMore:{
      type: Boolean
    }
  },
  computed:{
    ...mapGetters(['userIp'])
  },
  filters:{
    timeFilter(time){
      return parseTime(time)
    }
  },
  created(){
   
  },
  methods:{
    initData(){
      console.log("触发了");
      getBlogEvalInfo(this.blogId).then(data => {
        console.log(data);
        if(data.code === 0) {
          data.data.forEach(item => {
            if(item.type === 'watch' ){
              this.watchNum = item.num
            }else if(item.type === 'like'){
              this.likeNum = item.num
            }
            console.log('this.watchNum123:::',this.watchNum);
          })
        }
        console.log('this.watchNum:::',this.watchNum);
      })
    },
    likeClick(){
      updateEavl(this.userIp,this.blogId,'like').then(() => {
          this.initData(this.blogId)
        }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    goToComment(){
     console.log(document.getElementById('webbox').focus());
    }
  }
}
</script>
<style lang="scss" scoped>
.active-head{
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #444444;
  .active-title{
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    margin-top: 20px;
  }
  .icons-box{
    .icon_lists{
      display: flex;
      justify-content: center;
      li{
        float: left;
        list-style: none;
        font-size: 14px;
        margin-left: 15px;
        color: #555555;
        i{
          margin-right: 5px;
        }
      }
    }
  }
}

</style>