<template>
  <div class="permisson" v-if="userInfo && userInfo.userType !== 1">
    您还不是会员,
    <router-link to="/buyMembers">立即升级会员版本</router-link>查看更多
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
