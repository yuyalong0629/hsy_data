<template>
  <a-spin :spinning="spinning">
    <a-list
      itemLayout="vertical"
      size="large"
      :pagination="pagination"
      :dataSource="contentList.result"
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item"
        key="item.title"
        @click="handleDetail(item.id)"
      >
        <span>发布时间：{{ item.publishTime }}</span>
        <icon-font
          class="mine-breadcrumb-icon"
          style="margin: 0 4px 0 24px; font-size: 16px;"
          type="icon-changyongtubiao-mianxing-"
        />
        <span>{{ item.readNum }}</span>
        <img slot="extra" width="196" height="120" alt="logo" :src="item.coverImage" />
        <a-list-item-meta :description="item.summary">
          <a slot="title" href="javascript:;">{{item.title}}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-spin>
</template>

<script>
import { Icon } from 'ant-design-vue'
import { newsContentInfoList } from '@/api/home'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: require('../../assets/font/iconfont') // 在 iconfont.cn 上生成
})

export default {
  name: 'List',
  data() {
    return {
      classroom: [
        { index: 0, icon: 'right', text: '互联网广告知识' },
        { index: 1, icon: 'right', text: '短视频广告投放' },
        { index: 2, icon: 'right', text: '短视频广告投放' }
      ],
      isActiveClassroom: 0,
      pagination: {
        onChange: page => {
          const type = this.$route.query.type
          this.contentInfoList({ type: type, pageNo: page - 1 })
        },
        pageSize: 5,
        total: 0,
        hideOnSinglePage: true
      },
      contentList: {},
      spinning: false
    }
  },
  mounted() {
    this.contentInfoList({ type: this.$route.query.type || 1 })
  },
  methods: {
    contentInfoList(params) {
      this.spinning = true
      return newsContentInfoList(params)
        .then(res => {
          if (res.code === 200) {
            this.contentList = res.page
            this.pagination.total = res.page.total
            this.spinning = false
          } else {
            this.spinning = false
          }
        })
        .catch(() => {
          this.spinning = false
        })
    },
    handleDetail(id) {
      console.log(id)
      this.$router.push({ path: '/mine/detail', query: { id: id } })
    }
  },
  watch: {
    $route(to, from) {
      this.contentInfoList({ type: to.query.type })
    }
  },
  components: {
    'icon-font': MyIcon
  }
}
</script>

<style lang="less" scoped>
.ant-list-item {
  border: 1px solid #ececec;
  padding: 12px;
  border-top: none;
  cursor: pointer;
  .ant-list-item-meta-title {
    font-weight: bold;
  }
  &:first-child {
    border-top: 1px solid #ececec;
  }
}
</style>
