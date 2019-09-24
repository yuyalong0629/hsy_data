<template>
  <div class="list-statistics">
    <div class="list-statistics-title">
      <h4>历史作品数据统计</h4>
    </div>
    <a-spin :spinning="spinning">
      <div class="list-statistics-radio" :style="{ margin: '20px 0 10px' }">
        <a-radio-group defaultValue="0" size="small" @change="onChangeRadio">
          <a-radio-button value="0">周榜</a-radio-button>
          <a-radio-button value="1">月榜</a-radio-button>
        </a-radio-group>
      </div>
      <div class="list-statistics-content">
        <ve-line :data="fansData" :toolbox="toolbox" :settings="chartSettingsFans"></ve-line>
        <ve-line :data="playData" :toolbox="toolbox" :settings="chartSettingsplay"></ve-line>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { histordatas } from '@/api/detail'
// 折线图
import VeLine from 'v-charts/lib/line.common'

export default {
  name: 'ListStatistics',
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
        fansNum: '粉丝数',
        praiseNum: '点赞数'
      }
    }
    this.chartSettingsplay = {
      labelMap: {
        playNum: '播放数'
      }
    }
    return {
      data: {},
      spinning: false,
      fansData: {
        columns: [
          'dateTime',
          'barrageNum',
          'collectNum',
          'commentNum',
          'fansNum',
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
  mounted() {
    this.spinning = true
    histordatas({ kolId: this.$route.query.kolId })
      .then(res => {
        console.log(res)
        if (res.code === 200) {
          this.spinning = false
          this.fansData.rows = res.weekDataMapList
          this.playData.rows = res.weekPlayDataMaplist
        } else {
          this.spinning = false
        }
      })
      .catch(() => {
        this.spinning = false
      })
  },
  methods: {
    onChangeRadio(e) {
      if (e.target.value === '0') {
        histordatas({ kolId: this.$route.query.kolId }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.fansData.rows = res.weekDataMapList
            this.playData.rows = res.weekPlayDataMaplist
          }
        })
      }
      if (e.target.value === '1') {
        histordatas({ kolId: this.$route.query.kolId }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.fansData.rows = res.monthDataMapList
            this.playData.rows = res.monthPlayDataMaplist
          }
        })
      }
    }
  },
  components: {
    VeLine
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/variable.less';

.list-statistics {
  .list-statistics-title {
    border-left: 5px solid @gloableColor;
    padding-left: 10px;
    height: 16px;
    h4 {
      font-size: @h4;
      line-height: 16px;
      height: 16px;
    }
  }
}
</style>
