<template>
  <view>
    <NavBar title="众赢金融"></NavBar>
    <view class="section-content">
      <view class="title text-center">{{ particulars.title }}</view>
      <!-- <view class="date text-center">2022.12.12 18：20</view> -->
      <view v-html="particulars.content"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      params: {
        announce_id: "",
      },
      particulars: {
        title: "众赢金融众赢金融众赢金融众赢金融众",
        content: "",
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.section-content {
  margin: 40rpx 30rpx 0;
  padding: 40rpx;
  box-shadow: 0px 2px 17px 1px rgba(0, 0, 0, 0.1);
  border-radius: 2px 2px 2px 2px;
  background-color: rgba(255, 255, 255, 0.1);

  .title {
    color: #fff;
  }

  .date {
    color: #9c9c9c;
    margin: 20rpx 0;
    font-size: 26rpx;
  }
}
</style>
