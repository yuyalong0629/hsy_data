<template>
  <div class="monitor">
    <div class="monitor-container">
      <!-- 监控 -->
      <div class="monitor-radio">
        <a-radio-group @change="onChangeMonitor" :value="monitor">
          <a-radio :value="1">即时监控</a-radio>
          <a-radio :value="2">预约监控</a-radio>
        </a-radio-group>
        <p class="monitor-radio-link">广告作品链接</p>
        <p class="monitor-radio-instructions">可对媒体主发布的广告进行即时监控，提供分钟级的作品阅读数/点赞数/收藏数监测，追踪广告效果动态</p>
        <div class="monitor-input" v-if="monitor === 1">
          <a-input placeholder="请粘贴作品链接" v-model="content" size="large" />
        </div>
        <div class="monitor-search" v-if="monitor === 2">
          <a-input-search placeholder="请输入达人名称" size="large" @search="onSearch" enterButton />
          <ul class="monitor-search-result">
            <li
              :class="{active: isActive === index }"
              v-for="(item, index) of searchInfo"
              :key="item.id"
              @click="onClickActive(item.kolId, index)"
            >
              <a-avatar :src="item.kolImg" />
              <span class="monitor-search-result-name">{{ item.kolName }}</span>
            </li>
          </ul>
          <p class="monitor-search-time">
            预约监控时段 (
            <span>若在时间段内无广告内容发布，本次监控默认完成，但无监控报告</span>)
          </p>
          <a-range-picker
            showTime
            :value="timeValue"
            format="YYYY-MM-DD HH:mm:ss"
            style="width: 420px;"
            @change="onChangeDate"
            @ok="onOk"
            size="large"
          />
        </div>
        <p class="monitor-time">监控时长</p>
        <a-radio-group @change="onChangeMonitorTime" :value="monitorTime">
          <a-radio :value="24">24小时</a-radio>
          <a-radio :value="48">48小时</a-radio>
          <a-radio :value="72">72小时</a-radio>
        </a-radio-group>
        <div class="monitor-start">
          <a-button type="primary" size="large" @click="onClickMonitor">开始监测</a-button>
        </div>
      </div>
      <!-- 监控历史 -->
      <hsy-monitorList :changeList="changeList" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import MonitorList from './MonitorList'
import { addMonitor, searchKol } from 'api/monitor'

export default {
  name: 'Monitor',
  data() {
    return {
      monitor: 1,
      monitorTime: 24,
      content: '',
      isActive: undefined,
      moment,
      timeValue: [
        moment(new Date()),
        moment(new Date().setDate(new Date().getDate() + 1))
      ],
      searchInfo: [],
      changeList: false
    }
  },
  methods: {
    // 监控 radio
    onChangeMonitor(e) {
      this.monitor = e.target.value
      console.log('radio checked', e.target.value)
    },
    // 监控时长 radio
    onChangeMonitorTime(e) {
      this.monitorTime = e.target.value
    },
    // 预约监控 搜索
    onSearch(value) {
      console.log(value)
      searchKol({ keyword: value }).then(res => {
        if (res.code === 200) {
          this.searchInfo = res.kolInfos
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 预约监控 列表选中
    onClickActive(id, key) {
      console.log(id)
      this.isActive = key
      this.content = id
    },
    // 预约监控 日期选择
    onChangeDate(date, dateString) {
      console.log(date, dateString)
      this.timeValue = date
    },
    onOk(value) {
      console.log('onOk: ', value)
    },
    // 开始监控
    onClickMonitor() {
      // addMonitor
      const data = {
        type: this.monitor,
        content: this.content,
        sTime: this.timeValue[0].format('YYYY-MM-DD HH:mm:ss') || '',
        eTime: this.timeValue[1].format('YYYY-MM-DD HH:mm:ss') || '',
        duration: this.monitorTime
      }
      this.addMonitor({ ...data }).then(() => {
        // 每次添加初始化列表
        this.changeList = false
      })
    },
    addMonitor(params) {
      return addMonitor(params).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.$message.success(res.message)
          // 每次添加初始化列表
          this.changeList = true
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  components: {
    'hsy-monitorList': MonitorList
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';
@import '~assets/styles/variable.less';

.monitor {
  width: 100%;
  .monitor-container {
    .basicWidth();
    .monitor-radio {
      margin: 40px 0 10px;

      .monitor-radio-link {
        line-height: 30px;
        font-size: 16px;
        margin-top: 20px;
        font-weight: 600;
      }

      .monitor-radio-instructions {
        line-height: 30px;
        color: #999;
      }

      .monitor-input {
        width: 80%;
        margin: 10px 0;
      }

      .monitor-search {
        width: 80%;
        margin: 10px 0;
        .monitor-search-result {
          .active {
            border: 1px solid @active;
          }
          li {
            cursor: pointer;
            border: 1px solid #e8e8e8;
            border-radius: 4px;
            margin: 10px 0;
            padding: 10px;
            .ant-avatar {
              width: 40px;
              height: 40px;
            }
            .monitor-search-result-name {
              color: rgba(0, 0, 0, 0.65);
              transition: all 0.3s;
              font-size: 16px;
              font-weight: 500;
              line-height: 40px;
              height: 40px;
              display: inline-block;
              margin-left: 10px;
            }
          }
        }
        .monitor-search-time {
          line-height: 30px;
          margin: 12px 0;
          font-size: 16px;
          font-weight: 600;
          span {
            color: #999;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }
      .monitor-time {
        line-height: 50px;
        font-size: 16px;
        margin-top: 10px;
        font-weight: 600;
      }

      .monitor-start {
        margin: 30px 0;
        text-align: center;
      }
    }
  }
}
</style>
