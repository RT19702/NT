<template>
  <view class="dialog-content" v-if="hasTips">
    <view class="dialog-bg-box">
      <view class="title">
        <slot name="title">客服二维码</slot>
      </view>
      <view class="code-qr d-flex align-items-center justify-center">
        <slot name="content">
          <u--image
            :showLoading="true"
            :src="serviceQrCode"
            width="380rpx"
            height="380rpx"
          ></u--image>
        </slot>
      </view>
      <view class="button">
        <slot name="footer">
          <u-button
            text="好的"
            color="linear-gradient(294deg, #D7AE73 0%, #DBC395 100%)"
            shape="circle"
            @click="closeQr"
          ></u-button>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    serviceQrCode: {
      type: String,
      default: "https://cdn.uviewui.com/uview/album/1.jpg",
    },
    hasTips: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    closeQr() {
      this.$emit("update:hasTips", false);
    },
  },
};
</script>

<style lang="scss">
.dialog-content {
  position: fixed;
  z-index: 1001;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);

  .dialog-bg-box {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #464a4f;
    padding: 40rpx;
    transform: translate(-50%, -50%);
    width: 70vw;
    color: #fff;
    text-align: center;

    .title {
      font-size: 38rpx;
      font-family: AlibabaPuHuiTi_2_55_Regular;
    }

    .code-qr {
      margin: 50rpx auto;
      /* width: 380rpx;
      height: 380rpx;
      background: #696a6c; */
    }

    .button {
      // width: 200rpx;
      margin: 0 auto;
    }
  }
}
</style>
