<template>
  <div class="top" v-if="fansInfo.length">
    <!-- <h3>榜首粉丝争夺战</h3> -->
    <div class="top-info">
      <div class="top-left animated bounceInLeft">
        <div class="left-img">
          <a-avatar :src="fansInfo[0].kolImg" />
          <h4>{{fansInfo[0].kolName}}</h4>
          <p class="fans">
            粉丝数：
            <countTo
              class="fansNum"
              :startVal="startValLeft"
              :autoplay="true"
              :endVal="fansInfo[0].fansNum"
              :duration="3000"
              separator=","
            ></countTo>
          </p>
        </div>
      </div>
      <div class="top-middle">
        <img src="../../assets/image/pkbanner2.png" alt />
        <a-button type="primary" size="large" style="background: #ff5847;">
          <router-link to="/rank">立即使用</router-link>
        </a-button>
      </div>
      <div class="top-right animated bounceInRight">
        <div class="right-img">
          <a-avatar :src="fansInfo[1].kolImg" />
          <h4>{{fansInfo[1].kolName}}</h4>
          <p class="fans">
            粉丝数：
            <countTo
              class="fansNum"
              :startVal="startValRight"
              :autoplay="true"
              :endVal="fansInfo[1].fansNum"
              :duration="3000"
              separator=","
            ></countTo>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pkData } from 'api/home'
import countTo from 'vue-count-to'

export default {
  data() {
    return {
      startValLeft: 0,
      startValRight: 0,
      fansInfo: []
    }
  },
  mounted() {
    pkData().then(res => {
      if (res.code === 200) {
        this.fansInfo = res.bilibiliKolPkDatas || []
        this.$emit('newsContentInfoList', res.newsContentInfoList || [])
        this.$emit('helpUserData', res.helpUserData || {})
      }
    })
  },
  components: {
    countTo
  }
}
</script>

<style lang="less" scoped>
@import '~assets/styles/variable.less';

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  .top-info {
    display: flex;
    justify-content: center;
    width: 100%;

    .top-left {
      display: flex;
      justify-content: center;
      flex: 1;
      .left-img {
        display: flex;
        flex-direction: column;
        align-items: center;
        .ant-avatar {
          width: 120px;
          height: 120px;
          box-shadow: 0px 0px 20px rgb(114, 112, 112);
        }
        h4 {
          line-height: 24px;
          font-size: 18px;
          margin: 32px 0 6px;
          font-weight: bold;
          color: #fff;
        }
        .fans {
          line-height: 24px;
          font-weight: bold;
          color: #fff;
        }
        .fansNum {
          line-height: 24px;
          color: @gloableColor;
          font-weight: 600;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
        }
      }
    }

    .top-middle {
      flex: 0 0 400px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: -80px;
      img {
        width: 320px;
        height: 300px;
      }
    }

    .top-right {
      display: flex;
      flex: 1;
      justify-content: center;
      .right-img {
        display: flex;
        flex-direction: column;
        align-items: center;
        .ant-avatar {
          width: 120px;
          height: 120px;
          box-shadow: 0px 0px 20px rgb(114, 112, 112);
        }
        h4 {
          line-height: 24px;
          font-size: 18px;
          margin: 32px 0 6px;
          font-weight: bold;
          color: #fff;
        }
        .fans {
          line-height: 24px;
          font-weight: bold;
          color: #fff;
        }
        .fansNum {
          line-height: 24px;
          color: @gloableColor;
          font-weight: 600;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
