<template>
  <view>
    <NavBar title="我的团队"></NavBar>
    <view class="container">
      <view class="section-people">
        <view class="item d-flex justify-between">
          <view>
            <view class="title">直推人数</view>
            <view class="number">39.3411</view>
          </view>
          <view>
            <view class="title">间推人数</view>
            <view class="number">39.3411</view>
          </view>
        </view>
      </view>
      <view class="section-details">
        <view class="title"> 团队明细 </view>
        <view class="content">
          <view class="item" v-for="(item, index) in teamList" :key="index">
            <view class="d-flex justify-between title">
              <view class="column">钱包地址</view>
              <view class="column">推荐人数</view>
              <view class="">团队业绩</view>
            </view>
            <view class="d-flex justify-between number">
              <view class="column">{{ item.address }}</view>
              <view class="column">{{ item.people }}</view>
              <view class="">{{ item.performance }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { teamListApi } from "@/api/index.js";
export default {
  data() {
    return {
      teamMsg: {
        directPush: 0, // 直推人数
        pushIndirectly: 0, // 间推人数
      },
      teamList: [],
    };
  },
  methods: {
    getTeam() {
      teamListApi().then((res) => {
        let { data } = res;
        ({ invite_number: this.teamMsg.directPush } = data);
      });
    },
  },
  onLoad() {
    this.getTeam();
  },
};
</script>

<style lang="scss">
.container {
  padding: 50rpx 35rpx;
}

.section-people {
  padding: 50rpx 80rpx;
  background-color: rgba(8, 8, 20, 0.2);
  border: 40rpx solid $theme-color;
  border-radius: 5px;
  position: relative;

  &::after {
    position: absolute;
    content: "";
    background-color: #62626a;
    width: 1px;
    height: 40%;
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
  }

  .item {
    color: #fff;

    .title {
      color: #808086;
      font-size: 28rpx;
      margin-bottom: 10rpx;
      font-family: AlibabaPuHuiTi_2_65_Medium;
    }

    .number {
      font-size: 38rpx;
    }
  }
}

.section-details {
  margin-top: 60rpx;

  > .title {
    margin-bottom: 40rpx;
    color: $theme-color;
    font-size: 36rpx;
    font-family: AlibabaPuHuiTi_2_65_Medium;
  }

  .content {
    padding: 50rpx;
    background-color: rgba(57, 50, 52, 0.6);
    border: 1px dashed $theme-color;
    border-radius: 5px;
    .item {
      padding-bottom: 30rpx;
      margin-bottom: 30rpx;
      border-bottom: 1px solid #6c6868;

      &:last-child {
        margin: 0;
      }
    }

    .column {
      flex: 1;
    }

    .title {
      color: #817d7d;
      margin-bottom: 10rpx;
    }

    .number {
      color: #fff;
      font-size: 30rpx;
    }
  }
}
</style>
