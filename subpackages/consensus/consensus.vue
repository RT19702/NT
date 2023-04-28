<template>
  <view>
    <NavBar title="NT共识">
      <view slot="right" class="navbar-title" @click="consensusRecording"
        >共识记录</view
      >
    </NavBar>
    <view class="section-main">
      <view class="section-list">
        <view
          class="item"
          v-for="(item, index) in freightList"
          :key="index"
          @click="consensusJump(item)"
        >
          <view class="d-flex justify-between align-items-center">
            <view class="d-flex title">
              <view class="">{{ item.storehouse_name }}</view>
              <view class="round">第{{ item.round }}期</view>
            </view>
            <view class="button">
              {{ item.actual_name }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { activityListApi } from "@/api/index.js";
export default {
  data() {
    return {
      freightList: [],
      consensus: false,
    };
  },
  methods: {
    async activityList() {
      const stateMap = {
        0: "即将开始",
        1: "正在进行中",
        2: "额度已满",
        3: "待结算",
        4: "已结算",
        5: "重生",
      };
      let res = await activityListApi();
      if (res.data && res.data.length) {
        this.freightList = res.data.map((item) => {
          return {
            ...item,
            actual_name: stateMap[item.actual_state],
          };
        });
      }
    },
    // 参与共识
    consensusJump(item) {
      if (item) {
        uni.navigateTo({
          url: `/subpackages/consensus/consensusDetail?id=${item.storehouse_id}&title=${item.storehouse_name}`,
        });
      }
    },
    // 共识记录
    consensusRecording() {
      uni.navigateTo({
        url: "/subpackages/consensus/consensusRecording",
      });
    },
  },
  onLoad() {
    this.activityList();
    // this.getStoreActivity();
  },
};
</script>

<style lang="scss">
.navbar-title {
  font-size: 28rpx;
  position: absolute;
  right: 30rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
}
.section-main {
  margin: 40rpx;

  .upcoming {
    padding: 40rpx;
    background: linear-gradient(270deg, #d7ae73 0%, #dbc395 100%);
    border-radius: 10px 0 10px 0;

    .title {
      color: #fff;
    }

    .button {
      margin-top: 60rpx;
      padding: 15rpx 20rpx;
      background-color: #fff;
      width: 140rpx;
    }
  }

  .tips {
    color: #a5a5a8;
    margin: 30rpx 0;
  }

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
