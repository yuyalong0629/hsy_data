<template>
  <div class="rank">
    <div class="rank-container">
      <rank-list @listParam="listParam" @sessionParam="sessionParam" />

      <rank-tabs
        :loading="loading"
        :dateLists="dateLists"
        :tabData="tabData"
        @tabParam="tabParam"
        @selectParam="selectParam"
        @pageParam="pageParam"
      />
      <rank-permisson />
    </div>
  </div>
</template>

<script>
import RankList from './RankList'
import RankTabs from './RankTabs'
import { ranklist } from '@/api/rank'
import { mixinBasic } from '@/utils/mixin'
import Permisson from '@/components/permisson/Permisson'

export default {
  name: 'Rank',
  mixins: [mixinBasic],
  data() {
    return {
      tabData: {},
      dateLists: [],
      loading: true,
      params: [
        {
          pid: 1, // 平台ID
          tId: 0, // 题材ID
          flag: 0, // 标识：0总榜；1周榜；2月榜
          pageNo: 0, // 分页
          sort: 0, // 排序 0默认排序（指数）；1粉丝数；2浏览数；3视频数
          sortord: '', // 1 升序 2 降序
          dateNum: 0 // 时间选项序号
        }
      ]
    }
  },
  methods: {
    // get request
    getRankList(params) {
      this.loading = true
      return ranklist(params)
        .then(res => {
          if (res.code === 200) {
            // Tabs
            this.tabData = res.page || {}
            // 榜单日期
            this.dateLists = res.dateLists || []
          }
        })
        .then(() => {
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err)
          this.loading = false
        })
    },
    // $emit list params
    listParam(val) {
      const target = this.params.map(item => ({ ...item, ...val, pageNo: 0 }))
      this.getRankList(...target)
      this.params = [...target]
    },
    // $emit tab radio params
    tabParam(val) {
      const target = this.params.map(item => ({ ...item, ...val, pageNo: 0 }))
      this.getRankList(...target)
      this.params = [...target]
    },
    // $emit tab select params
    selectParam(val) {
      const target = this.params.map(item => ({ ...item, ...val, pageNo: 0 }))
      this.getRankList(...target)
      this.params = [...target]
    },
    // $emit session params
    sessionParam(val) {
      const target = this.params.map(item => ({ ...item, ...val, pageNo: 0 }))
      this.getRankList(...target)
      this.params = [...target]
    },
    // $emit pageno params
    pageParam(val) {
      const target = this.params.map(item => ({ ...item, ...val }))
      this.getRankList(...target)
      this.params = [...target]
    }
  },
  components: {
    'rank-list': RankList,
    'rank-tabs': RankTabs,
    'rank-permisson': Permisson
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';
.rank {
  width: 100%;
  .rank-container {
    .basicWidth();
  }
}
</style>
