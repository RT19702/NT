<template>
  <view class="wrapper">
    <NavBar :title="pageTitle"></NavBar>
    <view class="container">
      <view class="section-form">
        <!-- 提现 -->
        <Withdraw v-if="type === 'withdraw'" />
        <!-- 充值 -->
        <Recharge
          v-if="type === 'recharge'"
          :rechargeOption.sync="rechargeOption"
        />
        <!-- 兑换 -->
        <Exchange v-if="type === 'exchange'" />
        <!-- <view class="item d-flex align-items-center justify-between">
          <view class="label">交易密码</view>
          <view class="control">
            <u--input
              placeholder="请输入交易密码"
              border="surround"
              inputAlign="right"
              color="#fff"
              placeholderClass="placeholder-color"
            ></u--input>
          </view>
        </view> -->
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
import { rechargeApi, rechargeCallbackApi } from "@/api/index.js";
import BigNumber from "bignumber.js";
import Withdraw from "./withdraw.vue";
import Recharge from "./recharge.vue";
import Exchange from "./exchange.vue";
export default {
  components: {
    Exchange,
    Recharge,
    Withdraw,
  },
  data() {
    return {
      typeMap: {
        withdraw: "提现",
        recharge: "充值",
        exchange: "兑换",
      },
      type: "withdraw", // 默认值为提现
      rechargeOption: {},
    };
  },
  methods: {
    transaction() {
      if (this.type === "recharge" && this.rechargeOption.amount) {
        this.recharge();
      } else {
        this.$showToast("请选择充值金额");
      }
    },
    recharge() {
      const that = this;
      const { toBuyAddress } = require("@/common/setting.js");
      let swapamount = BigNumber(this.rechargeOption.amount)
        .times(1e18)
        .toFixed(0);
      let params = {
        options_id: this.rechargeOption.id,
      };
      rechargeApi(params).then((res) => {
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
  },
  computed: {
    pageTitle() {
      return this.typeMap[this.type];
    },
  },
  onLoad(options) {
    if (options.type && Object.keys(this.typeMap).includes(options.type)) {
      this.type = options.type;
    }
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
