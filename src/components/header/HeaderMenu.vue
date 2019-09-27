<template>
  <div class="menu">
    <ul class="nav">
      <li class="nav-list">
        <router-link tag="span" to="/home">首页</router-link>
      </li>
      <li class="nav-list">
        <router-link tag="span" to="/monitor">账号监控</router-link>
      </li>
      <li class="nav-list">
        <router-link tag="span" to="/rank">排行榜</router-link>
      </li>
      <li class="nav-list">
        <router-link tag="span" to="/search">账号搜索</router-link>
      </li>
      <!-- <li class="nav-list">
        <router-link tag="span" to="/about">关于我们</router-link>
      </li>-->
      <li v-if="!hasLogin">
        <div class="logon-btn" @click="handelLogin">登录</div>
        <div class="register-btn" @click="handelRegister">注册</div>
      </li>
      <li v-if="hasLogin" class="nav-userinfo">
        <a-dropdown @visibleChange="visibleChange">
          <div class="action ant-dropdown-link user-dropdown-menu">
            <a-avatar v-if="!userInfo.userImage" style="backgroundColor:#87D068" icon="user" />
            <a-avatar v-if="userInfo.userImage" :src="userInfo.userImage" />
            <div class="username">
              <span class="user-phone">{{ userInfo.nickname || userInfo.phone }}</span>
              <span class="user-vip">{{ userInfo.userType === 0 ? '免费版' : 'VIP会员' }}</span>
            </div>
            <a-icon :type="droptype" />
          </div>
          <a-menu slot="overlay" class="user-dropdown-menu-wrapper" style="marginTop: 24px;">
            <a-menu-item key="0">
              <router-link to="/members">
                <a-icon type="user" style="marginRight: 4px;" />
                <span>会员中心</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="1">
              <router-link to="/myCollection">
                <a-icon type="star" style="marginRight: 4px;" />
                <span>我的收藏</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <router-link to="/buyMembers">
                <a-icon type="crown" style="marginRight: 4px;" />
                <span>购买升级</span>
              </router-link>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="4">
              <a href="javascript:;" @click="handelLogout">
                <a-icon type="logout" style="marginRight: 4px;" />
                <span>退出登录</span>
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </li>
    </ul>
    <a-modal
      :destroyOnClose="true"
      width="400px"
      :title="false"
      :visible="visible"
      @cancel="handleCancel"
      :footer="null"
    >
      <component :is="userTemplate" @visibled="visibled" @jumpUser="jumpUser"></component>
      <a-divider dashed />
      <h3 class="h3-title">欢迎使用火烧云数据</h3>
    </a-modal>
  </div>
</template>

<script>
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import { mixinBasic } from '@/utils/mixin.js'
import { mapGetters } from 'vuex'
import { logout, weixinLogin, weixinBinding } from 'api/user'

export default {
  mixins: [mixinBasic],
  data() {
    return {
      userTemplate: 'hsy-login',
      droptype: 'caret-down'
    }
  },
  mounted() {
    if (this.$route.query.code) {
      const state = this.$route.query.state
      // 微信绑定
      if (state !== 'ef311ed88cf1e31323097f4369a74537') {
        this.wxBind({
          id: this.$route.query.state,
          code: this.$route.query.code
        })
        return
      }
      // 判断是否微信登录
      this.wxlogin({ code: this.$route.query.code })
    }
  },
  methods: {
    // 微信扫码登录
    wxlogin(params) {
      return weixinLogin(params).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.$message.success(res.message)
          this.$store.commit('login', res.userInfoMap)
          this.splitCodeUrl()
        } else {
          this.$message.error(res.message)
          this.splitCodeUrl()
        }
      })
    },
    // 微信绑定
    wxBind(params) {
      return weixinBinding(params).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.$message.success(res.message)
          this.$store.commit('login', res.userInfoMap)
          this.splitCodeUrl()
          this.$router.push({
            path: '/members'
          })
        } else {
          this.$message.error(res.message)
          this.splitCodeUrl()
          this.$router.push({
            path: '/members'
          })
        }
      })
    },
    // 去除微信登录 query
    splitCodeUrl() {
      const currentUrl = window.location.href
      const newUrl = currentUrl.split('?')[0]
      history.pushState('', '', newUrl)
    },
    // 转到登录
    handelLogin() {
      this.visible = true
      this.userTemplate = 'hsy-login'
    },
    // Modal cancel
    handleCancel() {
      this.visible = false
      this.$store.commit('loginModal', false)
    },
    // $emit 跳转注册/登录
    jumpUser(val) {
      this.userTemplate = val
    },
    // 转到注册demo
    handelRegister() {
      this.visible = true
      this.userTemplate = 'hsy-register'
    },
    // $emit Modal
    visibled(val) {
      this.visible = val
    },
    // userinfo下拉回调type
    visibleChange(visible) {
      if (visible) {
        this.droptype = 'caret-up'
      } else {
        this.droptype = 'caret-down'
      }
    },
    // 退出登录
    handelLogout() {
      const that = this
      this.$confirm({
        title: '提示',
        content: '真的要退出登录吗 ?',
        cancelText: '取消',
        okText: '确定',
        onOk() {
          return new Promise((resolve, reject) => {
            logout().then(res => {
              if (res.code === 200) {
                setTimeout(() => {
                  that.$router.replace({ path: '/home' })
                  that.$store.commit('logout', false)
                  that.$message.success('退出成功', 1.5)
                  // window.location.reload()
                  resolve()
                }, 1000)
              }
            })
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userStorage',
      hasLogin: 'hasLogin'
    }),
    loginModal() {
      return this.$store.state.user.loginModal
    }
  },
  watch: {
    loginModal(val) {
      this.visible = val
    }
  },
  components: {
    'hsy-login': Login,
    'hsy-register': Register
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';
@import '~assets/styles/variable.less';

.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  li {
    line-height: 80px;
    color: #fff;
    span {
      cursor: pointer;
    }
  }
  .nav-list {
    .router-link-active {
      color: @active;
    }
    & > span:hover {
      color: @active;
    }
  }
  .logon-btn {
    .navBtn();
    background-color: #723334;
    &:hover {
      background-color: #da5054;
    }
  }
  .register-btn {
    .navBtn();
    background-color: #da5054;
  }
  .nav-userinfo {
    height: 80px;
    width: 140px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .action {
      display: flex;
      flex-direction: row;
      align-items: center;
      .ant-avatar {
        height: 40px;
        width: 40px;
        line-height: 40px;
        margin-right: 10px;
      }
      .username {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        width: 80px;
        // height: 80px;
        .user-phone {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          height: 20px;
          line-height: 20px;
          margin: 0 2px;
          font-size: 12px;
        }
        .user-vip {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          font-size: 12px;
          color: #ebebeb;
          background: #da5054;
          border-radius: 4px;
          width: 50px;
          height: 16px;
          line-height: 16px;
          margin-left: 5px;
        }
      }
    }
  }
}
.h3-title {
  font-size: @h3;
  text-align: center;
}
</style>
