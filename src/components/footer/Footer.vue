<template>
  <div class="footer">
    <div class="footer-wrapper">
      <div class="footer-left">
        <router-link
          tag="h4"
          class="h4-title"
          :to="{path: '/mine', query: {index: 1}}"
          style="cursor: pointer;"
        >关于我们</router-link>
        <router-link
          tag="h4"
          class="h4-title"
          :to="{path: '/mine', query: {index: 2}}"
          style="cursor: pointer;"
        >联系我们</router-link>
        <p>&nbsp;</p>
        <p>客服中心：13157126817</p>
      </div>
      <div class="footer-middle">
        <h4 class="h4-title">加入我们</h4>
        <p>简历投递邮箱：sunjuanjuan@dameicm.cn</p>
        <p>&nbsp;</p>
        <p>Copyright©2019 火烧云数据|杭州羽联信息科技有限公司 浙ICP备16045182号</p>
      </div>
      <div class="footer-right">
        <img src="../../assets/image/wechart.png" alt />
        <div class="qr-box">
          <h4 class="h4-title">火烧云微信公众号</h4>
          <p>扫一扫了解更多关于我们的资讯</p>
          <p>&nbsp;</p>
        </div>
      </div>
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
@import '~assets/styles/variable.less';

.footer {
  flex: 0 0 180px;
  background: #091514;
  width: 100%;
  .footer-wrapper {
    .h4-title {
      font-size: @h4;
      color: #d1d3d9;
      line-height: 30px;
      text-align: left;
    }
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #d1d3d9;
    .footer-left {
      flex: 0 0 260px;
      p {
        font-size: 14px;
        line-height: 30px;
      }
    }
    .footer-middle {
      flex: 1;
      p {
        line-height: 30px;
        font-size: 14px;
      }
    }
    .footer-right {
      flex: 0 0 320px;
      display: flex;
      justify-content: center;
      .qr-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .h4-title {
          width: 100%;
        }
        p {
          font-size: 14px;
          line-height: 30px;
        }
      }
      img {
        width: 104px;
        height: 104px;
        margin-right: 15px;
      }
    }
  }
}
</style>
