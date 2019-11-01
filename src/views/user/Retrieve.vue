<template>
  <div class="retrieve">
    <a-tabs :forceRender="true" :activeKey="activeKey" :tabBarStyle="{'text-align': 'center'}">
      <a-tab-pane key="1">
        <span slot="tab">
          <icon-font type="icon-wangjimima1" style="font-size: 16px;" />修改密码
        </span>
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
          'oldPassword',
          {rules: [{ required: true, message: '请输入旧密码' }], validateTrigger: 'blur' }
        ]"
              placeholder="请输入旧密码"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              v-decorator="[
          'newPassword',
          {rules: [{ required: true, message: '请输入新密码' }], validateTrigger: 'blur' }
        ]"
              type="password"
              placeholder="请输入新密码"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, .25)" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              placeholder="请确认新密码"
              type="password"
              size="large"
              v-decorator="[
              'rePassword',
              {rules: [{ required: true, message: '请再次输入新密码' }], validateTrigger: ['blur']}
            ]"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-button
              size="large"
              type="primary"
              class="login-form-button"
              :loading="loading"
              html-type="submit"
            >确认修改</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'
import { updatepwd } from 'api/user'
import { mixinBasic } from '@/utils/mixin.js'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: require('../../assets/font/iconfont') // 在 iconfont.cn 上生成
})

export default {
  name: 'Forgot',
  mixins: [mixinBasic],
  data() {
    return {
      activeKey: '1',
      form: this.$form.createForm(this)
    }
  },
  methods: {
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
    // 跳转登录
    handelLogin() {
      this.$emit('jumpUser', 'hsy-login')
    },
    // 提交
    handleSubmit(e) {
      e.preventDefault()
      const password = this.form.getFieldValue('newPassword')
      const rePassword = this.form.getFieldValue('rePassword')

      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          if (password === rePassword) {
            updatepwd({ ...values })
              .then(res => {
                if (res.code === 200) {
                  this.loading = false
                  this.$message.success(res.message)
                  // 密码修改成功跳转登录
                  this.$emit('jumpUser', 'hsy-login')
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
        }
      })
    }
  },
  components: {
    'icon-font': MyIcon
  }
}
</script>

<style lang="less" scoped>
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
