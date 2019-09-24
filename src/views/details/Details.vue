<template>
  <div class="detail">
    <div class="detail-container">
      <hsy-user :kolInfo="kolInfo" :kolTotalData="kolTotalData" :analysis="analysis" />
      <hsy-list />
      <hsy-permisson />
    </div>
  </div>
</template>

<script>
import User from './User'
import List from './List'
import { getDetails } from './index'
import Permisson from '@/components/permisson/Permisson'

export default {
  name: 'Details',
  data() {
    return {
      kolInfo: {},
      kolTotalData: {},
      pageInfo: {},
      analysis: true
    }
  },
  mounted() {
    // 初始化历史作品内容
    getDetails.call(this, { kolId: this.$route.query.kolId, pageNo: 0 })
  },
  methods: {},
  components: {
    'hsy-user': User,
    'hsy-list': List,
    'hsy-permisson': Permisson
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';

.detail {
  width: 100%;
  .detail-container {
    .basicWidth();
  }
}
</style>
