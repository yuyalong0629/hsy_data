<template>
  <div class="permisson" v-if="userInfo && userInfo.userType !== 1">
    立即
    <router-link to="/buyMembers">升级为VIP会员</router-link>&nbsp;查看更多信息
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'permisson',
  data() {
    return {}
  },
  computed: {
    // userinfo
    ...mapGetters({
      userInfo: 'userStorage'
    })
  }
}
</script>

<style lang="less">
.permisson {
  width: 100%;
  color: #999;
  text-align: center;
  font-size: 18px;
  padding: 24px 0;
  a {
    font-weight: 600;
  }
}
</style>
