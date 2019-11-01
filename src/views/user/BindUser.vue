<template>
  <div class="login">
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
        <a-button
          size="large"
          type="primary"
          class="login-form-button"
          :loading="loading"
          html-type="submit"
        >立即绑定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { validateUsername, validatePassword } from 'utils/validator'
import { login } from 'api/user'
import { timeFix } from 'utils/util.js'
import { mixinBasic } from '@/utils/mixin.js'

export default {
  mixins: [mixinBasic],
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  props: {
    taId: {
      type: String,
      default: '',
      require: false
    }
  },
  methods: {
    validateUsername,
    validatePassword,
    // 提交
    handleSubmit(e) {
      e.preventDefault()
      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          login({ ...values, taId: this.taId })
            .then(res => {
              if (res.code === 200) {
                this.loading = false
                // Modal 显示/消失
                this.$emit('visibled', false)
                this.$store.commit('login', res.userInfoMap)
                window.location.reload()
                // this.$message.success(timeFix() + ', ' + res.message, 1)
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
