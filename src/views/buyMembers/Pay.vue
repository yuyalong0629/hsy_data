<template>
  <div class="pay">
    <div class="pay-container">
      <div class="pay-select-vip">
        <h4>选择会员套餐</h4>
        <ul class="pay-select-vip-list">
          <li
            :class="{active: isActive === index}"
            v-for="(item, index) of monthlyPriceInfos"
            :key="index"
            @click="changeMonthlyPrice(item, index)"
          >
            <p class="pay-list-m">{{ item.monthNum }}个月</p>
            <p class="pay-list-p">
              <span>{{ item.unitPrice }}</span> 元/月
            </p>
            <p class="pay-list-s">
              <del>立省{{ item.saveMoney }}</del>
            </p>
          </li>
        </ul>
      </div>

      <div class="pay-select-way">
        <h4>选择支付方式</h4>
        <ul class="pay-select-vip-list">
          <li
            :class="{active: isPayment === index}"
            v-for="(item, index) of payment"
            :key="index"
            @click="changeMonthlyPay(index)"
          >
            <p class="pay-list-m">{{ item.name }}</p>
          </li>
        </ul>
      </div>

      <div class="pay-select-money">
        <h4>支付金额</h4>
        <div class="pay-price">
          <p>
            <span>{{ price.price }}</span> 元(原价
            <del>{{ price.originalPrice }}</del>元，节省
            <span>{{ price.saveMoney }}</span>元)
          </p>
          <a-popover placement="bottomLeft" :title="false">
            <template slot="content">
              <p>
                账户名称: 杭州羽联信息科技有限公司
                <br />账户号码: 571909759410506
                <br />开户银行: 招商银行股份有限公司杭州武林支行
                <br />支付完成后联系客服：15067158565
              </p>
            </template>
            企业对公转账
            <a-icon type="question-circle" />
          </a-popover>
        </div>
      </div>

      <div class="pay-text">
        <p>
          点击"立即付款"表示您已阅读并接受
          <router-link to="/agreement">《用户授权许可协议》</router-link>
        </p>
        <p>
          在线支付成功后重新登录即可自动生效，如需发票请支付后到会员中心申请；如遇付款问题或需要纸质合同请
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>联系客服：15067158565</span>
            </template>
            <a href="javscript:;">联系客服</a>
          </a-tooltip>
        </p>
      </div>

      <!-- Modal -->
      <a-modal
        :destroyOnClose="true"
        width="400px"
        title="微信扫码支付"
        :visible="visible"
        @cancel="handleCancel"
        :footer="null"
      >
        <div class="wechart">
          <img v-if="applyImg" class="wechart-img" :src="applyImg" alt="微信支付" />
        </div>
        <a-divider dashed />
        <h4 class="h4-title">请使用微信扫码支付，支付完成后关闭窗口</h4>
      </a-modal>

      <div class="payment">
        <a-button type="primary" @click="clickPayment" size="large">立即支付</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { buyPrice, confirmPay, alipayReturn, payQuery } from 'api/vip'
import { userInfo } from 'api/user'

export default {
  name: 'Pay',
  data() {
    return {
      isActive: undefined,
      isPayment: 0,
      monthlyPriceInfos: [],
      payment: [{ name: '支付宝', id: '1' }, { name: '微信', id: '2' }],
      price: {},
      visible: false,
      applyImg: ''
    }
  },
  mounted() {
    // 初始化价格列表
    buyPrice().then(res => {
      if (res.code === 200) {
        console.log(res)
        this.monthlyPriceInfos = res.monthlyPriceInfos
        // 初始化获取默认下标
        this.isActive = res.monthlyPriceInfos.findIndex(item => {
          return item.isDefault === 1
        })
        // 支付金额
        this.price = res.monthlyPriceInfos.filter(
          item => item.isDefault === 1
        )[0]
        console.log(this.price)
      }
    })
    // 支付订单回调
    if (this.$route.query.out_trade_no && this.$route.query.trade_no) {
      this.alipyBack({
        out_trade_no: this.$route.query.out_trade_no,
        trade_no: this.$route.query.trade_no
      })
    }
  },
  methods: {
    // 支付订单回调
    alipyBack(params) {
      return alipayReturn(params).then(res => {
        if (res.code === 200) {
          this.$message.success('支付成功')
          // 更新会员信息
          userInfo().then(res => {
            if (res.code === 200) {
              this.$store.commit('login', res.userInfoMap)
            }
          })
          this.$router.push('/buyMembers')
          return
        }
        if (res.code === 303) {
          this.$message.warn('订单取消')
          this.$router.push('/buyMembers')
          return
        }
        this.$message.error('支付失败')
        this.$router.push('/buyMembers')
      })
    },
    // 选择会员套餐
    changeMonthlyPrice(item, index) {
      this.isActive = index
      console.log(item)
      this.price = item
    },
    // 选择支付方式
    changeMonthlyPay(index) {
      this.isPayment = index
    },
    // Modal cancel
    handleCancel() {
      this.visible = false
      // 微信支付关闭回调
      payQuery().then(res => {
        if (res.code === 200) {
          console.log(res)
          this.$message.success('支付成功', 3)
          // 更新会员信息
          userInfo().then(res => {
            if (res.code === 200) {
              this.$store.commit('login', res.userInfoMap)
            }
          })
          this.$router.push('/buyMembers')
        } else {
          this.$message.errror('支付失败', 3)
        }
      })
    },
    // 支付
    clickPayment() {
      // 支付
      confirmPay({
        type: 1,
        priceId: this.price.id,
        payType: this.isPayment === 0 ? '1' : '2'
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          // 支付宝
          if (this.isPayment === 0) {
            const routerData = this.$router.resolve({
              path: '/apply',
              query: { htmls: res.payResult }
            })
            // 打开新页面
            window.open(routerData.href, '_ blank')
          } else {
            // 微信
            this.visible = true
            if (res.imgStr) {
              this.applyImg = `data:image/png;base64,${res.imgStr}`
            }
          }
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
@import '~assets/styles/mixins.less';
@import '~assets/styles/variable.less';

.pay {
  width: 100%;
  .pay-container {
    width: 1000px;
    margin: 0 auto;

    .pay-select-vip {
      margin: 24px 0;
      h4 {
        font-size: 18px;
      }
      .pay-select-vip-list {
        display: flex;
        margin: 24px 0;
        li {
          flex: 0 0 170px;
          border: 1px solid #e8e8e8;
          padding: 48px 40px;
          margin-right: 36px;
          border-radius: 4px;
          cursor: pointer;
          p {
            line-height: 28px;
            text-align: center;
            font-size: 16px;
            color: #999;
          }
          .pay-list-s {
            line-height: 24px;
            text-align: center;
            width: 100%;
          }
          .pay-list-p {
            line-height: 36px;
            span {
              font-size: 24px;
              color: #000;
              font-weight: 400;
            }
          }
          &:hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
            border-color: rgba(0, 0, 0, 0.09);
          }
          &.active {
            background: url('../../assets/image/select.png') no-repeat top right;
            border-color: #bd8e4f;
            border-width: 2px;
            box-shadow: 0 2px 20px 0 #db8e4f;
            .pay-list-p span {
              color: #bd8e4f;
            }
          }
        }
      }
    }

    .pay-select-way {
      margin: 24px 0;
      h4 {
        font-size: 18px;
      }
      .pay-select-vip-list {
        display: flex;
        margin: 24px 0;
        li {
          flex: 0 0 170px;
          border: 1px solid #e8e8e8;
          padding: 24px 40px;
          margin-right: 36px;
          border-radius: 4px;
          cursor: pointer;
          p {
            line-height: 28px;
            text-align: center;
            font-size: 16px;
            color: #999;
          }
          &:hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
            border-color: rgba(0, 0, 0, 0.09);
          }
          &.active {
            background: url('../../assets/image/select.png') no-repeat top right;
            border-color: #bd8e4f;
            border-width: 2px;
            box-shadow: 0 2px 20px 0 #db8e4f;
            .pay-list-p span {
              color: #bd8e4f;
            }
          }
        }
      }
    }

    .pay-select-money {
      margin: 24px 0;
      h4 {
        font-size: 18px;
      }
      .pay-price {
        display: flex;
        justify-content: space-between;
        margin: 24px 0;
        p {
          line-height: 28px;
          text-align: center;
          font-size: 16px;
          color: #999;
          span {
            color: #bd8e4f;
            font-size: 24px;
            font-weight: 400;
          }
          del {
            color: #bd8e4f;
            font-size: 24px;
            font-weight: 400;
          }
        }
      }
    }

    .pay-text {
      p {
        line-height: 24px;
      }
    }
    .payment {
      text-align: center;
      margin: 42px 0;
    }
  }
}
.h4-title {
  text-align: center;
  font-size: @h4;
}
.wechart {
  text-align: center;
  padding: 24px;
  .wechart-img {
    width: 260px;
    height: 260px;
    margin: 0 auto;
  }
}
</style>
