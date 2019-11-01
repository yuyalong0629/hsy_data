<template>
  <div class="bind">
    <a-tabs
      :forceRender="true"
      :activeKey="activeKey"
      @change="changeTab"
      :tabBarStyle="{'text-align': 'center'}"
    >
      <!-- <a-tab-pane key="1">
        <span slot="tab">
          <icon-font type="icon-weixin" />已有账号
        </span>
        <hsy-bindUser :taId="taId" />
      </a-tab-pane>-->
      <a-tab-pane key="1">
        <span slot="tab">
          <icon-font type="icon-dengluren" />绑定手机号
        </span>
        <hsy-bindRegister :taId="taId" :userState="userState" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'
// import BindUser from './BindUser'
import BindRegister from './BindRegister'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: require('../../assets/font/iconfont') // 在 iconfont.cn 上生成
})

export default {
  name: 'Bind',
  data() {
    return {
      activeKey: '1'
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
  methods: {
    // Tab切换
    changeTab(key) {
      this.activeKey = key
    }
  },
  components: {
    // 'hsy-bindUser': BindUser,
    'hsy-bindRegister': BindRegister,
    'icon-font': MyIcon
  }
}
</script>

<style lang="less" scoped>
</style>
