<template>
  <view class="wrapper">
    <NavBar title="ASSETS" :showLeft="false"></NavBar>
    <view class="swiper-item first">
      <view class="usable">可用USDT</view>
      <view class="info d-flex">
        <u--image
          :showLoading="true"
          src="/static/images/common/usdt.png"
          width="23px"
          height="23px"
        >
        </u--image>
        <view class="money">USDT</view>
      </view>
      <view class="balance">{{ user.usdt || 0 }}</view>
      <view class="d-flex align-items-center">
        <text class="title">配置</text>
        <text class="number">{{ user.dispose_u }}</text>
      </view>
      <view class="d-flex justify-end">
        <view
          class="d-flex align-items-center icon-item justify-between"
          v-for="(item, index) in gatherMsg.USDT.iconList"
          :key="index"
          @click="handleRoute(item)"
        >
          <u--image
            :showLoading="true"
            :src="item.icon"
            width="40rpx"
            height="40rpx"
          ></u--image>
          <text>{{ item.title }}</text>
        </view>
      </view>
    </view>
    <view class="swiper-item second">
      <view class="info d-flex">
        <u--image
          :showLoading="true"
          src="/static/images/common/nt.png"
          width="23px"
          height="23px"
        >
        </u--image>
        <view class="money">NT</view>
      </view>
      <view class="usable">可用NT</view>
      <view class="balance">{{ user.nt }}</view>
      <view class="d-flex align-items-center justify-between">
        <view class="d-flex align-items-center">
          <text class="title">锁仓</text>
          <text class="number">{{ user.lock_nt }}</text>
        </view>
        <view class="d-flex align-items-center">
          <text class="title">GAS</text>
          <text class="number">{{ user.ntgas }}</text>
        </view>
      </view>
      <view class="d-flex justify-end">
        <view
          class="d-flex align-items-center icon-item justify-between"
          v-for="(item, index) in gatherMsg.NT.iconList"
          :key="index"
          @click="handleRoute(item)"
        >
          <u--image
            :showLoading="true"
            :src="item.icon"
            width="40rpx"
            height="40rpx"
          ></u--image>
          <text>{{ item.title }}</text>
        </view>
      </view>
    </view>
    <view class="section-list">
      <view class="d-flex title">
        <view
          class="item"
          :class="[current == index ? 'current' : '']"
          v-for="(item, index) in gatherTitle"
          :key="index"
          @click="toggleActive(index)"
        >
          {{ item }}
        </view>
      </view>
      <view class="content">
        <u-list @scrolltolower="scrolltolower" height="600rpx">
          <view
            class="item d-flex align-items-center justify-between"
            v-for="(item, index) in gatherList[current].list"
            :key="index"
          >
            <view>
              <view class="title">
                {{ item.desc }}
              </view>
              <view class="date">
                {{ item.addtime }}
              </view>
            </view>
            <view>
              <view class="number" :class="[item.adds ? 'adds' : 'reduce']">
                {{ item.adds ? item.adds.toFixed(2) : item.reduce.toFixed(2) }}
              </view>
            </view>
          </view>
        </u-list>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { currencyListApi } from "@/api/index.js";
export default {
  data() {
    return {
      current: 0,
      gatherTitle: {
        0: "USDT明细",
        1: "配置明细",
        2: "NT明细",
        3: "GAS明细",
      },
      // 集合列表
      gatherMsg: {
        USDT: {
          iconList: [
            {
              title: "充值",
              icon: "/static/images/section/recharge.png",
              route:
                "/subpackages/transaction/transaction?type=recharge&currency=USDT",
            },
            {
              title: "提现",
              icon: "/static/images/section/withdraw.png",
              route: "/subpackages/transaction/transaction?type=withdraw",
            },
          ],
        },
        NT: {
          iconList: [
            {
              title: "充值",
              icon: "/static/images/section/transfer.png",
              route:
                "/subpackages/transaction/transaction?type=recharge&currency=NT",
            },
            {
              title: "兑换",
              icon: "/static/images/section/recharge.png",
              route: "/subpackages/transaction/transaction?type=exchange",
            },
          ],
        },
      },
      // 集合数据
      gatherList: {
        // USDT
        0: {
          page: 1,
          list: [],
          isEnd: true,
        },
        // 配置U
        1: {
          page: 1,
          list: [],
          isEnd: true,
        },
        // NT
        2: {
          page: 1,
          list: [],
          isEnd: true,
        },
        // NTGAS
        3: {
          page: 1,
          list: [],
          isEnd: true,
        },
      },
    };
  },
  computed: {
    ...mapState("app", ["user"]),
  },
  methods: {
    ...mapActions("app", ["getUser"]),
    // 路由跳转
    handleRoute(item) {
      if (item.route) {
        uni.navigateTo({
          url: item.route,
        });
      } else {
        this.$showToast("敬请期待");
      }
    },
    // 切换选项
    toggleActive(index) {
      this.current = index;
      this.getFlow();
      /* this.gatherMsg[this.current].active = index;
      let current = this.gatherList[this.current];
      current.page = 1;
      current.list = [];
      current.isEnd = true;
      this.getFlow(); */
    },
    scrolltolower() {
      this.getFlow();
    },
    getFlow() {
      const params = {
        page: this.gatherList[this.current].page,
        // 货币类型 1：USDT 2：配置U 3：NT 4：NTgas
        type: Number(this.current) + 1,
      };
      if (this.gatherList[this.current].isEnd) {
        this.getCurrencyList(params);
      }
    },
    getCurrencyList(params) {
      currencyListApi(params)
        .then((res) => {
          let current = this.gatherList[this.current];
          let { data } = res;
          if (data.list_data && data.list_data.length) {
            current.page++;
            current.list.push(...data.list_data);
          } else {
            current.isEnd = false;
          }
        })
        .catch((err) => {});
    },
  },
  onLoad() {},
  onShow() {
    this.gatherList[this.current].page = 1;
    this.gatherList[this.current].list = [];
    this.gatherList[this.current].isEnd = true;
    this.getFlow();
    // this.getUser();
  },
};
</script>

<style lang="scss">
.white {
  color: #fff;
  font-family: AlibabaPuHuiTi_2_65_Medium;
}
.wrapper {
  padding-bottom: 150rpx;
}
.swiper-tips {
  margin-top: 10rpx;
  .item {
    font-family: AlibabaPuHuiTi_2_65_Medium;
    font-size: 40rpx;
    color: #adadb1;
    &:last-child {
      margin-left: 40rpx;
    }
  }
  .active {
    color: $theme-color;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      width: 70%;
      height: 8rpx;
      background-color: $theme-color;
      bottom: -10rpx;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

.swiper-item {
  padding: 40rpx 40rpx 20rpx;
  width: 75%;
  border-radius: 6px 6px 0px 0px;
  margin: 0 auto;
  color: #fff;
  position: relative;

  .info {
    background-color: #debf92;
    padding: 5rpx 10rpx;
    border-radius: 50px;
    position: absolute;
    right: 30rpx;
    top: 20rpx;
    color: #575153;
    font-family: AlibabaPuHuiTi_2_65_Medium;

    .money {
      margin-left: 10rpx;
    }
  }

  .usable {
    font-size: 32rpx;
    margin-bottom: 10rpx;
    // font-family: AlibabaPuHuiTi_2_55_Regular;
  }

  .balance {
    font-size: 60rpx;
    margin-bottom: 40rpx;
  }

  .title {
  }

  .number {
    margin-left: 10rpx;
    font-size: 40rpx;
  }

  .icon-item {
    background: #39353e;
    border-radius: 20px;
    padding: 8rpx 25rpx;
    font-size: 25rpx;
    margin-left: 20rpx;
    margin-top: 20rpx;
  }
}

.first {
  // background: linear-gradient(322deg, #D7AE73 0%, #DBC395 100%);
  background: linear-gradient(to right, #dbc395, #d7ae73);
}

.second {
  // background: linear-gradient(322deg, #c57b15 0%, #DBC395 100%);
  background: linear-gradient(to right, #c67e1b, #dbc395);
  margin-top: 50rpx;
}

.section-icon {
  // margin-top: 0rpx;

  .title {
    margin-top: 20rpx;
    text-align: center;
    color: #fff;
  }
}

.section-list {
  margin-top: 30rpx;
  padding: 30rpx;

  > .title {
    color: #807f83;
    font-size: 35rpx;
    margin-bottom: 40rpx;
    font-family: AlibabaPuHuiTi_2_65_Medium;

    .item {
      margin-right: 40rpx;
      &:last-child {
        margin: 0;
      }
    }

    .current {
      color: $theme-color;
    }
  }

  .content {
    background-color: #342e2f;
    padding: 36rpx 28rpx;
    border: 1px dashed $theme-color;
    border-radius: 5px;

    .item {
      padding-bottom: 30rpx;
      border-bottom: 1px solid #6d6969;
      margin-bottom: 20rpx;

      .title {
        font-size: 30rpx;
        color: #fff;
        margin-bottom: 10rpx;
      }

      .date {
        color: #888585;
        font-size: 26rpx;
      }

      .number {
        font-size: 38rpx;
        color: $theme-color;
      }

      .reduce {
        color: #ff4646;
      }
    }
  }
}
</style>
