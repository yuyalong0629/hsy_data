<template>
  <div class="rank-tabs">
    <div class="rank-select">
      <a-radio-group defaultValue="0" buttonStyle="solid" @change="onChangeRadio">
        <a-radio-button value="0">总榜</a-radio-button>
        <a-radio-button value="1">月涨粉榜</a-radio-button>
        <a-radio-button value="2">月掉粉榜</a-radio-button>
        <a-radio-button value="3">周涨粉榜</a-radio-button>
        <a-radio-button value="4">周掉粉榜</a-radio-button>
      </a-radio-group>
      <a-select
        v-if="dateLists.length"
        :value="dateValue || dateLists[0]"
        style="width: 200px; margin-left: 15px;"
        @change="onChangeSelect"
      >
        <a-select-option v-for="(item, index) of dateLists" :key="index">{{ item }}</a-select-option>
      </a-select>
    </div>
    <div class="rank-tab">
      <hsy-skeleton v-if="getTabData && !getTabData.length" />
      <a-table
        :loading="loading"
        :columns="columns"
        :rowKey="record => record.kolId"
        :dataSource="getTabData"
        :pagination="pagination"
        @change="handleTableChange"
        v-else
      >
        <template slot="cloudsTitle">
          <a-popover placement="bottomLeft" :title="false">
            <template slot="content">
              <p style="width: 200px;">云指数是系统基于账号粉丝活跃度、作品原创度、作品内容质量、作品完播度以及平均评论和点赞量等数据分析得出的综合评分</p>
            </template>
            云指数
            <a-icon type="question-circle" />
          </a-popover>
        </template>
        <template slot="media" slot-scope="text">
          <img v-lazy="text.kolImg" alt />
          <p>{{ text.kolName }}</p>
        </template>
        <template slot="kolId" slot-scope="text">
          <router-link
            tag="a"
            target="_blank"
            :to="{ path: '/details', query: { kolId: text } }"
          >查看详情</router-link>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { columns } from './index'
import Skeleton from '@/components/skeleton/Skeleton'

export default {
  name: 'RankTabs',
  data() {
    return {
      columns,
      dateValue: undefined,
      timeout: null,
      pagination: {
        pageSize: 20,
        hideOnSinglePage: true,
        total: 0
      },
      params: [
        {
          flag: 0,
          sortord: '',
          dateNum: 0,
          pageNo: 0
        }
      ]
    }
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: false
    },
    tabData: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
    dateLists: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    }
  },
  methods: {
    // 榜单切换
    onChangeRadio(e) {
      // 清空select初始值
      this.dateValue = undefined
      const target = this.params.map(item => ({
        ...item,
        flag:
          e.target.value === '1' || e.target.value === '2'
            ? '2'
            : e.target.value === '3' || e.target.value === '4'
            ? '1'
            : '0',
        sortord:
          e.target.value === '1' || e.target.value === '3'
            ? '2'
            : e.target.value === '2' || e.target.value === '4'
            ? '1'
            : ''
      }))
      console.log(target)
      this.$emit('tabParam', ...target)
      this.params = [...target]
    },
    // 日期 change
    onChangeSelect(value) {
      this.dateValue = value
      const target = this.params.map(item => ({
        ...item,
        dateNum: value
      }))
      this.$emit('selectParam', ...target)
      this.params = [...target]
    },
    // Tab change
    handleTableChange(pagination, filters, sorter) {
      const target = this.params.map(item => ({
        ...item,
        pageNo: pagination.current - 1
      }))
      this.$emit('pageParam', ...target)
      this.params = [...target]
      console.log(this.params)
    }
  },
  computed: {
    // Props tab 数据
    getTabData() {
      if (this.tabData.result) {
        return this.tabData.result.map((item, index) => {
          return {
            top: +this.tabData.index * 20 + (index + 1),
            media: {
              kolImg: item.kolImg,
              kolName: item.kolName
            },
            ...item
          }
        })
      }
    }
  },
  watch: {
    // 监听分页总页数
    tabData(val) {
      if (val) {
        this.pagination.total = val.count
      }
    }
  },
  components: {
    'hsy-skeleton': Skeleton
  }
}
</script>

<style lang="less" scope>
.rank-tabs {
  min-height: 500px;
  .rank-select {
    margin: 10px 0;
  }

  .rank-tab {
    margin: 20px 0;
    .rank-tab-media {
      height: 42px;
      img {
        border: 0;
        margin-right: 8px;
        height: 42px;
        float: left;
      }
      p {
        display: inline-block;
        height: 42px;
        line-height: 42px;
      }
    }
  }
}
</style>
