<template>
  <div class="register">
    <!-- 验证原手机号 -->
    <a-tabs :activeKey="activeKey" :tabBarStyle="{'text-align': 'center'}">
      <a-tab-pane key="1">
        <span slot="tab">
          <icon-font type="icon-zhuce" />
          {{ titleType === 1 ? '验证原手机号码' : '更换新手机号码' }}
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
          'phone',
          {rules: [{ validator: validateUsername}], validateTrigger: 'blur' }
        ]"
              :placeholder="titleType === 1 ? '请输入原手机号码' : '请输入要绑定的手机号码'"
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
            <a-button
              size="large"
              type="primary"
              class="login-form-button"
              :loading="loading"
              html-type="submit"
            >确定</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'
import { validateUsername, validatePassword } from 'utils/validator'
import {
  verificationCode,
  verifyCode,
  register,
  userInfo,
  updatePhone,
  verifyOldPhone
} from 'api/user'
import { mixinBasic } from '@/utils/mixin.js'
import { factorySendCode } from 'utils/util.js'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont') // 在 iconfont.cn 上生成
})

export default {
  mixins: [mixinBasic],
  data() {
    return {
      activeKey: '1',
      processImgSrc: undefined,
      form: this.$form.createForm(this),
      disabled: false,
      btnText: '发送验证码',
      remaining: 60,
      isOldPassword: true,
      userInfoMap: {},
      titleType: 1
    }
  },
  mounted() {
    // 初始化图片验证码
    this.gteImgUrl()

    // 初始化用户信息
    userInfo().then(res => {
      console.log(res)
      if (res.code === 200) {
        // 是否已绑定手机号
        this.isOldPassword = res.isOldPassword || true
        this.userInfoMap = res.userInfoMap || {}

        if (this.isOldPassword) {
          // 已绑定手机号
          this.titleType = 1
        } else {
          // 未绑定
          this.titleType = 0
        }
      }
    })
  },
  methods: {
    // 短信验证码封装
    verifyCode(params) {
      return verifyCode(params)
        .then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
          factorySendCode.call(this, 60)
        })
        .catch(() => {
          this.$message.error('请求超时')
        })
    },
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
          if (this.titleType === 1) {
            // type 6 验证原手机号
            this.verifyCode({ ...values, type: 6 })
          } else {
            // type 4 绑定新手机号
            this.verifyCode({ ...values, type: 4 })
          }
        }
      })
    },
    validateUsername,
    validatePassword,
    // 跳转注册
    handelLogin() {
      this.$emit('jumpUser', 'hsy-login')
    },
    // 提交
    handleSubmit(e) {
      e.preventDefault()
      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.loading = false
          // 已绑定手机号
          if (this.isOldPassword) {
            if (this.titleType === 1) {
              // 验证原手机号
              verifyOldPhone({ ...values }).then(res => {
                if (res.code === 200) {
                  console.log(res)
                  // 计时器更新
                  this.remaining = 0
                  // 标题change
                  this.titleType = 0
                  // Input 重置
                  this.form.resetFields()
                } else {
                  this.$message.error(res.message)
                }
              })
            } else {
              updatePhone({ ...values }).then(res => {
                if (res.code === 200) {
                  this.$message.success(res.message)
                } else {
                  this.$message.error(res.message)
                }
              })
            }
          }
          // 新绑定手机号
          if (!this.isOldPassword) {
            updatePhone({ ...values }).then(res => {
              if (res.code === 200) {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
            })
          }
          // 每次点击刷新图片验证码
          this.changeImgCode()
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
