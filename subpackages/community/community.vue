<template>
  <view class="section-body">
    <NavBar title="社区"></NavBar>
    <view class="d-flex flex-cloumn justify-between section-main">
      <view class="section-list">
        <view>
          <view class="item title d-flex align-items-center justify-between">
            <text>级别</text>
            <text>认购费用</text>
            <text>动态分红比例</text>
            <!-- <text>释放权限</text> -->
          </view>
          <view
            class="item d-flex align-items-center justify-between"
            v-for="(item, index) in levelList"
            :key="index"
          >
            <text>{{ item.level }}</text>
            <text>{{ item.buy_price || item.buyMsg }}</text>
            <text>{{ item.reward_rate + "%" }}</text>
            <!-- <text>{{item.release_qx + '%'}}</text> -->
          </view>
        </view>
      </view>
      <view class="button">
        <u-button
          text="立即认购"
          color="linear-gradient(180deg, #D7AE73 0%, #DBC395 100%)"
          size="large"
          @click="hasVerification = true"
        ></u-button>
      </view>
    </view>
    <DialogPay
      :hasVerification.sync="hasVerification"
      @confirmIdentify="buyLevel"
    >
      <view slot="title">支付密码</view>
      <view slot="main-title">请输入支付密码进行认购</view>
    </DialogPay>
  </view>
</template>

<script>
import { buyLevelListApi, buyLevelApi } from "@/api/index.js";
export default {
  data() {
    return {
      levelList: [],
      hasVerification: false,
    };
  },
  methods: {
    async getLevelList() {
      const stateMap = {
        1: "可购买",
        2: "不可购买",
      };
      let { data } = await buyLevelListApi();
      this.levelList = data.map((item) => {
        return {
          ...item,
          buyMsg: stateMap[item.is_buy],
        };
      });
    },
    buyLevel(val) {
      const params = {
        level_id: 3,
        pay_pass: val,
      };
      buyLevelApi(params)
        .then((res) => {
          this.$showToast(res.msg);
        })
        .finally(() => {
          this.hasVerification = false;
        });
    },
  },
  onLoad() {
    this.getLevelList();
  },
};
</script>

<style lang="scss">
.section-body {
  height: 100%;
}

.section-main {
  margin: 50rpx 30rpx;
  height: 80%;

  .section-list {
    padding: 40rpx;
    background: rgba(255, 255, 255, 0.1);

    .item {
      text-align: center;
      // margin-bottom: 40rpx;
      color: #fff;
      padding: 30rpx 0;

      & > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      & > :nth-child(1) {
        width: 33.3%;
      }

      & > :nth-child(2) {
        width: 33.3%;
      }

      /* & > :nth-child(3) {
        width: 40%;
      } */

      & > :last-child {
        width: 33.3%;
        // text-align: right;
      }

      &:last-child {
        margin: 0;
      }
    }

    .title {
      color: #8f8e94;
    }
  }

  .button {
    // margin-top: 50%;
  }
}
</style>
