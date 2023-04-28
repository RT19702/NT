<template>
  <view>
    <NavBar title="共识记录"></NavBar>
    <view class="section-main">
      <view class="section-list">
        <u-list @scrolltolower="scrolltolower" height="900rpx">
          <view class="item" v-for="(item, index) in rushBuyList" :key="index">
            <view class="d-flex justify-between align-items-center">
              <view>
                <view class="d-flex title">
                  <view class="">{{ item.name }}</view>
                  <view class="round">第{{ item.rb_round }}期</view>
                </view>
                <view class="price">参与金额：{{ item.price }} USDT</view>
                <view class="date">参与时间：{{ item.creat_time }}</view>
              </view>
              <view class="button">
                {{ item.crowdfund_name }}
              </view>
            </view>
          </view>
        </u-list>
      </view>
    </view>
  </view>
</template>

<script>
import { rushBuyListApi } from "@/api/index.js";
export default {
  data() {
    return {
      page: 1,
      // 记录列表
      rushBuyList: [],
    };
  },
  methods: {
    // 滚动到底部触发事件
    scrolltolower() {
      this.getRushBuyList();
    },
    // 获取记录列表
    async getRushBuyList() {
      const parasm = {
        page: this.page,
      };
      const { data } = await rushBuyListApi(parasm);
      if (data.list_data && data.list_data.length) {
        this.page++;
        this.rushBuyList = this.rushBuyList.concat(data.list_data);
      }
    },
  },
  onLoad() {
    this.getRushBuyList();
  },
};
</script>

<style lang="scss">
.section-main {
  margin: 40rpx;
  .section-list {
    padding: 40rpx;
    background-color: rgba(255, 255, 255, 0.1);

    .item {
      background: #040410;
      padding: 30rpx;
      margin-bottom: 30rpx;

      .title {
        color: #fff;

        .round {
          margin-left: 20rpx;
        }
      }
      .price,
      .date {
        margin-top: 10rpx;
        color: #ffffff90;
        font-size: 25rpx;
      }
      .button {
        background-color: #fff;
        color: #cb8110;
        padding: 10rpx 20rpx;
      }

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
