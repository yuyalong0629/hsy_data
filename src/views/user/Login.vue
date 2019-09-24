<template>
  <div class="login">
    <a-tabs
      :forceRender="true"
      :activeKey="activeKey"
      @change="changeTab"
      :tabBarStyle="{'text-align': 'center'}"
    >
      <a-tab-pane key="1">
        <span slot="tab">
          <icon-font type="icon-weixin" />扫码登录
        </span>
        <div id="login_container"></div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <icon-font type="icon-dengluren" />账号登录
        </span>
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
          'loginname',
          {rules: [{ validator: validateUsername}], validateTrigger: 'blur' }
        ]"
              placeholder="请输入绑定的手机号码"
            >
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              v-decorator="[
          'loginpwd',
          {rules: [{ validator: validatePassword}], validateTrigger: 'blur' }
        ]"
              type="password"
              placeholder="请输入登录密码"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, .25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <span class="login-form-forgot">
              尚未注册?
              <a href="#" @click="handelRegister">立即注册</a>
            </span>
            <a-button
              size="large"
              type="primary"
              class="login-form-button"
              :loading="loading"
              html-type="submit"
            >立即登录</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'
import { validateUsername, validatePassword } from 'utils/validator'
import { login } from 'api/user'
import { timeFix } from 'utils/util.js'
import { mixinBasic } from '@/utils/mixin.js'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: require('../../assets/font/iconfont') // 在 iconfont.cn 上生成
})

export default {
  mixins: [mixinBasic],
  data() {
    return {
      activeKey: '1',
      form: this.$form.createForm(this)
    }
  },
  mounted() {
    const wxLogin = new WxLogin({
      id: 'login_container',
      appid: 'wx05050984d40b684f',
      scope: 'snsapi_login',
      redirect_uri: 'http://www.hsydata.com/',
      state: 'ef311ed88cf1e31323097f4369a74537',
      style: 'black',
      href:
        'data:text/css;base64,LnRpdGxlIHsKICBkaXNwbGF5OiBub25lOwp9CgouaW5mbyB7CiAgZGlzcGxheTogbm9uZTsKfQo='
    })
  },
  methods: {
    // Tab切换
    changeTab(key) {
      this.activeKey = key
    },
    validateUsername,
    validatePassword,
    // 跳转注册
    handelRegister() {
      this.$emit('jumpUser', 'hsy-register')
    },
    // 提交
    handleSubmit(e) {
      e.preventDefault()
      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          login({ ...values })
            .then(res => {
              if (res.code === 200) {
                this.loading = false
                // Modal 显示/消失
                // window.location.reload()
                this.$emit('visibled', false)
                this.$store.commit('login', res.userInfoMap)
                this.$message.success(timeFix() + ', ' + res.message, 1)
              } else {
                this.loading = false
                this.$message.success(res.message, 1.5)
              }
            })
            .catch(() => {
              this.loading = false
              this.$message.error('请求超时', 1.5)
            })
        } else {
          this.loading = false
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
.ant-tabs .ant-tabs-top-content.ant-tabs-content-animated,
.ant-tabs .ant-tabs-bottom-content.ant-tabs-content-animated {
  padding-top: 40px;
}
.ant-divider,
.ant-divider-vertical {
  position: static;
}
#login_container {
  text-align: center;
  iframe {
    height: 340px;
  }
}
</style>
