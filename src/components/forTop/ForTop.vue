<template>
  <div class="top" v-if="fansInfo.length">
    <h3>榜首粉丝争夺战</h3>
    <div class="top-info">
      <div class="top-left animated bounceInLeft">
        <div class="left-text">
          <h4>{{fansInfo[0].kolName}}</h4>
          <p>认证信息：{{ fansInfo[0].isApprove }}，{{ fansInfo[0].approveDescription }}</p>
        </div>
        <div class="left-img">
          <a-avatar :src="fansInfo[0].kolImg" />
          <p class="fans">粉丝数</p>
          <countTo
            class="fansNum"
            :startVal="startValLeft"
            :autoplay="true"
            :endVal="fansInfo[0].fansNum"
            :duration="3000"
            separator=","
          ></countTo>
        </div>
      </div>
      <div class="top-middle">VS</div>
      <div class="top-right animated bounceInRight">
        <div class="right-img">
          <a-avatar :src="fansInfo[1].kolImg" />
          <p class="fans">粉丝数</p>
          <countTo
            class="fansNum"
            :startVal="startValRight"
            :autoplay="true"
            :endVal="fansInfo[1].fansNum"
            :duration="3000"
            separator=","
          ></countTo>
        </div>
        <div class="right-text">
          <h4>{{fansInfo[1].kolName}}</h4>
          <p>认证信息：{{ fansInfo[1].isApprove }}，{{ fansInfo[1].approveDescription }}</p>
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
  created() {
    pkData().then(res => {
      this.fansInfo = res.bilibiliKolPkDatas || []
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
  h3 {
    font-size: @h3;
    line-height: 48px;
    padding: 24px 0;
  }
  .top-info {
    display: flex;
    justify-content: center;
    width: 100%;

    .top-left {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      .left-text {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-right: 24px;
        h4 {
          font-size: 18px;
          line-height: 42px;
          font-weight: bold;
          color: rgba(73, 72, 72, 1);
          padding-right: 12px;
        }
        p {
          font-weight: 400;
          color: rgba(46, 46, 46, 1);
          line-height: 24px;
          font-size: 16px;
        }
      }
      .left-img {
        display: flex;
        flex-direction: column;
        align-items: center;
        .ant-avatar {
          width: 80px;
          height: 80px;
        }
        .fans {
          line-height: 24px;
          margin: 12px 0;
          font-weight: bold;
          color: rgba(73, 72, 72, 1);
        }
        .fansNum {
          line-height: 24px;
          color: @gloableColor;
          font-weight: 600;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: bold;
        }
      }
    }

    .top-middle {
      flex: 0 0 100px;
      text-align: center;
      width: 25px;
      height: 80px;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: @gloableColor;
      line-height: 80px;
    }

    .top-right {
      display: flex;
      flex: 1;
      .right-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 24px;
        h4 {
          font-size: 18px;
          line-height: 42px;
          font-weight: bold;
          color: rgba(73, 72, 72, 1);
          padding-right: 12px;
        }
        p {
          font-weight: 400;
          color: rgba(46, 46, 46, 1);
          line-height: 24px;
          font-size: 16px;
        }
      }
      .right-img {
        display: flex;
        flex-direction: column;
        align-items: center;
        .ant-avatar {
          width: 80px;
          height: 80px;
        }
        .fans {
          line-height: 24px;
          margin: 12px 0;
          font-weight: bold;
          color: rgba(73, 72, 72, 1);
        }
        .fansNum {
          line-height: 24px;
          color: @gloableColor;
          font-weight: 600;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
