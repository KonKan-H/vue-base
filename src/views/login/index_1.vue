<template>
  <div class="login-container">
    <div class='login-elem'>
      <img class='login-logo' src="../../assets/images/logo.png" alt="">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
              label-width="0px"
              class="card-box login-form">
        <h3 class="title">欢迎您的登录</h3>
        <el-form-item prop="mobile" class='username'>
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user"/>
          </span>
          <el-input v-model="loginForm.mobile" autoComplete="on"/>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
          </span>
          <el-input type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                    autoComplete="on"></el-input>
        </el-form-item>
        <el-checkbox class='rember-password' v-model="remberMe">记住我</el-checkbox>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
        <div class='none-register'>
          没有账户？<span>立即注册</span>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          // mobile: '8888sssss',
          mobile: '12345678',
          password: 'user'
        },
        loginRules: {
          mobile: [{required: true, trigger: 'blur', message: "请输入用户名"}],
          password: [{required: true, trigger: 'blur', message: "请输入密码"}]
        },
        loading: false,
        remberMe: false,
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            if (this.remberMe) {
              const time = 30 * 24 * 3600;
              this.setCookies('username', this.loginForm.mobile, time)
              this.setCookies('password', this.loginForm.password, time)
            } else {
              this.setCookies('username', '', 0);
              this.setCookies('password', '', 0);
            }
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(data => {
              this.loading = false
              if (data.code === 0) {
                this.$router.push({path: '/'})
              } else {
                this.$message.error(data.msg);
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      /* 
        设置cookie
        key      字段名         String
        value    key对应的值    String
        time     有效时间       Number/String  
       */
      setCookies(key, value, time) {
        document.cookie = `${key}=${value}; expires=${time}`;
      },
      /* 
        读取cookie
        key    需要读取的字段名    String
        如果没有对应cookie则返回null
      */
      getCookies(key) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
      }
    },
    created() {
      const username = this.getCookies("username");
      const password = this.getCookies("password");
      if (username !== null && password !== null) {
        this.loginForm = {
          mobile: username,
          password,
        }
        this.remberMe = true;
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/mixin.scss";
  $bg: rgba(0, 0, 0, .4);
  $white: #fff;
  $dark_gray: #889aa4;
  // $light_gray: #eee;
  $light_gray: #b0b6bf;

  .login-container {
    @include relative;
    height: 100vh;
    background-image: url('../../assets/images/loginBg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &:hover {
      .login-elem {
        .login-form {
          opacity: 1;
        }
        .login-logo {
          left: 10%;
        }
      }
    }
    .login-elem {
      height: 70%;
      width: 70%;
      margin: 50px auto 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      .login-logo {
        width: 24%;
        position: absolute;
        left: 36%;
        transition: all linear 0.8s;
      }
      .login-form {
        right: 10%;
        position: absolute;
        margin: 0;
        opacity: 0;
        padding: 35px 35px 15px 35px;
        width: 360px;
        background-color: $bg;
        border-radius: 5px;
        transition: all linear 0.8s;
        .title {
          border-bottom: 1px solid $white;
          padding-bottom: 10px;
          font-size: 26px;
          color: $white;
          margin: 0px auto 40px auto;
          text-align: center;
          font-weight: normal;
        }
        .username {
          margin-bottom: 10px !important;
        }
        .rember-password {
          color: $white;
          margin-top: 10px;
          margin-bottom: 30px;
        }
        .el-form-item {
          border: none;
        }
        .is-required {
          margin: 0;
          background: $white;
          border-radius: 0;
          outline: none;
        }
        .none-register {
          background: none;
          border: none;
          color: $white;
          text-align: center;
          margin-top: 10px;
          margin-bottom: 22px;
          span {
            color: #517afc;
          }
        }
          .el-button {
            border-radius: 0;
            background-color: #2d54c7;
            border-color: #2d54c7;
            letter-spacing: 5px;
          }
      }
    }
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
