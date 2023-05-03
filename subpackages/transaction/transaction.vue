<template>
  <view class="wrapper">
    <NavBar :title="pageTitle"></NavBar>
    <DialogPay
      :hasVerification.sync="hasVerification"
      @confirmIdentify="confirmIdentify"
    >
      <view slot="title">支付密码</view>
      <view slot="main-title">请输入支付密码进行认购</view>
    </DialogPay>
    <view class="container">
      <view class="section-form">
        <!-- 提现 -->
        <Withdraw v-if="type === 'withdraw'" :amount.sync="amount" />
        <!-- 充值USDT -->
        <!-- <RechargeUsdt
          v-if="type === 'recharge' && rechargeType === 'USDT'"
          :rechargeOption.sync="rechargeOption"
        /> -->
        <RechargeUsdt
          v-if="type === 'recharge' && rechargeType === 'USDT'"
          :amount.sync="amount"
        />
        <!-- 充值NT -->
        <RechargeNT
          v-if="type === 'recharge' && rechargeType === 'NT'"
          :amount.sync="amount"
        />
        <!-- 兑换 -->
        <Exchange v-if="type === 'exchange'" :amount.sync="amount">
          <view slot="price">配置U余额：{{ user.dispose_u }}</view>
        </Exchange>
        <Exchange v-if="type === 'purchase'" :amount.sync="amount">
          <view slot="title">购买类型</view>
          <view slot="label">购买数量</view>
          <view slot="price">USDT余额：{{ user.usdt }}</view>
        </Exchange>
        <view class="tips" v-show="amount && type === 'purchase'"
          >需扣除USDT：{{ amount }}</view
        >
        <view class="tips" v-show="amount && type === 'exchange'"
          >需扣除配置U：{{ Number(amount * 1.2).toFixed(2) }}
        </view>
      </view>
      <view class="button">
        <u-button
          text="提交"
          size="large"
          color="linear-gradient(180deg, #D7AE73 0%, #DBC395 100%)"
          @click="transaction"
        >
        </u-button>
      </view>
    </view>
  </view>
</template>

<script>
import {
  rechargeApi,
  rechargeCallbackApi,
  exchangeCurrencyApi,
  withdrawApi,
  rechargeNewApi,
} from "@/api/index.js";
import { mapState, mapActions } from "vuex";
import BigNumber from "bignumber.js";
import Withdraw from "./withdraw.vue";
import RechargeUsdt from "./recharge.vue";
import RechargeNT from "./rechargeNt.vue";
import Exchange from "./exchange.vue";
export default {
  components: {
    Exchange,
    RechargeUsdt,
    Withdraw,
    RechargeNT,
  },
  data() {
    return {
      typeMap: {
        withdraw: "提现",
        recharge: "充值",
        exchange: "兑换",
        purchase: "购买",
      },
      type: "withdraw", // 默认值为提现
      rechargeType: "USDT", // 默认值为usdt
      rechargeOption: {},
      amount: null,
      hasVerification: false,
    };
  },
  methods: {
    ...mapActions("app", ["getUser"]),
    transaction() {
      switch (this.type) {
        // 提现
        case "withdraw":
          if (this.amount) {
            this.withdrawal();
          } else {
            this.$showToast("请填写提现金额");
          }
          break;
        // 购买
        case "purchase":
          if (this.amount) {
            // this.purchase();
            this.hasVerification = true;
          } else {
            this.$showToast("请输入购买数量");
          }
          break;
        // 兑换
        case "exchange":
          if (this.amount) {
            // this.exchange();
            this.hasVerification = true;
          } else {
            this.$showToast("请输入兑换数量");
          }
          break;
        // 充值USDT
        case "recharge":
          // if (this.amount || this.rechargeOption.amount) {
          if (this.amount) {
            if (this.rechargeType === "USDT") {
              this.rechargeUsdt();
            } else if (this.rechargeType === "NT") {
              this.rechargeNT();
            } else {
              this.$showToast("请选择充值类型");
            }
          } else {
            this.$showToast("请填写充值金额");
          }
          break;

        default:
          this.$showToast("请选择操作类型");
          break;
      }
    },
    // 确认支付密码
    confirmIdentify(cipher) {
      this.hasVerification = false;
      switch (this.type) {
        // 购买
        case "purchase":
          this.purchase(cipher);
          break;
        // 兑换
        case "exchange":
          this.exchange(cipher);
          break;

        default:
          break;
      }
    },
    // 提现
    withdrawal() {
      const params = {
        type: 1,
        amount: this.amount,
      };
      this.$showLoading("交易中");
      withdrawApi(params).then((res) => {
        if (res.code === 0) {
          this.$showToast("提现成功");
          this.getUser();
          this.amount = null;
        } else {
          this.$showToast(res.msg);
        }
      });
    },
    // 购买
    purchase(cipher) {
      const params = {
        type: 2,
        pay_type: 1,
        nums: this.amount,
        pay_pass: cipher,
      };
      this.$showLoading("交易中");
      exchangeCurrencyApi(params).then((res) => {
        if (res.code === 0) {
          this.$showToast("购买成功");
          this.getUser();
          this.amount = null;
        } else {
          this.$showToast(res.msg);
        }
      });
    },
    // 兑换
    exchange(cipher) {
      const params = {
        type: 2,
        pay_type: 2,
        nums: this.amount,
        pay_pass: cipher,
      };
      this.$showLoading("交易中");
      exchangeCurrencyApi(params).then((res) => {
        if (res.code === 0) {
          this.$showToast("兑换成功");
          this.getUser();
          this.amount = null;
        } else {
          this.$showToast(res.msg);
        }
      });
    },
    // 充值USDT
    rechargeUsdt() {
      const that = this;
      const { toBuyAddress } = require("@/common/setting.js");
      /* let swapamount = BigNumber(this.rechargeOption.amount)
				  .times(1e18)
				  .toFixed(0); 
				let params = {
				  options_id: this.rechargeOption.id,
				}; */
      const params = {
        amount: this.amount,
      };
      let swapamount = BigNumber(this.amount).times(1e18).toFixed(0);
      rechargeNewApi(params).then((res) => {
        if (res.code === 0) {
          let { order_sn } = res.data;
          that.$showLoading("交易中");
          /* 2、提交支付 */
          that.$store
            .dispatch("web3/transfer", {
              amount:
                swapamount /* BigNumber(that.numberOne).times(1e18).toFixed(0)*/,
              to: toBuyAddress,
            })
            .then((res) => {
              that.$hideLoading();
              const transactionHash = res.transactionHash;
              rechargeCallbackApi({
                hash: transactionHash,
                order_sn,
              })
                .then((res) => {
                  that.$showToast(res.msg);
                  that.$store.dispatch("web3/getBalanceOfUsdt");
                })
                .catch((err) => {});
            })
            .catch((err) => {
              that.$showToast(err.message);
              that.$hideLoading();
            });
        } else {
          that.$showToast(res.msg);
        }
      });
    },
    // 充值NT
    rechargeNT() {
      const that = this;
      const params = {
        type: 1,
        pay_type: 3,
        nums: this.amount,
      };
      const { toBuyAddress } = require("@/common/setting.js");
      // let swapamount = BigNumber(this.amount).times(1e18).toFixed(0);
      exchangeCurrencyApi(params).then((res) => {
        if (res.code === 0) {
          let { order_sn, amount } = res.data;
          that.$showLoading("交易中");
          /* 2、提交支付 */
          that.$store
            .dispatch("web3/transferSet", {
              amount: BigNumber(amount).times(1e18).toFixed(0),
              to: toBuyAddress,
            })
            .then((res) => {
              that.$hideLoading();
              const transactionHash = res.transactionHash;
              rechargeCallbackApi({
                hash: transactionHash,
                order_sn,
              })
                .then((res) => {
                  that.$showToast(res.msg);
                  that.amount = null;
                  // that.$store.dispatch("web3/getBalanceOfUsdt");
                })
                .catch((err) => {});
            })
            .catch((err) => {
              that.$showToast(err.message);
              that.$hideLoading();
            });
        } else {
          that.$showToast(res.msg);
        }
      });
    },
  },
  computed: {
    ...mapState("app", ["user"]),
    pageTitle() {
      return this.typeMap[this.type];
    },
  },
  onLoad(options) {
    Object.assign(this, {
      rechargeType: options.currency || this.rechargeType,
      type:
        options.type && Object.keys(this.typeMap).includes(options.type)
          ? options.type
          : this.type,
    });
  },
  mounted() {
    console.log(this.$data);
  },
};
</script>

<style lang="scss">
.wrapper {
  height: 100%;
}

.container {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  height: 90%;
}

.section-form {
  flex: 1;

  .tips {
    color: $theme-color;
    font-size: 28rpx;
  }

  .item {
    padding: 20rpx 25rpx;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    margin-bottom: 30rpx;

    .label {
      color: #fff;
    }

    .placeholder-color {
      color: #cdcdcd;
    }

    .radio {
      padding: 14rpx 20rpx;
      color: $theme-color;

      .circle {
        width: 15px;
        height: 15px;
        margin-right: 10rpx;
        border: 1px solid $theme-color;
        border-radius: 50%;
        position: relative;

        &::after {
          position: absolute;
          content: "";
          left: 50%;
          top: 50%;
          background-color: $theme-color;
          transform: translate(-50%, -50%);
          width: 50%;
          height: 50%;
          border-radius: 50%;
        }
      }
    }
  }

  .content {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 30rpx 25rpx;
    margin-bottom: 30rpx;

    .text {
      margin-bottom: 30upx;

      .label {
        color: #fff;
      }

      .tips {
        color: $theme-color;
        margin-left: 30rpx;
        font-size: 26rpx;
      }
    }
  }
}

.button {
  margin-top: auto;
  margin-bottom: 20rpx;
}
</style>
