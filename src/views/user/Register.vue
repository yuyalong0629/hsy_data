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
          <icon-font type="icon-weixin" />扫码注册
        </span>
        <div id="login_container"></div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'
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
      activeKey: '1'
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
