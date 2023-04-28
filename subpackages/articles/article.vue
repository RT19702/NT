<template>
  <view>
    <NavBar title="众赢金融"></NavBar>
    <view class="section-content">
      <view class="title text-center">{{ particulars.title }}</view>
      <view class="date text-center">{{
        particulars.addtime | filterTime
      }}</view>
      <view v-html="particulars.content"></view>
    </view>
  </view>
</template>

<script>
import { articleDetailApi } from "@/api/index.js";
export default {
  data() {
    return {
      particulars: {},
    };
  },
  methods: {
    getArticleDetail(id) {
      const params = {
        a_id: id,
      };
      articleDetailApi(params).then((res) => {
        this.particulars = res.data;
      });
    },
  },
  onLoad(options) {
    this.getArticleDetail(options.id);
  },
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
