<script>
import {getPicCode} from "@/api/login";
import {getMsgCode} from "@/api/login";
import {codeLogin} from "@/api/login";


export default {
  name: 'loginIndex',
  data() {
    return {
      picCode: '', //用户输入的图形验证码
      picKey: '', //用户标识验证码的唯一标识
      picUrl: '',
      totalSecond: 60, //总秒数
      second: 60, //当前秒数
      timer: null,
      mobile: '',
      smsCode: ''
    }
  },
  created() {
    this.getPicCode();
  },
  methods: {
    async getPicCode() {
      const {data: {base64, key}} = await getPicCode()
      this.picKey = key
      this.picUrl = base64
    },
    async getCode() {
      if (!this.validFn()) {
        return false
      }

      if (!this.timer && this.totalSecond === this.second) {
        //发送请求(预期：希望如果响应的sratusfei200，最好抛出一个错误，await只会等待成功的promise)
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        if (res.status === 200) {
          console.log(res)
          this.$toast('短信验证码发送成功')
        }

        //开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = 60
          }
        }, 1000)
      }
    },
    //校验手机验证码和图形验证码是否正确
    validFn() {
      if (!/^1[34578]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    async login() {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的短信验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.smsCode)
      console.log(res)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      await this.$router.push('/')
    }
  },
  destroyed() {
    //离开页面清除定时器
    clearInterval(this.timer)
  }
}
</script>

<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)"/>
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" v-model="mobile" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input class="inp" v-model="picCode" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input class="inp" v-model="smsCode" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{ second === totalSecond ? '获取验证码' : second + '秒后重新发送' }}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>