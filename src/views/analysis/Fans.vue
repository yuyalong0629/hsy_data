<template>
  <div class="fans">
    <div class="fans-content-title">
      <h4>{{ `粉丝画像` }}</h4>
    </div>
    <a-spin :spinning="spinning">
      <hsy-skeleton v-if="fansPortraitDataMap" />
      <a-card v-if="!fansPortraitDataMap" hoverable style="margin: 20px 0;">
        <ul class="fans-chart">
          <li class="fans-chart-item">
            <h4>性别分布</h4>
            <div class="fans-item">
              <ve-histogram :data="genderPortrait" :settings="genderSettings" :colors="colors"></ve-histogram>
            </div>
          </li>
          <li class="fans-chart-item">
            <h4>年龄分布</h4>
            <div class="fans-item">
              <ve-histogram :data="ageDistribution" :settings="ageSettings" :colors="colors"></ve-histogram>
            </div>
          </li>
          <li class="fans-chart-item">
            <h4>星座分布</h4>
            <div class="fans-item">
              <ve-histogram
                :data="constellation"
                :settings="constellationSettings"
                :colors="colors"
              ></ve-histogram>
            </div>
          </li>
          <li class="fans-chart-item">
            <h4>等级分布</h4>
            <div class="fans-item">
              <ve-histogram :data="level" :settings="levelSettings" :colors="colors"></ve-histogram>
            </div>
          </li>
          <li class="fans-chart-item">
            <h4>地域分布TOP10</h4>
            <div class="fans-item">
              <ve-histogram
                :data="provinces"
                :settings="provincesSettings"
                :extend="provincesExtend"
                :colors="colors"
              ></ve-histogram>
            </div>
          </li>
        </ul>
      </a-card>
    </a-spin>
  </div>
</template>

<script>
import { fansPortrait } from 'api/analysis'
import VeHistogram from 'v-charts/lib/histogram.common'
import Skeleton from '@/components/skeleton/Skeleton'

export default {
  name: 'Fans',
  data() {
    // 性别指标
    this.genderSettings = {
      metrics: ['比例']
    }
    // 年龄指标
    this.ageSettings = {
      metrics: ['比例']
    }
    // 星座指标
    this.constellationSettings = {
      metrics: ['比例']
    }
    // 等级指标
    this.levelSettings = {
      metrics: ['比例']
    }
    // 地域指标
    this.provincesSettings = {
      metrics: ['比例']
    }
    this.provincesExtend = {
      series: {
        label: { show: true, position: 'top' }
      }
    }
    this.colors = ['#DA5054']
    return {
      fansPortraitDataMap: false,
      spinning: false,
      // 性别
      genderPortrait: {
        columns: ['性别', '比例'],
        rows: []
      },
      // 年龄
      ageDistribution: {
        columns: ['年龄', '比例'],
        rows: []
      },
      // 星座
      constellation: {
        columns: ['星座', '比例'],
        rows: []
      },
      // 等级
      level: {
        columns: ['VIP等级', '比例'],
        rows: []
      },
      // 省份
      provinces: {
        columns: ['地域', '比例'],
        rows: []
      }
    }
  },
  mounted() {
    this.spinning = true
    fansPortrait({ kolId: this.$route.query.kolId })
      .then(res => {
        if (res.code === 200) {
          this.spinning = false

          if (!res.fansPortraitDataMap) {
            this.fansPortraitDataMap = true
          } else {
            this.fansPortraitDataMap = false
            // 性别
            this.genderPortrait.rows = JSON.parse(
              res.fansPortraitDataMap.genderPortrait
            )
            // 年龄
            this.ageDistribution.rows = JSON.parse(
              res.fansPortraitDataMap.agePortrait
            )
            // 星座
            this.constellation.rows = JSON.parse(
              res.fansPortraitDataMap.constellationPortrait
            )
            // 等级
            this.level.rows = JSON.parse(res.fansPortraitDataMap.gradePortrait)
            // 地域
            this.provinces.rows = JSON.parse(
              res.fansPortraitDataMap.areaPortrait
            )
            console.log(this.provinces.rows)
          }
        } else {
          this.spinning = false
        }
      })
      .catch(() => {
        this.spinning = false
      })
  },
  components: {
    VeHistogram,
    'hsy-skeleton': Skeleton
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/variable.less';
@import '~assets/styles/mixins.less';

.fans {
  margin: 15px 0;
  .fans-content-title {
    border-left: 5px solid @gloableColor;
    padding-left: 10px;
    height: 16px;
    h4 {
      font-size: @h4;
      line-height: 16px;
      height: 16px;
    }
  }
  .fans-chart {
    display: flex;
    flex-wrap: wrap;
    .fans-chart-item {
      padding: 12px;
      width: 50%;
      h4 {
        line-height: 28px;
        margin-bottom: 12px;
      }
    }
  }
}
</style>
