<template>
  <div class="works">
    <div class="works-content-title">
      <h4>{{ `历史作品数据统计` }}</h4>
      <a-button-group size="small">
        <a-button
          type="primary"
          :disabled="!kolVideoInfoMap.prev"
          @click="clickPrev(kolVideoInfoMap.prev, kolVideoInfoMap.pageNo)"
        >
          <a-icon type="left" />上一页
        </a-button>
        <a-button
          type="primary"
          :disabled="!kolVideoInfoMap.next"
          @click="clickNext(kolVideoInfoMap.next, kolVideoInfoMap.pageNo)"
        >
          下一页
          <a-icon type="right" />
        </a-button>
      </a-button-group>
    </div>
    <a-spin :spinning="spinning">
      <a-card
        v-if="Object.keys(kolVideoInfoMap).length"
        hoverable
        style="margin: 20px 0; background: #f1f5f6;"
      >
        <div class="work-list">
          <a :href="kolVideoInfoMap.sourceUrl" target="_blank" style="color: #000;">
            <div class="work-list-title">{{ kolVideoInfoMap.title }}</div>
          </a>
          <p class="work-list-content">{{ kolVideoInfoMap.summary }}</p>
          <div class="work-list-label">
            <a-tag
              class="list-info-tag"
              v-for="(item, index) of kolVideoInfoMap.tags"
              :key="index"
            >{{ item }}</a-tag>
          </div>
          <div class="work-list-footer">
            <p class="list-info-time">{{`发布时间：${kolVideoInfoMap.publishTime}`}}</p>
            <div class="list-info-actions-icon">
              <span style="margin-right: 12px">
                <a-icon type="youtube" />
                {{ kolVideoInfoMap.playNum }}
              </span>
              <span style="margin-right: 12px">
                <a-icon type="star-o" />
                {{ kolVideoInfoMap.praiseNum }}
              </span>
              <span style="margin-right: 12px">
                <a-icon type="like-o" />
                {{ kolVideoInfoMap.collectNum }}
              </span>
              <span style="margin-right: 12px">
                <a-icon type="message" />
                {{ kolVideoInfoMap.barrageNum }}
              </span>
            </div>
          </div>
        </div>
      </a-card>
      <div class="works-radio" v-if="Object.keys(dayDataMap).length">
        <div class="works-radio-left">
          <span style="margin-right: 12px">
            <a-icon type="youtube" style="margin-right: 4px" />数据趋势
          </span>
        </div>
        <div class="works-radio-right">
          <span :class="{active: activeIndex === 24}" @click="changeWorks(24)">24H</span> |
          <span :class="{active: activeIndex === 48}" @click="changeWorks(48)">48H</span>
        </div>
      </div>
      <div class="works-statistics-content">
        <hsy-skeleton v-if="!Object.keys(dayDataMap).length" />
        <ve-line
          v-if="Object.keys(dayDataMap).length"
          :data="fansData"
          :toolbox="toolbox"
          :settings="chartSettingsFans"
        ></ve-line>
        <ve-line
          v-if="Object.keys(dayDataMap).length"
          :data="playData"
          :toolbox="toolbox"
          :settings="chartSettingsplay"
        ></ve-line>
      </div>
    </a-spin>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import { videoDayData } from 'api/analysis'
import Skeleton from '@/components/skeleton/Skeleton'

export default {
  name: 'Works',
  data() {
    this.toolbox = {
      show: true,
      feature: {
        saveAsImage: {
          type: 'jpeg'
        }
      }
    }
    this.chartSettingsFans = {
      labelMap: {
        barrageNum: '弹幕数',
        collectNum: '收藏数',
        commentNum: '评论数',
        praiseNum: '点赞数'
      }
    }
    this.chartSettingsplay = {
      labelMap: {
        playNum: '播放数'
      }
    }
    return {
      activeIndex: 24,
      data: {},
      fansData: {
        columns: [
          'dateTime',
          'barrageNum',
          'collectNum',
          'commentNum',
          'praiseNum'
        ],
        rows: []
      },
      playData: {
        columns: ['dateTime', 'playNum'],
        rows: []
      }
    }
  },
  props: {
    kolVideoInfoMap: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },
    dayDataMap: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },
    spinning: {
      type: Boolean,
      required: false,
      default: function() {
        return false
      }
    }
  },
  methods: {
    changeWorks(key) {
      this.activeIndex = key
      videoDayData({
        videoId: this.kolVideoInfoMap.id,
        num: key
      }).then(res => {
        if (res.code === 200) {
          this.fansData.rows = res.dayDataMap.dataMapList
          this.playData.rows = res.dayDataMap.playDataMaplist
        }
      })
    },
    clickPrev(page, num) {
      if (page) {
        this.$emit('pageNo', num - 1)
      }
    },
    clickNext(page, num) {
      if (page) {
        this.$emit('pageNo', num + 1)
      }
    }
  },
  watch: {
    dayDataMap(val) {
      if (Object.keys(val).length) {
        this.fansData.rows = val.dataMapList
        this.playData.rows = val.playDataMaplist
      }
    }
  },
  components: {
    VeLine,
    'hsy-skeleton': Skeleton
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/variable.less';
@import '~assets/styles/mixins.less';

.works {
  margin: 15px 0;
  .works-content-title {
    border-left: 5px solid @gloableColor;
    padding-left: 10px;
    height: 16px;
    display: flex;
    justify-content: space-between;
    h4 {
      font-size: @h4;
      line-height: 16px;
      height: 16px;
    }
  }
  .work-list {
    display: flex;
    flex-direction: column;
    .work-list-title {
      line-height: 24px;
    }
    .work-list-content {
      color: #999;
      line-height: 24px;
    }
    .work-list-label {
      margin: 12px 0;
    }
    .work-list-footer {
      display: flex;
      justify-content: space-between;
      .list-info-time {
        flex: 1;
      }
      .list-info-actions-icon {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .works-radio {
    display: flex;
    justify-content: space-between;
    padding: 24px 0;
    .works-radio-left {
      font-size: 16px;
    }
    .works-radio-right {
      span {
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
      }
      .active {
        color: #da5054;
      }
    }
  }

  .works-statistics-content {
    padding: 24px 0;
  }
}
</style>
