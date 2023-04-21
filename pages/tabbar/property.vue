<template>
  <view>
    <NavBar title="ASSETS" :showLeft="false"></NavBar>
    <swiper
      class="section-swiper"
      :indicator-dots="true"
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
          <view class="balance">{{ usdtDetail.usdt || 0 }}</view>
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
          <view class="balance">0</view>
          <view class="d-flex align-items-center justify-between">
            <view class="d-flex align-items-center">
              <text class="title">锁仓</text>
              <text class="number">0</text>
            </view>
            <view class="d-flex align-items-center">
              <text class="title">GAS</text>
              <text class="number">0</text>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="section-first" v-show="current !== 1">
      <view class="section-icon d-flex justify-around text-center">
        <view
          v-for="(item, index) in usdtList"
          :key="index"
          @click="handleRoute(item)"
        >
          <view class="image">
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
      <view class="section-list">
        <view class="d-flex title">
          <view class="item current">可用明细</view>
          <view class="item">配置明细</view>
        </view>
        <view class="content">
          <view
            class="item d-flex align-items-center justify-between"
            v-for="(item, index) in detailList"
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
              <view class="number">
                {{ item.adds }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="section-second" v-show="current == 1">
      <view class="section-icon d-flex justify-around">
        <view
          v-for="(item, index) in ntList"
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
      <view class="section-list">
        <view class="d-flex title">
          <view class="item current">可用明细</view>
          <view class="item">锁仓明细</view>
          <view class="item">GAS明细</view>
        </view>
        <view class="content">
          <view
            class="item d-flex align-items-center justify-between"
            v-for="(item, index) in ntilList"
            :key="index"
          >
            <view>
              <view class="title">
                {{ item.title }}
              </view>
              <view class="date">
                {{ item.createtime }}
              </view>
            </view>
            <view>
              <view class="number">
                {{ item.money }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import { usdtFlowApi } from "@/api/index.js";
export default {
  data() {
    return {
      current: 0,
      // current 为 0 时显示的iconList
      usdtList: [
        // {
        //   title: "转账",
        //   icon: "/static/images/section/transfer.png",
        // },
        {
          title: "充值",
          icon: "/static/images/section/recharge.png",
          route: "/subpackages/transaction/transaction?type=recharge",
        },
        {
          title: "提现",
          icon: "/static/images/section/withdraw.png",
          // route: "/subpackages/transaction/transaction?type=withdraw",
        },
      ],
      // current 为 1 时显示的iconList
      ntList: [
        {
          title: "配置U兑换GAS",
          icon: "/static/images/section/transfer.png",
        },
        {
          title: "可用U购买GAS",
          icon: "/static/images/section/recharge.png",
          // route: "/subpackages/transaction/transaction?type=recharge",
        },
      ],
      detailList: [],
      ntilList: [],
      usdtDetail: {},
    };
  },
  computed: {
    ...mapState("app", ["user"]),
  },
  methods: {
    handleChange(event) {
      this.current = event.detail.current;
    },
    handleRoute(item) {
      if (item.route) {
        uni.navigateTo({
          url: item.route,
        });
      } else {
        this.$showToast("敬请期待");
      }
    },
    getUsdtFlow() {
      this.detailList = [];
      usdtFlowApi().then((res) => {
        if (res.code === 0) {
          const { data } = res;
          this.$set(this.usdtDetail, "usdt", data.usdt);
          this.detailList.push(...res.data.list_data);
        }
      });
    },
  },
  onShow() {
    this.getUsdtFlow();
  },
};
</script>

<style lang="scss">
.section-swiper {
  margin-top: 45rpx;
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
  margin-top: 40rpx;

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
    }
  }
}
</style>
