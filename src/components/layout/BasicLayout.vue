<template>
  <div class="layout-view">
    <hsy-header />
    <div class="router-view">
      <router-view />
    </div>
    <hsy-footer />
    <hst-backtop />
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import BackTop from '@/components/backTop/BackTop'

export default {
  data() {
    return {}
  },
  components: {
    'hsy-header': Header,
    'hsy-footer': Footer,
    'hst-backtop': BackTop
  }
}
</script>

<style lang="less" scope>
.layout-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  .router-view {
    flex: 1;
  }
}
</style>
