<template>
  <div class="register">
    <!-- Login -->
    <a-form
      layout="horizontal"
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
          'phone',
          {rules: [{ validator: validateUsername}], validateTrigger: 'blur' }
        ]"
          placeholder="请输入要绑定的手机号码"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
          'checkCode',
          {rules: [{ required: true, message: '验证码不能为空'}], validateTrigger: 'blur' }
        ]"
          placeholder="请输入验证码"
        >
          <icon-font slot="prefix" type="icon-tupianyanzhengma" style="color:rgba(0,0,0,.25)" />
          <img
            height="40"
            width="140"
            slot="addonAfter"
            @click="changeImgCode"
            :src="processImgSrc"
            alt
          />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
          'verifyCode',
          {rules: [{ required: true, message: '短信验证码不能为空'}], validateTrigger: 'blur' }
        ]"
          placeholder="请输入短信验证码"
        >
          <icon-font slot="prefix" type="icon-duanxinyanzhengma" style="color:rgba(0,0,0,.25)" />
          <a-button
            size="large"
            type="primary"
            :disabled="disabled"
            slot="addonAfter"
            @click="sendCode"
          >{{ btnText }}</a-button>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
          'password',
          {rules: [{ validator: validatePassword}], validateTrigger: 'blur' }
        ]"
          type="password"
          placeholder="请输入登录密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, .25)" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          placeholder="请确认登录密码"
          type="password"
          size="large"
          v-decorator="[
              'rePassword',
              {rules: [{ required: true, message: '请再次输入登录密码' }, { validator: validateRePassword }], validateTrigger: ['blur']}
            ]"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <!-- <span class="login-form-forgot">
          已有账号?
          <a href="javascript:;" @click="handelLogin">马上登录</a>
        </span>-->
        <a-button
          size="large"
          type="primary"
          class="login-form-button"
          :loading="loading"
          html-type="submit"
        >立即注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'
import { validateUsername, validatePassword } from 'utils/validator'
import { verificationCode, verifyCode, register } from 'api/user'
import { mixinBasic } from '@/utils/mixin.js'
import { factorySendCode } from 'utils/util.js'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont') // 在 iconfont.cn 上生成
})

export default {
  mixins: [mixinBasic],
  data() {
    return {
      processImgSrc: undefined,
      form: this.$form.createForm(this),
      disabled: false,
      btnText: '发送验证码',
      remaining: 60
    }
  },
  props: {
    taId: {
      type: String,
      default: '',
      require: false
    },
    userState: {
      type: Boolean,
      default: true,
      require: true
    }
  },
  mounted() {
    this.gteImgUrl()
  },
  methods: {
    // 加载图片验证码
    gteImgUrl() {
      return verificationCode()
        .then(res => {
          // 二十二进制图片流转base64
          this.processImgSrc =
            'data:image/png;base64,' +
            btoa(
              new Uint8Array(res).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            )
        })
        .catch(() => {
          this.$message.error('请求超时')
        })
    },
    // 切换验证码图片
    changeImgCode() {
      // 函数节流
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        this.gteImgUrl()
      }, 300)
    },
    // 短信验证
    sendCode() {
      this.form.validateFields(['phone', 'checkCode'], (err, values) => {
        if (!err) {
          verifyCode({ ...values, type: 1 })
            .then(res => {
              if (res.code !== 200) {
                this.$message.error(res.message)
                return false
              }
              factorySendCode.call(this, 60)
            })
            .catch(() => {
              this.$message.error('请求超时')
            })
        }
      })
    },
    validateUsername,
    validatePassword,
    validateRePassword(rule, value, callback) {
      const password = this.form.getFieldValue('password')
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },
    // 跳转注册
    handelLogin() {
      this.$emit('jumpUser', 'hsy-login')
    },
    // 提交
    handleSubmit(e) {
      e.preventDefault()
      const password = this.form.getFieldValue('password')
      const rePassword = this.form.getFieldValue('rePassword')
      console.log(password)
      console.log(rePassword)

      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          if (password === rePassword) {
            register({ ...values, type: 1, taId: this.taId })
              .then(res => {
                if (res.code === 200) {
                  this.loading = false
                  this.$message.success(res.message)
                  this.$store.commit('login', res.userInfoMap)
                } else {
                  this.loading = false
                  this.$message.error(res.message)
                  this.changeImgCode()
                }
              })
              .catch(() => {
                this.$message.error('请求超时')
              })
          } else {
            this.$message.error('两次密码输入不一致')
            this.loading = false
          }
        } else {
          this.loading = false
          this.changeImgCode()
        }
      })
    }
  },
  components: {
    'icon-font': MyIcon
  }
}
</script>

<style lang="less" scope>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
#components-form-demo-normal-login .ant-input-group-addon {
  padding: 0;
  height: 32px;
  border: 0;
  img {
    border-radius: 0 4px 4px 0;
  }
}
.ant-tabs .ant-tabs-top-content.ant-tabs-content-animated,
.ant-tabs .ant-tabs-bottom-content.ant-tabs-content-animated {
  padding-top: 40px;
}
</style>
