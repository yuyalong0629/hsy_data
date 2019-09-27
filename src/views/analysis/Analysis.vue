<template>
  <div class="analysis">
    <div class="analysis-container">
      <hsy-user :kolInfo="kolInfo" :kolTotalData="kolTotalData" :analysis="analysis" />
      <div class="analysis-radio">
        <a-radio-group :value="radioValue" @change="onChangeRadio" buttonStyle="solid">
          <a-radio-button value="1">作品分析报告</a-radio-button>
          <a-radio-button value="2">粉丝画像分析</a-radio-button>
        </a-radio-group>
      </div>
      <div class="analysis-info">
        <!-- <hsy-chart /> -->
        <component
          :is="componentId"
          :kolVideoInfoMap="kolVideoInfoMap"
          :dayDataMap="dayDataMap"
          :spinning="spinning"
          @pageNo="pageNo"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../details/User'
import Works from './Works'
import Fans from './Fans'
import { videoData } from 'api/analysis'

export default {
  name: 'analysis',
  data() {
    return {
      kolInfo: {},
      kolTotalData: {},
      kolVideoInfoMap: {},
      dayDataMap: {},
      analysis: false,
      spinning: false,
      radioValue: '1',
      componentId: 'hsy-works'
    }
  },
  mounted() {
    // 初始化历史作品内容
    if (this.$route.query.type === '1') {
      this.getVideo({
        type: this.$route.query.type,
        videoId: this.$route.query.videoId,
        pageNo: 0
      })
    } else {
      this.getVideo({
        kolId: this.$route.query.kolId,
        pageNo: 0
      })
    }
  },
  methods: {
    getVideo(params) {
      this.spinning = true
      return videoData(params)
        .then(res => {
          if (res.code === 200) {
            this.spinning = false
            // 基本信息
            this.kolInfo =
              { ...res.kolInfoMap, indexNum: res.kolTotalDataMap.indexNum } ||
              {}
            this.kolVideoInfoMap =
              {
                ...res.kolVideoInfoMap,
                next: res.isNext,
                prev: res.isPrev,
                pageNo: res.pageNo
              } || {}
            this.dayDataMap = res.dayDataMap || {}
          } else if (res.code === 303) {
            this.$message.warn(res.message)
            this.$router.go(-1)
            this.spinning = false
          } else {
            this.spinning = false
            this.permisson = false
          }
        })
        .catch(() => {
          this.spinning = false
        })
    },
    // radio
    onChangeRadio(e) {
      this.radioValue = e.target.value
      if (e.target.value === '1') {
        // 初始化历史作品内容
        this.getVideo({
          kolId: this.$route.query.kolId,
          pageNo: 0
        })
        this.componentId = 'hsy-works'
      } else {
        this.componentId = 'hsy-fans'
      }
    },
    pageNo(val) {
      this.getVideo({ kolId: this.$route.query.kolId, pageNo: val })
    }
  },
  components: {
    'hsy-user': User,
    'hsy-works': Works,
    'hsy-fans': Fans
  }
}
</script>

<style lang="less" scoped>
@import '~assets/styles/mixins.less';
@import '~assets/styles/variable.less';

.analysis {
  width: 100%;
  .analysis-container {
    .basicWidth();

    .analysis-info {
      border: 1px solid #ececec;
      padding: 20px;
      margin-top: 15px;
    }
  }
}
</style>
