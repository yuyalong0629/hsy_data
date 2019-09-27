<template>
  <div class="list-content">
    <div class="list-content-title">
      <h4>{{ `视频作品数据(${this.listData.count})` }}</h4>
    </div>
    <a-list
      :loading="loading"
      itemLayout="vertical"
      size="large"
      :pagination="pagination"
      :dataSource="this.listData.result"
    >
      <a-list-item slot="renderItem" slot-scope="item" :key="item.title">
        <!-- img -->
        <template slot="actions">
          <div class="list-info-extra">
            <a target="_blank" :href="item.sourceUrl">
              <img width="240" height="160" alt :src="item.coverImg" />
            </a>
            <a href="javascript:;" style="color: #888;" @click="copylink(item.sourceUrl)">
              <a-icon type="link" />复制作品链接
            </a>
          </div>
        </template>
        <template slot="extra">
          <!-- content -->
          <div class="list-info-content">
            <a-list-item-meta>
              <a
                slot="title"
                target="_blank"
                :href="item.sourceUrl"
                v-html="listData.keyword ? light(item.title, listData.keyword) : item.title"
              >{{item.title}}</a>
            </a-list-item-meta>
            <a-popover placement="bottom">
              <template slot="content">
                <p
                  style="width: 360px; line-height: 24px;"
                  v-html="listData.keyword ? light(item.summary, listData.keyword) : item.summary"
                >{{item.summary}}</p>
              </template>
              <p
                class="list-info-text"
                v-html="listData.keyword ? light(item.summary, listData.keyword) : item.summary"
              >{{item.summary}}</p>
            </a-popover>
            <!-- icon -->
            <a-tag
              class="list-info-tag"
              v-for="(cItem, index) in item.tags"
              :key="index"
              v-html="listData.keyword ? light(cItem, listData.keyword) : cItem"
            >{{ cItem }}</a-tag>
          </div>
          <div class="list-info-actions">
            <p class="list-info-time">{{`发布时间：${item.publishTime}`}}</p>
            <div class="list-info-actions-icon">
              <span style="margin-right: 12px">
                <a-icon type="youtube" />
                {{item.playNum}}
              </span>
              <span style="margin-right: 12px">
                <a-icon type="star-o" />
                {{item.praiseNum}}
              </span>
              <span style="margin-right: 12px">
                <a-icon type="like-o" />
                {{item.collectNum}}
              </span>
              <span
                @click="handleComment(item.comments, listData.keyword)"
                style="margin-right: 12px; cursor: pointer;"
              >
                <a-icon type="message" style="color: #DA5054" />
                {{item.barrageNum}}
              </span>
            </div>
          </div>
        </template>
      </a-list-item>
    </a-list>
    <!-- comment -->
    <a-modal
      :title="title"
      :destroyOnClose="true"
      :visible="visible"
      :footer="null"
      @cancel="handleCancel"
    >
      <hsy-comment :comment="comment" />
    </a-modal>
  </div>
</template>

<script>
import Comment from './Comment'
import { getDetails, insearchData } from './index'
import { mapState } from 'vuex'
import { light } from 'utils/util'

export default {
  name: 'ListContent',
  data() {
    return {
      pagination: {
        onChange: page => {
          this.pagination.current = page
          if (this.listData.isSearch) {
            // 号内搜
            this.$emit('pageNo', page)
            return
          }
          // 历史作品内容分页请求
          getDetails.call(this, {
            kolId: this.$route.query.kolId,
            pageNo: page
          })
        },
        pageSize: 10,
        hideOnSinglePage: true,
        total: 0,
        current: 1
      },
      visible: false,
      comment: {},
      title: false
    }
  },
  props: {
    defaultComment: {
      type: Boolean,
      required: false,
      default: function() {
        return false
      }
    }
  },
  mounted() {
    // 初始化
    this.pagination.total = +this.listData.total
    this.pagination.current =
      this.listData.index === 0 || this.listData.index === undefined
        ? 1
        : this.listData.index
  },
  methods: {
    light,
    // 评论
    handleComment(info, keyword) {
      this.visible = true
      this.comment = { data: info, keyword: keyword }
    },
    // Modal cencel
    handleCancel(e) {
      this.visible = false
    },
    // copy
    copylink(link) {
      this.$copyText(link).then(
        e => {
          this.$message.success('复制成功')
        },
        e => {
          this.$message.error('复制失败')
        }
      )
    }
  },
  computed: {
    ...mapState({
      listData: state => state.detail.pageInfo,
      loading: state => state.basic.loading
    })
  },
  watch: {
    listData(val) {
      this.$nextTick(() => {
        this.title = false
        this.pagination.total = val.count
        this.pagination.current =
          this.listData.index === 0 || this.listData.index === undefined
            ? 1
            : this.listData.index
      })
    },
    defaultComment: {
      handler(val) {
        if (val) {
          // 搜评论默认展示第一条信息评论
          this.comment = {
            data: this.listData.result[0].comments,
            keyword: this.listData.keyword
          }
          this.visible = val
          this.title = '默认显示第一条评论'
          if (this.visible) {
            this.$emit('changeComment', false)
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  components: {
    'hsy-comment': Comment
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/variable.less';
@import '~assets/styles/mixins.less';

.list-content {
  .list-content-title {
    border-left: 5px solid @gloableColor;
    padding-left: 10px;
    height: 16px;
    h4 {
      font-size: @h4;
      line-height: 16px;
      height: 16px;
    }
  }
  .ant-list-item-main {
    flex: 0 0 100px;
  }
  .ant-list-item-extra {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    justify-content: space-around;
    .list-info-content {
      .ant-list-item-meta {
        margin-bottom: 0;
      }
      .ant-list-item-meta-title > a {
        color: rgba(0, 0, 0, 0.8);
      }
      .list-info-text {
        line-height: 32px;
        .ellipisisClamp();
        color: #888;
        margin-bottom: 20px;
      }
      .list-info-tag {
        margin: 10px 10px 10px 0px;
      }
      .ant-list-item-meta-title {
        font-size: @h4;
      }
    }
    .list-info-actions {
      display: flex;
      margin-top: 5px;
      .list-info-time {
        flex: 1;
      }
      .list-info-actions-icon {
        display: flex;
        justify-content: flex-end;
        flex: 1;
      }
    }
  }
  .list-info-extra {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      display: inline-block;
    }
    a {
      margin-top: 5px;
      display: inline-block;
      width: 100%;
    }
  }
}
</style>
