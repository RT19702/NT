<template>
  <view>
    <view class="item d-flex align-items-center justify-between">
      <view class="label">提现类型</view>
      <view class="radio d-flex align-items-center">
        <view class="circle"></view>
        <text>USDT</text>
      </view>
    </view>
    <view class="content">
      <view class="d-flex align-items-center text">
        <view class="label">提现数量</view>
        <view class="tips d-flex align-items-center">
          USDT余额：{{ user.usdt }}
        </view>
      </view>
      <view class="control">
        <u--input
          placeholder="请输入"
          border="surround"
          color="#fff"
          placeholderClass="placeholder-color"
          customStyle="padding:0;"
          :value="amount"
          @input="changAmount"
          type="number"
        >
        </u--input>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["amount"],
  data() {
    return {};
  },
  methods: {
    ...mapActions("app", ["getUser"]),
    changAmount(value) {
      this.$emit("update:amount", value);
    },
  },
  computed: {
    ...mapState("app", ["user"]),
  },
};
</script>

<style lang="scss">
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
</style>
