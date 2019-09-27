<template>
  <div class="user">
    <div class="user-container">
      <div class="user-left">
        <div class="user-left-img">
          <img v-lazy="kolInfos.kolImg" :alt="kolInfos.kolName" />
        </div>
        <div class="user-left-info">
          <div class="user-left-info-title">
            <h4>{{ kolInfos.kolName }}</h4>
            <span class="user-left-info-title-lv">{{ `LV${kolInfos.platformGrade}` }}</span>
            <span class="user-left-info-title-vip">{{ kolInfos.isVip }}</span>
            <span class="user-left-info-title-fans" v-if="kolInfos.isFansBadge">粉</span>
          </div>
          <div class="user-left-info-text">
            <p>{{ `认证信息：${kolInfos.isApprove},${kolInfos.approveDescription}` }}</p>
            <p>{{ `账户简介：${kolInfos.kolSummary}` }}</p>
          </div>
        </div>
      </div>
      <div class="user-right">
        <h2>{{ kolInfos.indexNum }}</h2>
        <a-popover class="user-right-icon" placement="bottomLeft" :title="false">
          <template slot="content">
            <p style="width: 200px;">云指数是系统基于账号粉丝活跃度、作品原创度、作品内容质量、作品完播度以及平均评论和点赞量等数据分析得出的综合评分</p>
          </template>
          云指数
          <a-icon type="question-circle" />
        </a-popover>
      </div>
    </div>
    <div class="user-label">
      <a-tag v-for="item of kolTotalDatas.sortFlag" :key="item.id">{{ item.name }}</a-tag>
    </div>
    <div class="user-operating" v-if="isAnalysis">
      <a-button-group>
        <a-button @click="handleClickCollection">收藏账号</a-button>
        <a-button @click="handelClickSimilar">相似账号</a-button>
        <a-button @click="handelClickMonitor(kolInfos.kolName)">监控下次作品</a-button>
        <a-button @click="handelClickAnalysis">
          投前分析
          <img src="../../assets/image/vip.png" alt />
        </a-button>
      </a-button-group>
    </div>
    <!-- 收藏账号 -->
    <a-modal title="添加到分组" :visible="visible" width="420px" :footer="null" @cancel="handleCancel">
      <hsy-collection />
    </a-modal>
    <div class="user-fans" v-if="isAnalysis">
      <ul class="user-fans-left">
        <li class="user-fans-left-item">
          <p>粉丝数</p>
          <h4>{{ kolTotalDatas.fansNum }}</h4>
        </li>
        <li class="user-fans-left-item">
          <p>作品发布数</p>
          <h4>{{ kolTotalDatas.videoNum }}</h4>
        </li>
        <li class="user-fans-left-item">
          <p>平均播放数</p>
          <h4>{{ kolTotalData.avgPlayNum }}</h4>
        </li>
        <li class="user-fans-left-item">
          <p>平均点赞数</p>
          <h4>{{ kolTotalData.avgPraiseNum }}</h4>
        </li>
        <li class="user-fans-left-item">
          <p>
            <a-popover class="user-right-icon" placement="bottomLeft" :title="false">
              <template slot="content">
                <p
                  style="width: 200px;"
                >充电数是粉丝对喜欢的UP主进行的一种赞赏数据，UP主可以拿到粉丝给的充电电池数量按照一定的比例兑换成现金，然后申请提现。</p>
              </template>
              充电数
              <a-icon type="question-circle" />
            </a-popover>
          </p>
          <h4>{{ kolTotalDatas.chargingNum }}</h4>
        </li>
      </ul>
      <ul class="user-fans-right">
        <li class="user-fans-left-item">
          <p>&nbsp;</p>
          <p>总数</p>
          <p>平均</p>
        </li>
        <li class="user-fans-left-item">
          <p>收藏数</p>
          <h4>{{ kolTotalDatas.collectNum }}</h4>
          <h4>{{ kolTotalDatas.avgCollectNum }}</h4>
        </li>
        <li class="user-fans-left-item">
          <p>评论数</p>
          <h4>{{ kolTotalDatas.commentNum }}</h4>
          <h4>{{ kolTotalDatas.avgCommentNum }}</h4>
        </li>
        <li class="user-fans-left-item">
          <p>
            <a-popover class="user-right-icon" placement="bottomLeft" :title="false">
              <template slot="content">
                <p
                  style="width: 200px;"
                >硬币数是粉丝对优秀的视频作品进行投币支持和认可的一种硬币化表示数；是对UP主的一种肯定，硬币还可用于修改昵称、购买标识、参与活动等</p>
              </template>
              投硬币数
              <a-icon type="question-circle" />
            </a-popover>
          </p>
          <h4>{{ kolTotalDatas.castCurrencyNum }}</h4>
          <h4>{{ kolTotalDatas.avgCastCurrencyNum }}</h4>
        </li>
        <li class="user-fans-left-item">
          <p>弹幕数</p>
          <h4>{{ kolTotalDatas.barrageNum }}</h4>
          <h4>{{ kolTotalDatas.avgBarrageNum }}</h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Collection from '@/components/collection/Collection'
import { mapGetters } from 'vuex'

export default {
  name: 'user',
  data() {
    return {
      visible: false,
      checked1: false
    }
  },
  props: {
    kolInfo: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
    kolTotalData: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
    analysis: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    // 收藏账号
    handleClickCollection() {
      if (!this.hasLogin) {
        // 未登录状态显示登录 Modal
        this.$store.commit('loginModal', true)
        return
      }
      this.visible = true
    },
    // 相似账号
    handelClickSimilar() {
      if (!this.hasLogin) {
        // 未登录状态显示登录 Modal
        this.$store.commit('loginModal', true)
        return
      }
      this.$router.push({
        path: '/similar',
        query: {
          kolId: this.$route.query.kolId
        }
      })
    },
    // 监控下次作品
    handelClickMonitor(name) {
      if (!this.hasLogin) {
        // 未登录状态显示登录 Modal
        this.$store.commit('loginModal', true)
        return
      }
      this.$router.push({
        path: '/monitor',
        query: {
          kolId: this.$route.query.kolId,
          name: name
        }
      })
    },
    // 投前分析
    handelClickAnalysis() {
      if (!this.hasLogin) {
        // 未登录状态显示登录 Modal
        this.$store.commit('loginModal', true)
        return
      }
      if (this.userInfo.userType === 1) {
        this.$router.push({
          path: '/analysis',
          query: {
            kolId: this.$route.query.kolId
          }
        })
      } else {
        this.$message.warn('您还不是会员,无法使用此功能')
      }
    },
    // Modal
    handleCancel() {
      this.visible = false
    }
  },
  computed: {
    kolInfos() {
      return this.kolInfo
    },
    kolTotalDatas() {
      return this.kolTotalData
    },
    isAnalysis() {
      return this.analysis
    },
    // userinfo
    ...mapGetters({
      userInfo: 'userStorage',
      hasLogin: 'hasLogin'
    })
  },
  components: {
    'hsy-collection': Collection
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';
@import '~assets/styles/variable.less';

.user {
  .user-container {
    display: flex;
    margin: 40px 0 20px;
    .user-left {
      flex: 1;
      display: flex;
      .user-left-img {
        margin-right: 20px;
        img {
          width: 90px;
          height: 90px;
        }
      }
      .user-left-info {
        flex: 1;
        display: flex;
        align-content: center;
        flex-wrap: wrap;
        .user-left-info-title {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 10px;
          align-items: center;
          h4 {
            font-size: 16px;
            font-weight: 500;
            margin-right: 20px;
          }
          span {
            margin: 0 5px;
            font-size: 12px;
            line-height: 12px;
            display: inline-block;
            border-radius: 4px;
          }
          .user-left-info-title-lv {
            background: #eb000e;
            color: #fff;
            padding: 3px 4px;
          }
          .user-left-info-title-vip {
            background: #ef73a9;
            color: #fff;
            padding: 3px 4px;
          }
          .user-left-info-title-fans {
            border: 1px solid #ef73a9;
            color: #da3237;
            padding: 3px 4px;
          }
        }
        .user-left-info-text {
          display: flex;
          flex-direction: column;
          p {
            width: 100%;
            line-height: 20px;
            color: #c6c6c6;
            font-size: 14px;
          }
        }
      }
    }
    .user-right {
      flex: 0 0 100px;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      h2 {
        width: 100%;
        line-height: 45px;
        color: @gloableColor;
        font-size: @h2;
        text-align: center;
      }
      .user-right-icon {
        text-align: center;
      }
    }
  }

  .user-operating {
    margin: 20px 0;
    .ant-btn-default {
      padding: 0 20px;
      margin-left: -1px;
      img {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }

  .user-fans {
    border-top: 2px solid #ececec;
    border-bottom: 2px solid #ececec;
    display: flex;
    .user-fans-left {
      flex: 1;
      display: flex;
      justify-content: space-around;
      border-right: 2px solid #ececec;
      margin: 20px 0;
      p {
        line-height: 42px;
        text-align: center;
      }
      h4 {
        font-size: 18px;
        text-align: center;
        line-height: 42px;
      }
    }
    .user-fans-right {
      flex: 1;
      flex: 1;
      display: flex;
      justify-content: space-around;
      margin: 10px 0;
      p {
        line-height: 30px;
        text-align: center;
      }
      h4 {
        font-size: @h4;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
.ant-modal-content {
  .ant-modal-header {
    background: @gloableColor;
    .ant-modal-title {
      color: #fff;
    }
  }
  .ant-modal-close {
    .ant-modal-close-x {
      i {
        color: #fff;
      }
    }
  }
}
</style>
