<template>
  <div class="container-card" id="container-card">
      <el-form ref="box">
        <div class="response" :class="{active: currentId==0}" ref="box">
          <el-input
                  id="webbox"
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="textarea"
                  maxlength="100"
                  show-word-limit>
          </el-input>
          <div class="btn-box"><el-button type="primary" size="mini" @click="pushComment()">提交评论</el-button></div>
        </div>
      </el-form>
      <el-row class="el-row-evl" v-for="item in commentList" :key="item.id">
              <div class="frist-floor">
                <el-row>
                      <el-col :span="2" class="profileUrl"><img  :src="item.father.from === 'admin'? adminUrl:unkownUrl" alt=""></el-col>
                      <el-col :span="16" class="person"><span :class="{admin:item.father.from === 'admin'}">{{item.father.from==='admin'?'博主':item.father.from }}</span>&nbsp;</el-col>
                      <el-col :span="6" class="time"><span>{{item.father.createDt | timeFilter}}</span></el-col>
                   </el-row>
                   <el-row>
                      <el-col :span="2">&nbsp;</el-col>
                      <el-col :span="22"><span>{{item.father.content}}</span></el-col>
                   </el-row>
              </div>
               <div class="reply first">
                    <div class="reply-header">
                      <el-link type="primary"  @click="showReplyFn(item.father.commentId, item.father.from, item.father.id, $event)">{{item.father.id == currentId?'取消回复':'回复'}}</el-link>
                      <div class="response" :class="{active: item.father.id == currentId}">
                      <el-input
                              type="textarea"
                              placeholder="请输入内容"
                              v-model="textarea"
                              maxlength="500"
                              show-word-limit>
                      </el-input>
                      <div class="btn-box"><el-button type="primary" size="mini" @click="pushComment">提交评论</el-button></div>
                    </div>
                    </div>
                </div>
              <div class="other-floor">
                <el-row class="el-row-evl" v-for="i in item.children" :key="i.id">
                  <div>
                   <el-row>
                      <el-col :span="2" class="profileUrl"><img  :src="i.from==='admin'? adminUrl : unkownUrl" alt=""></el-col>
                      <el-col :span="16" class="person"><span :class="{admin:i.from === 'admin'}">{{i.from==='admin'?'博主':i.from }}</span>&nbsp;<span>回复</span>&nbsp; <span :class="{admin:i.to === 'admin'}">{{i.to === 'admin'?'博主':i.to}}:</span></el-col>
                      <el-col :span="6" class="time"><span>{{i.createDt | timeFilter}}</span></el-col>
                   </el-row>
                   <el-row>
                      <el-col :span="2">&nbsp;</el-col>
                      <el-col :span="22"><span class="other-content">{{i.content}}</span></el-col>
                   </el-row>
                  </div>
                   <div class="reply">
                    <div class="reply-header">
                      <el-link type="primary" @click="showReplyFn(i.commentId, i.from, i.id, $event)">{{i.id == currentId?'取消回复':'回复'}}</el-link>
                       <div class="response" :class="{active: i.id == currentId}">
                          <el-input
                                  type="textarea"
                                  placeholder="请输入内容"
                                  v-model="textarea"
                                  maxlength="500"
                                  show-word-limit>
                          </el-input>
                          <div class="btn-box"><el-button type="primary" size="mini" @click="pushComment">提交评论</el-button></div>
                        </div>
                    </div>
                </div>
                </el-row>
              </div>
              </el-row>
  </div>    
</template>
<script>
import {parseTime} from '@/utils'
import {pushComment, getCommentByBlog} from '@/api/comment'
export default {
  name: 'Comment',
  data() {
    return {
      showReply: false,
      textarea:'',
      presentTo:'',
      presentCommentId: '',
      commentList:[],
      currentId: 0,
      adminUrl: process.env.VUE_APP_IMAGES+'head_pic.jpeg',
      unkownUrl: process.env.VUE_APP_IMAGES+'unknow.png',
      
    }
  },
  props: {
    feelId: Number,
    messageType: String
  },
  filters: {
    timeFilter(time) {
      return parseTime(time)
    }
  },
  created() {
    this.init()
  },
  mounted(){
     
  },
  methods: {
    init(){
       if(this.$route.path.indexOf('blogDetail') >= 0) {
      this.getCommentList(Number(this.$route.params.id),this.messageType)
      }else if(this.$route.path.indexOf('message') >= 0) {
        this.getCommentList('',this.messageType)
      }else {
        this.getCommentList(this.feelId,this.messageType)
      }
    },
    getCommentList(id, type) {
      getCommentByBlog(id,type).then(data => {
        if(data.code === 0) {
          this.commentList = data.data
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    setComment() {
      return {
        blogId: this.$route.params.id,
        feelId: this.feelId,
        content: this.textarea,
        to: this.presentTo,
        commentId: this.presentCommentId,
        messageType: this.messageType
      }
    },
    showReplyFn(commentId, from,id, e) {
      if(e.path[0].innerHTML === '回复') {
        this.currentId = id
        this.presentTo = from
        this.presentCommentId = commentId
      }else {
        this.currentId = 0
      }
    },
    pushComment() {
      const data = this.setComment()
      if(!this.textarea.trim()){
        this.$message({
            message: '评论内容不能为空!',
            type: 'warning',
            offset:50
          })
        return false
      }
      pushComment(data).then(data => {
        if(data.code ===0) {
          this.$notify({
          message: '评论成功',
          type: 'success',
          offset:50
        });
            this.init()
            this.textarea = ''
            this.presentTo = ''
            this.presentCommentId = ''
            this.currentId = 0
        }
      }).catch(err => {
        this.$message({
            showClose: true,
            message: '出错了:'+err,
            type: 'error',
            offset:50
          })
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.container-card{
    padding: 20px 10px;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 5px;
    .profileUrl{
      img{
        height: 25px;
        width: 25px;
        border-radius: 4px;
      }
    }
    .person,.time{
      height: 35px;
      line-height: 35px;
      font-size: 10px;
      color: #000;
      font-weight: 600;
    }
    .response {
      display: none;
    }
    .active{
      display: block;
    }
    .btn-box{
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
      .el-button{
        width: 100%;
      }
    }
    .el-row-evl{
      position: relative;
      padding: 30px 10px 20px 10px;;
      font-size: 13px;
      border-top: 1px solid #ccc;
      .other-content{
        padding-left: 10px;
      }
      .frist-floor{
        height: 25px;
        .profileUrl{
          img{
            height: 35px;
            width: 35px;
            border-radius: 4px;
          }
        }
      }
      .reply {
        .reply-header{
          text-align: right;
        }
        .reply-child{
          margin-top: 10px;
          .reply-btn{
            text-align: right;
            margin-top: 10px;
          }
        }
      }
      .reply.first{
        margin-bottom: 15px;
      }
      .admin{
        color: dodgerblue;
        font-weight: bolder;
      }
      .time {
        text-align: right;
        color: #ccc;
        font-weight: 400;
        }
    }
   }
</style>