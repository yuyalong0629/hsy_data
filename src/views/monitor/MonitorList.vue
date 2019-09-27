<template>
  <div class="monitor-list">
    <a-spin :spinning="spinning">
      <div class="monitor-list-title">
        <p>监控历史</p>
        <p>关注公众号获得监控通知</p>
      </div>
      <a-divider />
      <div class="monitor-list-content">
        <hsy-skeleton v-if="Object.keys(monitorInfo).length && !monitorInfo.result.length" />

        <a-list
          v-if="Object.keys(monitorInfo).length && monitorInfo.result.length"
          itemLayout="vertical"
          size="large"
          :loading="loading"
          :pagination="pagination"
          :dataSource="monitorInfo.result"
        >
          <a-list-item slot="renderItem" slot-scope="item" key="item.title">
            <template slot="actions">
              <div class="monitor-list-item">
                <p>{{ item.monitorStartTime }}</p>
                <h4
                  @click="clickAnalysis(item.monitorStatus, item.monitorType, item.id)"
                >{{ item.monitorType === 1 ? (item.title || item.monitorContent) : item.kolInfoMap.kolName }}</h4>
                <p>
                  <a-tag v-for="(item, index) of item.tags" :key="index">{{ item }}</a-tag>
                </p>
              </div>
            </template>
            <a-button
              slot="extra"
            >{{ item.monitorStatus === 1 ? '监控中' : (item.monitorStatus === 2 ? '监控失败' : '监控完成') }}</a-button>
          </a-list-item>
        </a-list>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { monitorHistoryInfo } from './index'
import Skeleton from '@/components/skeleton/Skeleton'
import { types } from 'util'

export default {
  name: 'MonitorList',
  data() {
    return {
      pagination: {
        onChange: page => {
          monitorHistoryInfo.call(this, { pageNo: page })
        },
        pageSize: 20,
        total: 0,
        hideOnSinglePage: true
      },
      loading: false,
      monitorInfo: {},
      spinning: false
    }
  },
  props: {
    changeList: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted() {
    // 监控历史
    monitorHistoryInfo.call(this, { pageNo: 0 })
  },
  methods: {
    clickAnalysis(status, type, id) {
      if (type === 1 && (status === 1 || status === 3)) {
        this.$router.push({
          path: '/analysis',
          query: {
            type: '1',
            videoId: id
          }
        })
      }
    }
  },
  watch: {
    monitorInfo(val) {
      console.log(val)
      this.pagination.total = val.count
    },
    changeList(val) {
      if (val) {
        console.log(val)
        monitorHistoryInfo.call(this, { pageNo: 0 })
      }
    }
  },
  components: {
    'hsy-skeleton': Skeleton
  }
}
</script>

<style lang="less" scope>
.monitor-list {
  .ant-divider,
  .ant-divider-vertical {
    position: relative;
  }
  .monitor-list-title {
    display: flex;
    justify-content: space-between;
    p:nth-child(1) {
      font-size: 16px;
      font-weight: 600;
    }
    p:nth-child(2) {
      font-size: 14px;
      color: #999;
    }
  }
  .monitor-list-content {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px 24px;
    min-height: 300px;
    margin-bottom: 24px;
    .monitor-list-item {
      p {
        text-align: left;
      }
      h4 {
        text-align: left;
        line-height: 48px;
      }
    }
  }
}
</style>
