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
              <ve-histogram :data="genderPortrait" :settings="chartSettings" :colors="colors"></ve-histogram>
            </div>
          </li>
          <li class="fans-chart-item">
            <h4>年龄分布</h4>
            <div class="fans-item">
              <ve-histogram :data="ageDistribution" :settings="chartSettings" :colors="colors"></ve-histogram>
            </div>
          </li>
          <li class="fans-chart-item">
            <h4>星座分布</h4>
            <div class="fans-item">
              <ve-histogram :data="constellation" :settings="chartSettings" :colors="colors"></ve-histogram>
            </div>
          </li>
          <li class="fans-chart-item">
            <h4>等级分布</h4>
            <div class="fans-item">
              <ve-histogram :data="level" :settings="chartSettings" :colors="colors"></ve-histogram>
            </div>
          </li>
          <li class="fans-chart-item">
            <h4>地域分布TOP10</h4>
            <div class="fans-item">
              <ve-funnel :data="provinces" :settings="provincesSettings"></ve-funnel>
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
import VeFunnel from 'v-charts/lib/funnel.common'
import Skeleton from '@/components/skeleton/Skeleton'

export default {
  name: 'Fans',
  data() {
    // 指标
    this.chartSettings = {
      metrics: ['数量']
    }
    // 指标
    this.provincesSettings = {
      dataType: 'percent',
      metrics: ['比例']
    }
    this.colors = ['#DA5054']
    return {
      fansPortraitDataMap: false,
      spinning: false,
      // 性别
      genderPortrait: {
        columns: ['性别', '数量'],
        rows: [{ 性别: '女', 数量: 400 }, { 性别: '男', 数量: 110 }]
      },
      // 年龄
      ageDistribution: {
        columns: ['分布', '数量'],
        rows: [
          { 分布: '80后', 数量: 20 },
          { 分布: '85后', 数量: 17 },
          { 分布: '90后', 数量: 40 },
          { 分布: '95后', 数量: 30 },
          { 分布: '00后', 数量: 10 }
        ]
      },
      // 星座
      constellation: {
        columns: ['分布', '数量'],
        rows: [
          { 分布: '巨蟹', 数量: 20 },
          { 分布: '射手', 数量: 17 },
          { 分布: '水瓶', 数量: 40 },
          { 分布: '双鱼', 数量: 30 },
          { 分布: '狮子', 数量: 30 },
          { 分布: '天蝎', 数量: 30 },
          { 分布: '白羊', 数量: 30 },
          { 分布: '其他', 数量: 10 }
        ]
      },
      // 等级
      level: {
        columns: ['等级分布', '数量'],
        rows: [
          { 等级分布: 'vip0', 数量: 20 },
          { 等级分布: 'vip1', 数量: 17 },
          { 等级分布: 'vip2', 数量: 40 },
          { 等级分布: 'vip3', 数量: 30 },
          { 等级分布: 'vip4', 数量: 30 },
          { 等级分布: 'vip5', 数量: 30 }
        ]
      },
      // 省份
      provinces: {
        columns: ['省份', '比例'],
        rows: [
          { 省份: '云南', 比例: 0.09 },
          { 省份: '江苏', 比例: 0.09 },
          { 省份: '黑龙江', 比例: 0.09 },
          { 省份: '山东', 比例: 0.08 },
          { 省份: '重庆', 比例: 0.08 },
          { 省份: '吉林', 比例: 0.07 },
          { 省份: '河北', 比例: 0.05 },
          { 省份: '福建', 比例: 0.04 },
          { 省份: '山西', 比例: 0.04 },
          { 省份: '湖北', 比例: 0.04 }
        ]
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
            this.genderPortrait = res.genderPortrait
            // 年龄
            this.agePortrait = res.agePortrait
            // 星座
            this.constellation = res.constellationPortrait
            // 等级
            this.level = res.gradePortrait
            // 省份
            this.provinces = res.areaPortrait
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
    VeFunnel,
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
