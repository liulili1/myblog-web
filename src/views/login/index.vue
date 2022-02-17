<template>
  <div class="login-container">
    <el-form class="form-container" ref="loginForm" :label-position="labelPosition" :rules="loginRules" :model="userForm">
      <div class="title-container">
        <h1>博客管理系统</h1>
      </div>
      <el-form-item prop="username">
          <span class="icon-class"><i class="el-icon-user"></i></span>
        <el-input v-model="userForm.username" placeholder="用户名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="passWord">
        <span class="icon-class"><i class="el-icon-lock"></i></span>
        <el-input v-model="userForm.passWord" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'Login',
  data() {
    var validateUsername = (rule, value, callback) => {
      if(!value || value.length === 0) {
         callback(new Error('用户名不能为空'))
      }else {
         callback()
      }
    };
    var validatorPass = (rule, value, callback) => {
      if(value.length > 6) {
        callback(new Error('密码不能大于六位'))
      }else if(value.length === 0) {
        callback(new Error('密码不能为空'))
      }else {
        callback()
      }
    }
    return {
      labelPosition: 'right',
      userForm: {
        username: '',
        passWord: ''
      },
      loginRules:{
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        passWord: [
          { required: true, trigger: 'blur', validator: validatorPass }
        ]
      }
    }
  },
  components:{
    
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('user/login',this.userForm).then(data => {
              if(data.code === 0) {
                this.$router.push({
                            path:'/'
                })
              } else {
                 this.$message.error(data.errMsg);
              }
            })
          
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }

}
</script>
<style lang="scss" scoped>
$color:#303a4a;
$inputCol:#2b3442;
$ftColor:#fff;
$cursor: #fff;
$bg: #283443;
$fs: 22px;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .form-container{
    position: relative;
    width: 500px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .title-container{
      color: $ftColor;
    }
    .el-input{
      display: inline-block;
      ::v-deep input{
        background: transparent;
        padding-left: 40px;
        color: $ftColor;
        border: 0px;
        border-radius: 0;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
      }
    }
    .el-form-item{
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: $cursor;
      ::v-deep button{
        width: 100%;
      }
      .icon-class{
        position: absolute;
        left: 10px;
        height: 100%;
        font-size: $fs;
        i{
          vertical-align: middle;
          color: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
}

</style>

