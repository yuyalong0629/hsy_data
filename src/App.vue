<template>
  <a-locale-provider :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'app',
  data() {
    return {
      zhCN
    }
  }
}
</script>

<style lang="less">
@import '~assets/styles/reset.less';

#app {
  height: 100%;
}
</style>
