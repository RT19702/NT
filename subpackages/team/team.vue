<template>
  <view>
    <NavBar title="我的团队"></NavBar>
    <view class="container">
      <view class="section-people">
        <view class="item d-flex justify-between">
          <view>
            <view class="title">直推人数</view>
            <view class="number">{{ teamMsg.directPush }}</view>
          </view>
          <view>
            <view class="title">团队人数</view>
            <view class="number">{{ teamMsg.pushIndirectly }}</view>
          </view>
        </view>
      </view>
      <view class="section-details">
        <view class="title"> 团队明细 </view>
        <view class="content">
          <view class="item">
            <view class="d-flex justify-between title">
              <view class="column">用户ID</view>
              <view class="column">推荐人数</view>
              <view class="">团队业绩</view>
            </view>
          </view>
          <u-list @scrolltolower="scrolltolower" height="600rpx">
            <view class="item" v-for="(item, index) in teamList" :key="index">
              <view class="d-flex justify-between number">
                <view class="column d-flex align-items-end">
                  <view class="address">{{ item.user_id }}</view>
                  <text class="sub-title">{{ item.level_name }}</text>
                </view>
                <view class="column">{{ item.team_nums }}</view>
                <view class="">{{ item.achievement }}</view>
              </view>
            </view>
          </u-list>
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
      page: 1,
      teamList: [],
    };
  },
  methods: {
    scrolltolower() {
      this.getTeam();
    },
    getTeam() {
      const params = {
        page: this.page,
      };
      teamListApi(params).then((res) => {
        let { data } = res;
        ({
          invite_number: this.teamMsg.directPush,
          team_nums: this.teamMsg.pushIndirectly,
        } = data);
        if (res.code === 0) {
          this.page++;
          this.teamList.push(...res.data.list_data);
        }
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
      .sub-title {
        color: $theme-color;
        font-size: 23rpx;
        margin-left: 10rpx;
      }
    }

    .column {
      flex: 1;
    }

    .address {
      overflow: hidden; /* 隐藏多余文本 */
      white-space: nowrap; /* 在一行中显示 */
      text-overflow: ellipsis; /* 超过一行显示省略号 */
      // width: 100rpx;
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
