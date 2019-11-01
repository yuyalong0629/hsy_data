<template>
  <!-- <div class="attention"></div> -->
  <a-tabs :forceRender="true" :activeKey="activeKey" :tabBarStyle="{'text-align': 'center'}">
    <a-tab-pane key="1">
      <span slot="tab">
        <icon-font type="icon-weixin" />关注公众号获得更多资讯和报告
      </span>
      <div class="attention-img">
        <img :src="getImgUrl" alt />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { Icon } from 'ant-design-vue'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: require('../../assets/font/iconfont') // 在 iconfont.cn 上生成
})

export default {
  name: 'attention',
  data() {
    return {
      activeKey: '1'
    }
  },
  computed: {
    getImgUrl() {
      if (this.$ls.get('imgUrl')) {
        return this.$ls.get('imgUrl')
      }
    }
  },
  components: {
    'icon-font': MyIcon
  }
}
</script>

<style lang="less" scoped>
.attention-img {
  width: 100%;
  text-align: center;
  img {
    width: 258px;
    height: 258px;
    border: 1px solid #ececec;
  }
}
</style>
