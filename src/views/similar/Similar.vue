<template>
  <div class="similar">
    <a-spin :spinning="spinning">
      <hsy-skeleton v-if="!data.length" />

      <div class="similar-container" v-if="data.length">
        <a-divider>{{ `共计${count}条结果` }}</a-divider>
        <a-card
          hoverable
          style="margin: 20px 0;"
          :loading="loading"
          v-for="item of data"
          :key="item.id"
        >
          <div class="similar-content">
            <div class="similar-content-left">
              <div class="similar-content-left-info">
                <div class="similar-avatar">
                  <img :src="item.kolImg" alt />
                  <div class="similar-userinfo">
                    <div class="similar-userinfo-title">
                      <router-link
                        tag="span"
                        :to="{path: '/details', query: {kolId: item.kolId}}"
                      >{{ item.kolName }}</router-link>
                      <span>{{ `LV${item.platformGrade}` }}</span>
                      <span>{{ item.isVip }}</span>
                    </div>
                    <p class="similar-userinfo-link">{{ item.kolSummary }}</p>
                  </div>
                  <div class="similar-cloud">
                    <h2>{{ item.indexNum }}</h2>
                    <a-popover class="user-right-icon" placement="bottomLeft" :title="false">
                      <template slot="content">
                        <p
                          style="width: 200px;"
                        >云指数是系统基于账号粉丝活跃度、作品原创度、作品内容质量、作品完播度以及平均评论和点赞量等数据分析得出的综合评分</p>
                      </template>
                      云指数
                      <a-icon type="question-circle" />
                    </a-popover>
                  </div>
                </div>
                <div class="similar-label">
                  <a-tag v-for="item of item.sortFlag" :key="item.id">{{ item.name }}</a-tag>
                </div>
              </div>
              <div class="similar-content-left-fans">
                <ul>
                  <li>
                    <p>粉丝数</p>
                    <h4>{{ item.fansNum }}</h4>
                  </li>
                  <li>
                    <p>作品发布数</p>
                    <h4>{{ item.videoNum }}</h4>
                  </li>
                  <li>
                    <p>平均播放数</p>
                    <h4>{{ item.avgPlayNum }}</h4>
                  </li>
                  <li>
                    <p>平均评论数</p>
                    <h4>{{ item.avgCommentNum }}</h4>
                  </li>
                  <li>
                    <p>平均点赞数</p>
                    <h4>{{ item.avgPraiseNum }}</h4>
                  </li>
                </ul>
              </div>
            </div>
            <div class="similar-content-right">
              <a-button @click="clickDetail(item.kolId)">查看详情</a-button>
              <a-button @click="clickSimilar(item.kolId)">相似账号</a-button>
              <a-button @click="handelClickAnalysis(item.kolId)">
                投前分析
                <img src="../../assets/image/vip.png" alt />
              </a-button>
              <a-button @click="clickCollention(item.kolId)">收藏账号</a-button>
            </div>
          </div>
        </a-card>
        <div class="similar-page">
          <a-pagination
            :total="total"
            :hideOnSinglePage="true"
            :pageSize="20"
            @change="changePage"
          />
        </div>
      </div>

      <!-- 收藏账号 -->
      <a-modal title="添加到分组" :visible="visible" width="420px" :footer="null" @cancel="handleCancel">
        <hsy-collection :kolId="kolId" />
      </a-modal>

      <hsy-permisson />
    </a-spin>
  </div>
</template>

<script>
import { similarKolList } from 'api/similar'
import Collection from '@/components/collection/Collection'
import { mapGetters } from 'vuex'
import Permisson from '@/components/permisson/Permisson'
import Skeleton from '@/components/skeleton/Skeleton'

export default {
  name: 'Similar',
  data() {
    return {
      count: 0,
      loading: false,
      total: 0,
      data: [],
      visible: false,
      spinning: false,
      kolId: ''
    }
  },
  mounted() {
    this.similarKolList({ kolId: this.$route.query.kolId, pageNo: 0 })
  },
  methods: {
    // 初始化
    similarKolList(params) {
      this.loading = true
      this.spinning = true
      return similarKolList(params)
        .then(res => {
          if (res.code === 200) {
            this.count = res.count
            this.data = res.page.result
            this.loading = false
            this.spinning = false
            this.total = res.page.total
          } else {
            this.spinning = false
          }
        })
        .catch(() => {
          this.spinning = false
        })
    },
    // 分页
    changePage(page, pageSize) {
      console.log(page)
      this.similarKolList({ kolId: this.$route.query.kolId, pageNo: page })
    },
    // 查看详情
    clickDetail(id) {
      const routeData = this.$router.resolve({
        path: '/details',
        query: { kolId: id }
      })
      window.open(routeData.href, '_blank')
    },
    // 相似账号
    clickSimilar(id) {
      this.similarKolList({ kolId: id, pageNo: 0 })
    },
    // 投前分析
    handelClickAnalysis(id) {
      if (this.userInfo.userType === 1) {
        this.$router.push({
          path: '/analysis',
          query: {
            kolId: id
          }
        })
      } else {
        this.$message.warn('您还不是会员,无法使用此功能')
      }
    },
    // 收藏账号
    clickCollention(id) {
      this.visible = true
      this.kolId = id
    },
    // Modal
    handleCancel() {
      this.visible = false
    }
  },
  computed: {
    // info
    ...mapGetters({
      userInfo: 'userStorage'
    })
  },
  components: {
    'hsy-collection': Collection,
    'hsy-permisson': Permisson,
    'hsy-skeleton': Skeleton
  }
}
</script>

<style lang="less" scoped>
@import '~assets/styles/mixins.less';
@import '~assets/styles/variable.less';

.similar {
  width: 100%;
  height: 100%;
  background: #f1f5f6;
  .similar-container {
    .basicWidth();
    padding: 12px 0;
    .similar-content {
      display: flex;
      .similar-content-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        .similar-content-left-info {
          display: flex;
          flex-direction: column;
          .similar-avatar {
            display: flex;
            margin-bottom: 10px;
            img {
              flex: 0 0 82px;
              height: 82px;
            }
            .similar-userinfo {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 20px;
              .similar-userinfo-title {
                height: 30px;
                line-height: 30px;
                span:nth-child(1) {
                  font-weight: 700;
                  font-size: 16px;
                }
                span:nth-child(2) {
                  background: #eb000e;
                  color: #fff;
                  margin: 0 10px;
                  padding: 0 5px;
                  font-size: 12px;
                  border-radius: 3px;
                }
                span:nth-child(3) {
                  background: #ef73a9;
                  color: #fff;
                  padding: 0 5px;
                  font-size: 12px;
                  border-radius: 3px;
                }
              }
              .similar-userinfo-link {
                min-height: 20px;
                line-height: 20px;
              }
            }
            .similar-cloud {
              flex: 0 0 100px;
              text-align: center;
              h2 {
                width: 100%;
                line-height: 45px;
                color: @gloableColor;
                font-size: 26px;
                text-align: center;
              }
              .user-right-icon {
                width: 100%;
                text-align: center;
              }
            }
          }
          .similar-label {
            display: flex;
          }
        }
        .similar-content-left-fans {
          padding: 20px 20px 0 0;
          ul {
            border-top: 1px solid #d9d9d9;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding-top: 24px;
            li {
              p {
                line-height: 30px;
                text-align: center;
              }
              h4 {
                font-size: 18px;
                text-align: center;
                line-height: 30px;
              }
            }
          }
        }
      }
      .similar-content-right {
        flex: 0 0 136px;
        border-left: 1px solid #d9d9d9;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-end;
        .ant-btn-default {
          padding: 0 20px;
          margin: 5px;
          img {
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
    }
    .similar-page {
      width: 100%;
      margin: 24px 0;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
