<template>
  <div class="loginContainer">
    <v-headTop :head-title="loginTitle" goBack="true">
    </v-headTop>
    <form class="loginForm">
      <section class="input_container">
        <input type="text" placeholder="账号" v-model.lazy="userAccount">
      </section>
      <section class="input_container">
        <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
        <input v-else type="text" placeholder="密码" v-model="passWord">
        <div class="button_switch" :class="{change_to_text: showPassword}">
          <div class="circle_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        <div class="img_change_img">
          <img v-show="captchaCodeImg" :src="captchaCodeImg">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <p class="login_tips">
      温馨提示：未注册过的账号，登录时将自动注册
    </p>
    <p class="login_tips">
      注册过的用户可凭账号密码登录
    </p>
    <div class="login_container" @click="mobileLogin">登录</div>
    <router-link to="/forget" class="to_forget">重置密码？</router-link>
    <v-alertTip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></v-alertTip>
  </div>
</template>
<script>
import headTop from '../../components/header/head.vue'
import alertTip from '../../components/common/alertTip.vue'
import { mapState, mapMutations } from 'vuex'
import { localapi, proapi, imgBaseUrl } from '../../config/env.js'
import { getcaptchas, accountLogin } from '../../service/getData.js'

export default {
  data() {
    return {
      loginTitle: "登录", //登录方式，默认短信登录
      showPassword: false, // 是否显示密码
      userInfo: null, //获取到的用户信息
      userAccount: null, //用户名
      passWord: null, //密码
      captchaCodeImg: null, //验证码地址
      codeNumber: null, //验证码
      showAlert: false, //显示提示组件
      alertText: null, //提示的内容
    }
  },
  created() {
    this.getCaptchaCode();
  },
  components: {
    'v-headTop': headTop,
    'v-alertTip': alertTip,
  },
  computed: {
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO',
    ]),
    //是否显示密码
    changePassWordType() {
      this.showPassword = !this.showPassword;
    },
    //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
    async getCaptchaCode() {
      let res = await getcaptchas();
      this.captchaCodeImg = res.code;
    },
    //发送登录信息
    async mobileLogin() {
      if (!this.userAccount) {
        this.showAlert = true;
        this.alertText = '请输入手机号/邮箱/用户名';
        return
      } else if (!this.passWord) {
        this.showAlert = true;
        this.alertText = '请输入密码';
        return
      } else if (!this.codeNumber) {
        this.showAlert = true;
        this.alertText = '请输入验证码';
        return
      }
      //用户名登录
      this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
      //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
      if (!this.userInfo.user_id) {
        this.showAlert = true;
        this.alertText = this.userInfo.message;
        this.getCaptchaCode();
      } else {
        this.RECORD_USERINFO(this.userInfo);
        this.$router.go(-1);
      }
    },
    closeTip() {
      this.showAlert = false;
    },
  }
}

</script>
<style scoped>
.loginContainer {
  padding-top: 2.0rem;
}

.loginContainer p,
.loginContainer span,
.loginContainer input {
  font-family: Helvetica Neue, Tahoma, Arial;
}

.change_login {
  position: absolute;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.75rem;
  font-size: .7rem;
  color: #fff;
}

.loginForm {
  background-color: #fff;
  margin-top: .6rem;
}

.loginForm .input_container {
  display: flex;
  justify-content: space-between;
  padding: .4rem .8rem;
  border-bottom: 0.025rem solid #f1f1f1;
  box-sizing: border-box;
}

.loginForm .input_container input {
  font-size: .6rem;
  color: #666;
  outline: none;
}

.loginForm .input_container button {
  font-size: .65rem;
  color: #fff;
  font-family: Helvetica Neue, Tahoma, Arial;
  padding: .28rem .4rem;
  border-radius: 0.15rem;
}

.loginForm .input_container .right_phone_number {
  background-color: #4cd964;
}


.loginForm .captcha_code_container {
  height: 2.2rem;
  box-sizing: border-box;
}

.loginForm .captcha_code_container .img_change_img {
  display: flex;
  align-items: center;
  text-decoration: underline;
}

.loginForm .captcha_code_container .img_change_img img {
  width: 3.5rem;
  height: 1.0rem;
  margin-right: .2rem;
}


.loginForm .captcha_code_container .img_change_img .change_img {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}

.loginForm .captcha_code_container .img_change_img .change_img p {
  font-size: .55rem;
  color: #666;
}

.loginForm .captcha_code_container .img_change_img .change_im p:nth-of-type(2) {
  color: #3b95e9;
  margin-top: .2rem;
}

.login_tips {
  font-size: .5rem;
  color: #f00;
  padding: .4rem .6rem;
  line-height: .5rem;
}

.login_tips a {
  color: #3b95e9;
}

.login_container {
  margin: 0 .5rem 1rem;
  font-size: .7rem;
  color: #fff;
  background-color: #4cd964;
  padding: .5rem 0;
  border: 1px;
  border-radius: 0.15rem;
  text-align: center;
}

.button_switch {
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.0rem;
  height: .8rem;
  padding: 0 .2rem;
  border: 1px;
  border-radius: 0.5rem;
  position: relative;
}

.button_switch .circle_button {
  transition: all .3s;
  position: absolute;
  top: -0.2rem;
  z-index: 1;
  left: -0.3rem;
  width: 1.2rem;
  height: 1.2rem;
  box-shadow: 0 0.027rem 0.05rem 0 rgba(0, 0, 0, .1);
  background-color: #f1f1f1;
  border-radius: 50%;
}

.button_switch .trans_to_right {
  transform: translateX(1.6rem);
}

.button_switch span {
  font-size: .45rem;
  color: #fff;
  transform: translateY(.03rem);
  line-height: .8rem;
}

.button_switch span:nth-of-type(2) {
  transform: translateY(-.08rem);
}

.change_to_text {
  background-color: #4cd964;
}

.to_forget {
  float: right;
  font-size: .6rem;
  color: #3b95e9;
  margin-right: .3rem;
}

</style>
