<template>
  <div class="header">
    <header class="header-wrapper">
      <a-row class="header-nav">
        <a-col :span="6">
          <Logo />
        </a-col>
        <a-col :span="14" :offset="4">
          <HeaderMenu />
        </a-col>
      </a-row>
    </header>
  </div>
</template>

<script>
import Logo from '@/components/logo/Logo'
import HeaderMenu from './HeaderMenu'

export default {
  data() {
    return {}
  },
  components: {
    Logo,
    HeaderMenu
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';

.header {
  flex: 0 0 80px;
  background: #091514;
  .header-wrapper {
    height: 80px;
    .basicWidth();
    .header-nav {
      height: 80px;
    }
  }
}
</style>
