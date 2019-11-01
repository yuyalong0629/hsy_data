<template>
  <div class="similar">
    <div class="similar-container">
      <a-divider v-if="pages.keyword">{{ `为您找到相关"${pages.keyword}"共计${pages.counts}条结果` }}</a-divider>
      <a-card
        hoverable
        style="margin: 20px 0;"
        :loading="loading"
        v-for="(item, index) of pages.result"
        :key="index"
      >
        <div class="similar-content">
          <div class="similar-content-left">
            <div class="similar-content-left-info">
              <div class="similar-avatar">
                <img :src="item.kolImg" alt />
                <div class="similar-userinfo">
                  <div class="similar-userinfo-title">
                    <router-link
                      tag="a"
                      target="_blank"
                      :to="{path: '/details', query: {kolId: item.kolId}}"
                      v-html="item && light(item.kolName, pages.keyword)"
                    ></router-link>
                    <span>{{ `LV${item.platformGrade}` }}</span>
                    <span>{{ item.isVip }}</span>
                  </div>
                  <p
                    class="similar-userinfo-link"
                    v-html="item && light(item.kolSummary, pages.keyword)"
                  ></p>
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
            <a-button @click="clickAnalysis(item.kolId)">
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
          :current="current"
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
  </div>
</template>

<script>
import Collection from '@/components/collection/Collection'
import { mapGetters } from 'vuex'
import { light } from 'utils/util'

export default {
  name: 'Similar',
  data() {
    return {
      count: 0,
      total: 0,
      current: 1,
      visible: false,
      kolId: undefined
    }
  },
  props: {
    pages: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    // 相似号
    light,
    // 分页
    changePage(page, pageSize) {
      this.current = page
      this.$emit('pageNo', page - 1)
      // 锚点定位
      const anchor = document.querySelector('.similar')
      if (anchor) {
        anchor.scrollIntoView(true)
      }
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
      if (!this.hasLogin) {
        this.$store.commit('loginModal', true)
        return
      }
      this.$router.push({
        path: '/similar',
        query: { kolId: id }
      })
    },
    // 投前分析
    clickAnalysis(id) {
      if (!this.hasLogin) {
        this.$store.commit('loginModal', true)
        return
      }
      this.$router.push({
        path: '/analysis',
        query: { kolId: id }
      })
    },
    // 收藏账号
    clickCollention(id) {
      if (!this.hasLogin) {
        this.$store.commit('loginModal', true)
        return
      }
      this.visible = true
      this.kolId = id
    },
    // Modal
    handleCancel() {
      this.visible = false
    }
  },
  computed: {
    // userinfo
    ...mapGetters({
      userInfo: 'userStorage',
      hasLogin: 'hasLogin'
    })
  },
  watch: {
    pages: {
      handler(val) {
        if (val) {
          this.total = val.count
          this.current = val.index === 0 ? 1 : +val.index + 1
        }
      },
      immediate: true,
      deep: true
    }
  },
  components: {
    'hsy-collection': Collection
  }
}
</script>

<style lang="less" scoped>
@import '~assets/styles/mixins.less';
@import '~assets/styles/variable.less';

.similar {
  width: 100%;
  .similar-container {
    .basicWidth();
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
                a {
                  color: #000;
                  font-weight: 700;
                  font-size: 15px;
                }
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
