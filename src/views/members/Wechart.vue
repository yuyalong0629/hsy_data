<template>
  <div class="login">
    <a-tabs :forceRender="true" :activeKey="activeKey" :tabBarStyle="{'text-align': 'center'}">
      <a-tab-pane key="1">
        <span slot="tab">
          <icon-font type="icon-weixin" />
          {{ thirdAccountInfo.nickname ? '更换微信' : '绑定微信'}}
        </span>
        <div id="login_container"></div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'
import { userInfo } from 'api/user'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: require('../../assets/font/iconfont') // 在 iconfont.cn 上生成
})

export default {
  data() {
    return {
      activeKey: '1',
      userInfoId: '',
      thirdAccountInfo: ''
    }
  },
  created() {
    // 初始化用户信息
    userInfo().then(res => {
      console.log(res)
      if (res.code === 200) {
        // 是否已绑定手机号
        this.userInfoId = res.userInfoMap.id || ''
        this.thirdAccountInfo = res.thirdAccountInfo || ''
      }
    })
  },
  mounted() {
    const wxLogin = new WxLogin({
      id: 'login_container',
      appid: 'wx05050984d40b684f',
      scope: 'snsapi_login',
      redirect_uri: 'http://www.hsydata.com/',
      state: this.userInfoId,
      style: 'black',
      href:
        'data:text/css;base64,LnRpdGxlIHsKICBkaXNwbGF5OiBub25lOwp9CgouaW5mbyB7CiAgZGlzcGxheTogbm9uZTsKfQo='
    })
  },
  methods: {},
  components: {
    'icon-font': MyIcon
  }
}
</script>

<style lang="less" scope>
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
    height: 300px;
    .wrp_code .impowerBox .qrcode {
      margin-top: 10px;
    }
  }
}
</style>
