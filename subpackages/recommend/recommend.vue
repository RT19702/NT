<template>
  <view class="container">
    <NavBar :title="pageTitle"></NavBar>
    <!-- 共享（share） -->
    <template v-if="type === 1">
      <view class="section-recommend">
        <view class="msg text-center"> {{ invite_url }} </view>
        <view>
          <u-button
            text="复制链接"
            size="large"
            class="custom-style"
            @click="copyUrl"
          ></u-button>
        </view>
      </view>
    </template>
    <!-- 推广（promote） -->
    <template v-else>
      <view class="section-recommend section-promotion">
        <view class="title">对方账号地址：</view>
        <view class="msg">
          <u--input
            placeholder="请输入内容"
            border="surround"
            v-model="value"
            color="#fff"
          ></u--input>
        </view>
        <view>
          <u-button
            text="确定激活"
            size="large"
            class="custom-style"
          ></u-button>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import { inviteApi } from "@/api/index.js";
export default {
  data() {
    return {
      type: 1, // 如果type为1，显示共享（share），否则为2则显示推广（promote）
      value: "",
      invite_url: "",
    };
  },
  methods: {
    getInvite() {
      inviteApi().then((res) => {
        if (res.code === 0) {
          this.invite_url = res.data.invite_url;
        }
      });
    },
    copyUrl() {
      uni.setClipboardData({
        data: this.invite_url,
        success: () => {
          this.$showToast("复制成功", "success");
        },
      });
    },
  },
  computed: {
    pageTitle() {
      return this.type === 1 ? "推荐分享" : "推广";
    },
  },
  onLoad(options) {
    options.type === "share" ? (this.type = 1) : (this.type = 2);
    this.getInvite();
  },
};
</script>

<style lang="scss">
.section-recommend {
  background: rgba(91, 90, 97, 0.8);
  padding: 80rpx 40rpx;
  margin: 40rpx 35rpx;
  border: 1px dashed #727275;

  .msg {
    background-color: rgb(4, 5, 16);
    padding: 30rpx 15rpx;
    color: #fff;
  }

  .custom-style {
    border-radius: 10px;
    color: $theme-color;
    margin-top: 40rpx;
  }
}

.section-promotion {
  padding: 40rpx 40rpx 80rpx;
  color: #fff;

  .title {
    font-size: 38rpx;
    margin-bottom: 30rpx;
    font-family: AlibabaPuHuiTi_2_55_Regular;
  }

  .msg {
    padding: 15rpx 20rpx;
  }
}
</style>
