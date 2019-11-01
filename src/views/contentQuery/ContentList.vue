<template>
  <div class="similar">
    <div class="similar-container">
      <a-divider v-if="pages.keyword">{{ `为您找到相关"${pages.keyword}"共计${pages.counts}条结果` }}</a-divider>
      <a-card
        hoverable
        style="margin: 20px 0;"
        :loading="loading"
        v-for="item of pages.result"
        :key="item.id"
      >
        <div class="similar-content">
          <div class="similar-content-left">
            <div class="similar-content-left-info">
              <div class="similar-avatar">
                <div class="similar-userinfo">
                  <div class="similar-userinfo-title">
                    <a :href="item.sourceUrl" target="_blank" style="color: #333;">
                      <span v-html="item.title && light(item.title, pages.keyword)"></span>
                    </a>
                  </div>
                  <p
                    class="similar-userinfo-link"
                    v-html="item.summary && light(item.summary, pages.keyword)"
                  ></p>
                </div>
              </div>
              <div class="similar-label">
                <a-tag
                  v-for="item of JSON.parse(item.tags)"
                  :key="item.id"
                  v-html="item && light(item, pages.keyword)"
                ></a-tag>
              </div>
              <div class="similar-time">
                <p>发布时间:&nbsp;{{ item.publishTime | formatDate }}</p>
                <p>
                  <span style="margin: 0 12px 0 20px; font-weight: bold;">
                    <a-icon type="youtube" />
                    {{item.playNum}}
                  </span>
                  <span style="margin-right: 12px">
                    <a-icon type="like-o" />
                    {{item.praiseNum}}
                  </span>
                </p>
              </div>
            </div>
            <div class="similar-content-left-fans">
              <p>
                评论:
                <span
                  v-html="item.commentContent && light(item.commentContent.ct ? item.commentContent.ct : item.commentContent, pages.keyword)"
                ></span>
              </p>
              <!-- <p>
                评论时间：
                <span>{{ item.commentContent && item.commentContent.pt }}</span>
              </p>-->
            </div>
          </div>
          <div class="similar-content-right">
            <router-link
              tag="a"
              target="_blank"
              :to="{path: '/details', query: {kolId: item.kolId}}"
            >
              <img :src="item.kolImg" alt />
            </router-link>
            <span>{{ item.kolName }}</span>
            <span>
              粉丝数:
              <i>{{ item.fansNum }}</i>
            </span>
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
  </div>
</template>

<script>
import { light } from 'utils/util'
import moment from 'moment'

export default {
  name: 'ContentList',
  data() {
    return {
      count: 0,
      total: 0,
      current: 1,
      pageInfo: []
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
    // 关键词高亮
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
    }
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
        padding-right: 20px;
        .similar-content-left-info {
          display: flex;
          flex-direction: column;
          .similar-avatar {
            display: flex;
            margin-bottom: 10px;
            .similar-userinfo {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 0px;
              .similar-userinfo-title {
                height: auto;
                line-height: 22px;
                margin-bottom: 6px;
                span {
                  font-weight: 700;
                  font-size: 16px;
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
            margin: 12px 0;
            flex-wrap: wrap;
            .ant-tag {
              margin-bottom: 8px;
            }
          }
          .similar-time {
            display: flex;
            justify-content: space-between;
            padding-right: 12px;
            color: #999;
          }
        }
        .similar-content-left-fans {
          margin-top: 10px;
          padding: 10px 20px 0 0;
          border-top: 1px solid #d9d9d9;
          display: flex;
          justify-content: space-between;
          p {
            line-height: 24px;
            flex: 3;
            // .ellipisisClamp();
          }
          p:last-child {
            flex: 1;
            text-align: left;
          }
        }
      }
      .similar-content-right {
        flex: 0 0 150px;
        border-left: 1px solid #d9d9d9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-left: 18px;
        img {
          width: 102px;
          height: 102px;
          border-radius: 50%;
        }
        span {
          width: 100%;
          text-align: center;
          font-weight: 500;
          line-height: 28px;
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
