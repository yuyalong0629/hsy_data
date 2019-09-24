<template>
  <div class="about">
    <vue-particles
      color="#da5054"
      :particleOpacity="0.5"
      :particlesNumber="50"
      shapeType="star"
      :particleSize="5"
      :linesWidth="1"
      :lineLinked="false"
      :lineOpacity="0.5"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="bubble"
      :clickEffect="false"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <div class="about-container">
      <h4>
        <i></i>公司介绍
      </h4>
      <p>
        杭州羽联信息科技有限公司是国内领先的新媒体广告服务商，旗下火烧云数据是短视频领
        域权威的数据分析平台。火烧云数据依托专业的数据挖掘和大数据分析能力，提供B站数据、小
        红书数据、抖音数据和快手数据等，为广告主提供媒体主作品内容数据分析、粉丝数据分析、
        广告价值评估和投前投后检测等，为新媒体广告投放开启数据化、智能化的新纪元。
      </p>
      <h4>
        <i></i>联系方式
      </h4>
      <p>商务合作：0571-82565101</p>
      <h4>
        <i></i>公司地址
      </h4>
      <p>浙江省杭州市拱墅区祥园路139号智慧立方科技中心3幢4楼402室</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';

.about {
  width: 100%;
  height: 100%;
  position: relative;
  #particles-js {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
  .about-container {
    width: 800px;
    margin: 0 auto;
    padding-top: 200px;
    h4 {
      font-size: 20px;
      line-height: 28px;
      height: 28px;
      margin: 8px 0;
      font-weight: 500;
      display: flex;
      align-content: center;
      box-sizing: border-box;
      i {
        border-left: 8px solid #da5054;
        padding-left: 12px;
        height: 20px;
        display: inline-block;
        margin-top: 4px;
      }
    }
    p {
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 50px;
      font-weight: 500;
    }
  }
}
</style>
