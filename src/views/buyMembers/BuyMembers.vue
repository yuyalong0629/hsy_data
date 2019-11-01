<template>
  <div class="buyMembers">
    <div class="buyMembers-container">
      <h2 class="buyMembers-contrast">特权对比</h2>
      <a-table :columns="columns" :dataSource="data" :pagination="false">
        <template slot="permissionlTitle">
          <div class="buyMembers-vip">
            <p>会员权限</p>
          </div>
        </template>
        <template slot="normalTitle">
          <div class="buyMembers-vip">
            <p>普通会员</p>
          </div>
        </template>
        <template slot="vipTitle">
          <div class="buyMembers-vip">
            <p>VIP会员</p>
            <button type="button" @click="onClickPay" v-if="userInfo.userType !== 1">立即升级</button>
          </div>
        </template>
      </a-table>
      <div class="buyMembers-more">更多功能体验，敬请期待</div>
    </div>
  </div>
</template>

<script>
import { columns, data } from './index'
import { mapGetters } from 'vuex'

export default {
  name: 'buyMembers',
  data() {
    return {
      columns,
      data
    }
  },
  methods: {
    onClickPay() {
      this.$router.push({ path: '/pay' })
    }
  },
  computed: {
    // userinfo
    ...mapGetters({
      userInfo: 'userStorage'
    })
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';
@import '~assets/styles/variable.less';

.buyMembers {
  width: 100%;
  .buyMembers-container {
    .basicWidth();

    .buyMembers-contrast {
      font-size: @h2;
      margin: 60px 0;
      text-align: center;
      font-size: 34px;
      color: #4d0014;
      letter-spacing: 12px;
    }
    .buyMembers-vip {
      p {
        color: #4d0014;
        font-size: 20px;
        font-weight: 500;
        line-height: 36px;
      }
      button {
        background: #4d0014;
        font-size: 16px;
        color: #fff;
        border: 0;
        padding: 5px 10px;
        border-radius: 4px;
      }
    }

    .buyMembers-more {
      text-align: center;
      margin: 24px 0;
      font-size: 22px;
      color: #999;
    }
  }
}
</style>
