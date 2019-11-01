<template>
  <div class="members">
    <div class="members-container">
      <div class="members-title">
        <a-button type="primary">会员信息</a-button>
        <p>申请发票</p>
      </div>
      <div class="members-user">
        <hsy-upload :userImage="userInfo.userImage" @propsFileList="propsFileList" />
        <div class="members-user-phone">
          <p>
            <span>{{ userInfo.nickname || userInfo.phone }}</span>
            <span>{{ userInfo.userType === 1 ? 'VIP会员' : '免费版' }}</span>
          </p>
          <p v-if="userInfo.userType === 1 && overTime">
            <span>会员到期时间：{{ overTime.maturityTime }}</span>
            <span></span>
          </p>
        </div>
      </div>
      <p style="float: right; margin-bottom: 12px;">
        <a href="javascript:;" @click="changePwd">修改密码</a>
      </p>
      <a-divider />
      <div class="members-phone">
        <div class="members-phone-left">
          <p>{{ `手机号码:&nbsp;&nbsp;${userInfo.phone}` }}</p>
          <p>{{ `微信昵称:&nbsp;&nbsp;${thirdAccountInfo && thirdAccountInfo.nickname}` }}</p>
        </div>
        <div class="members-phone-right">
          <a href="javascript:;" @click="onChangePhone">{{ isOldPassword ? '更换号码' :'绑定号码' }}</a>
          <a href="javascript:;" @click="onChangeWechart">{{ !thirdAccountInfo ? '绑定微信' : '更换微信' }}</a>
        </div>
      </div>
      <a-divider />
      <div class="members-permission">
        <a-table size="middle" :columns="columns" :dataSource="data" :pagination="false"></a-table>
      </div>
    </div>
    <!-- Modal -->
    <a-modal
      :destroyOnClose="true"
      width="400px"
      :title="false"
      :visible="visible"
      @cancel="handleCancel"
      :footer="null"
    >
      <component :is="userTemplate"></component>
      <a-divider dashed />
      <h3 class="h3-title">欢迎使用火烧云数据</h3>
    </a-modal>
  </div>
</template>

<script>
import { columns, data } from './index'
import { mapGetters } from 'vuex'
import Phone from './Phone'
import Wechart from './Wechart'
import Retrieve from '@/views/user/Retrieve'
import { userInfo, setCoverImage } from 'api/user'
import Upload from '@/components/upload/Upload'

export default {
  name: 'Members',
  data() {
    return {
      columns,
      data,
      visible: false,
      userTemplate: undefined,
      isOldPassword: false,
      thirdAccountInfo: '',
      overTime: ''
    }
  },
  mounted() {
    // 初始化用户信息
    userInfo().then(res => {
      if (res.code === 200) {
        // 是否已绑定手机号
        this.isOldPassword = res.isOldPassword || false
        this.thirdAccountInfo = res.thirdAccountInfo || ''
        this.overTime = res.maturityTime || ''
      }
    })
  },
  methods: {
    // upload
    propsFileList(val) {
      setCoverImage({
        imageUrl: val
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.$store.commit('login', res.userInfoMap)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // Modal cancel
    handleCancel() {
      this.visible = false
    },
    // 更换手机号
    onChangePhone() {
      this.visible = true
      this.userTemplate = 'hsy-phone'
    },
    // 绑定微信
    onChangeWechart() {
      this.visible = true
      this.userTemplate = 'hsy-wechart'
    },
    // 修改密码
    changePwd() {
      this.visible = true
      this.userTemplate = 'hsy-retrieve'
    }
  },
  computed: {
    userInfo() {
      const userInfo = this.$store.getters.userStorage
      if (userInfo) {
        return userInfo
      } else {
        return {}
      }
    }
  },
  components: {
    'hsy-phone': Phone,
    'hsy-wechart': Wechart,
    'hsy-retrieve': Retrieve,
    'hsy-upload': Upload
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';
@import '~assets/styles/variable.less';

.members {
  width: 100%;
  .members-container {
    width: 1000px;
    margin: 0 auto;

    .members-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 40px 0;
      p {
        color: #999;
      }
    }

    .members-user {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      .members-user-phone {
        margin: 0 20px;
        p {
          height: 24px;
          line-height: 24px;
          display: flex;
          align-items: center;
          &:nth-child(1) {
            span:nth-child(1) {
              font-size: 20px;
              margin-right: 10px;
              font-weight: 500;
            }
            span:nth-child(2) {
              font-size: 12px;
              margin-right: 10px;
              height: 16px;
              line-height: 16px;
              display: inline-block;
              background: @gloableColor;
              color: #fff;
              border-radius: 3px;
              padding: 0 5px;
            }
          }
          &:nth-child(2) {
            color: #999;
            font-size: 12px;
          }
        }
      }
    }

    .members-phone {
      display: flex;
      justify-content: space-between;
      .members-phone-left {
        display: flex;
        flex-direction: column;
        p {
          line-height: 24px;
          font-weight: 500;
        }
      }
      .members-phone-right {
        display: flex;
        flex-direction: column;
        a {
          line-height: 24px;
        }
      }
    }

    .members-permission {
      margin-bottom: 24px;
      table {
        border: 3px solid @gloableColor;
      }
      .ant-table-thead > tr > th {
        background: @gloableColor;
        color: #fff;
      }
      .ant-table-tbody > tr:nth-child(even) {
        background: #fcefef;
      }
    }
  }
}
</style>
