<template>
  <view>
    <NavBar title="ASSETS" :showLeft="false"></NavBar>
    <view class="swiper-tips d-flex align-items-center justify-center">
      <view
        class="item"
        :class="[current === 0 ? 'active' : '']"
        @click="toggleOption(0)"
        >USDT</view
      >
      <view
        class="item"
        :class="[current === 1 ? 'active' : '']"
        @click="toggleOption(1)"
        >NT</view
      >
    </view>
    <!-- :indicator-dots="true" -->
    <swiper
      class="section-swiper"
      :current="current"
      :autoplay="false"
      :interval="3000"
      :duration="1000"
      next-margin="50rpx"
      previous-margin="50rpx"
      indicator-active-color="#D2AE78"
      indicator-color="#7B7B7B"
      @change="handleChange"
    >
      <swiper-item>
        <view class="swiper-item first">
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
          <view class="usable">可用USDT</view>
          <view class="balance">{{ user.usdt || 0 }}</view>
          <view class="d-flex align-items-center">
            <text class="title">配置</text>
            <text class="number">{{ user.dispose_u }}</text>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
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
        </view>
      </swiper-item>
    </swiper>
    <view class="section-first">
      <view class="section-icon d-flex justify-around text-center">
        <view
          v-for="(item, index) in gatherMsg[current].iconList"
          :key="index"
          @click="handleRoute(item)"
        >
          <view class="image d-flex justify-center">
            <u--image
              :showLoading="true"
              :src="item.icon"
              width="57px"
              height="57px"
            ></u--image>
          </view>
          <view class="title">
            {{ item.title }}
          </view>
        </view>
      </view>
    </view>
    <view class="section-list">
      <view class="d-flex title">
        <view
          class="item"
          :class="[gatherMsg[current].active === index ? 'current' : '']"
          v-for="(item, index) in gatherMsg[current].titleList"
          :key="index"
          @click="toggleActive(index)"
        >
          {{ item.title }}
        </view>
      </view>
      <view class="content">
        <u-list @scrolltolower="scrolltolower" height="550rpx">
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
import { mapState } from "vuex";
import { currencyListApi } from "@/api/index.js";
export default {
  data() {
    return {
      current: 0,
      // 集合列表
      gatherMsg: {
        0: {
          active: 0,
          titleList: [
            {
              title: "可用明细",
            },
            {
              title: "配置明细",
            },
          ],
          iconList: [
            // {
            //   title: "转账",
            //   icon: "/static/images/section/transfer.png",
            // },
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
        1: {
          active: 0,
          titleList: [
            {
              title: "可用明细",
            },
            {
              title: "GAS明细",
            },
          ],
          iconList: [
            {
              title: "配置U兑换GAS",
              icon: "/static/images/section/transfer.png",
              route: "/subpackages/transaction/transaction?type=exchange",
            },
            {
              title: "充值NT",
              icon: "/static/images/section/recharge.png",
              route:
                "/subpackages/transaction/transaction?type=recharge&currency=NT",
            },
            {
              title: "可用U购买GAS",
              icon: "/static/images/section/recharge.png",
              route: "/subpackages/transaction/transaction?type=purchase",
            },
          ],
        },
      },
      // 集合数据
      gatherList: {
        0: {
          page: 1,
          list: [],
          isEnd: true,
        },
        1: {
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
    toggleOption(index) {
      this.current = index;
    },
    // 轮播图切换
    handleChange(event) {
      this.current = event.detail.current;
      this.getFlow();
      // let current = this.gatherList[this.current];
      // current.page = 1;
      // current.list = [];
      // current.isEnd = true;
    },
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
      this.gatherMsg[this.current].active = index;
      let current = this.gatherList[this.current];
      current.page = 1;
      current.list = [];
      current.isEnd = true;
      this.getFlow();
    },
    scrolltolower() {
      this.getFlow();
    },
    getFlow() {
      const active = this.gatherMsg[this.current].active;
      const currency = this.current === 0 ? active + 1 : active === 0 ? 3 : 4;
      const params = {
        page: this.gatherList[this.current].page,
        type: currency,
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
  onLoad() {
    this.getFlow();
  },
};
</script>

<style lang="scss">
.white {
  color: #fff;
  font-family: AlibabaPuHuiTi_2_65_Medium;
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
.section-swiper {
  margin-top: 50rpx;
  height: 350rpx;

  .swiper-item {
    padding: 40rpx;
    width: 80%;
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
  }

  .first {
    // background: linear-gradient(322deg, #D7AE73 0%, #DBC395 100%);
    background: linear-gradient(to right, #dbc395, #d7ae73);
  }

  .second {
    // background: linear-gradient(322deg, #c57b15 0%, #DBC395 100%);
    background: linear-gradient(to right, #c67e1b, #dbc395);
  }
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
