<template>

  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">{{gsStr}}</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import api from "../util/api.js";
  import {setCookie,getCookie,delCookie} from "../util/cookieUnit.js";
  import g from "../globals/global.js";
  import Hospital_data from '/Users/Fizzo/Documents/workspace-js/gravida_server/hospital.json'
  export default {
    data() {
      return {
        gsStr:"中国人民解放军第180医院",
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass ,h_no:g.h_no};
            this.$http.post(g.debugUrl+"login",loginParams).then((res)=>{
              if(res.body.ok == 1){
                var user = res.body.d
                g.login = true
                var user = {
                    username:user.username,
                    password:user.password,
                    avatar:"https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png",
                    familyname:user.familyname,
                    weight:user.weight,
                    doctor_no:user.doctor_no
                }
                g.d_no = user.doctor_no
                setCookie('user', JSON.stringify(user));
                this.$router.push({name:'就诊列表'})
              } else if(res.body.ok == 0){
                this.$alert('登陆失败', '警告', {
                  confirmButtonText: '确定'
                });
              }   
              this.logining = false          
          },
          (res)=>{
              this.$alert('服务器繁忙', '异常', {
                  confirmButtonText: '确定'
              });
              this.logining = false      
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted (){
      var gs = this.$route.query.gs
      this.$data.gsStr = g.gs
      this.$route.params.gs = gs
      console.log(gs)
      var user = getCookie('user')
      if (user) {
          user = JSON.parse(user);
          if(user){
            this.ruleForm2.account = user.username || '';
            this.ruleForm2.checkPass = user.password || '';
          }
      }

    }
  }

</script>

<style lang="css" rel="stylesheet/css">
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
    .login-container .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .login-container .remember {
      margin: 0px 0px 35px 0px;
    }
</style>