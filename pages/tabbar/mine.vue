<template>
  <view>
    <DialogTips :hasTips.sync="hasQrCode"></DialogTips>
    <DialogTips :hasTips.sync="hasBuy">
      <view slot="title">购买额外释放权限</view>
      <view slot="content"
        >支付300配置U购买1%的释放权限 释放权限最大为百分之五，永久有效</view
      >
      <view slot="footer">
        <!-- <view class="d-flex align-items-center justify-center"> -->
        <view class="d-flex section-button">
          <u-button
            text="取消"
            class="tips-button cancel"
            color="linear-gradient(294deg, #D7AE73 0%, #DBC395 100%)"
            shape="circle"
            @click="hasBuy = false"
          ></u-button>
          <u-button
            text="购买"
            class="tips-button purchase"
            color="linear-gradient(294deg, #D7AE73 0%, #DBC395 100%)"
            shape="circle"
            @click="hasVerification = true"
          ></u-button>
        </view>
      </view>
    </DialogTips>
    <DialogPay
      :hasVerification.sync="hasVerification"
      @confirmIdentify="confirmIdentify"
    >
      <view slot="title">支付密码</view>
      <view slot="main-title">请输入支付密码进行认购</view>
    </DialogPay>
    <view class="container">
      <view class="section-background"></view>
      <NavBar :showLeft="false" title=""> </NavBar>
      <view class="section-userinfo d-flex align-items-center justify-between">
        <view class="d-flex align-items-center">
          <view class="image">
            <u--image
              :showLoading="true"
              src="https://cdn.uviewui.com/uview/album/1.jpg"
              width="63px"
              height="63px"
              radius="20"
            ></u--image>
            <!-- <view class="level">v1</view> -->
          </view>
          <view class="item">
            <view class="title">{{ user.user_id }}</view>
            <view class="address">地址：{{ _defaultAccount }}</view>
            <view class="release">释放权限：{{ user.release_ratio }}%</view>
          </view>
        </view>
        <u--image
          :showLoading="true"
          src="/static/images/section/service.png"
          width="30px"
          height="30px"
        >
        </u--image>
      </view>
      <view class="section-main">
        <u--image
          src="/static/images/section/mine_banner2.png"
          width="100%"
          height="100px"
          mode="widthFix"
          @click="hasBuy = true"
        >
        </u--image>
        <view class="section-apply">
          <!-- <view class="title"> 基础设置 </view> -->
          <view class="content">
            <view
              class="item d-flex align-items-center justify-between"
              v-for="(item, index) in applyList"
              :key="index"
              @click="handleMenuClick(item)"
            >
              <template>
                <view class="d-flex align-items-center">
                  <u--image
                    :src="item.icon"
                    width="25px"
                    height="25px"
                    mode="widthFix"
                  ></u--image>
                  <text class="title">{{ item.title }}</text>
                </view>
                <view class="">
                  <u--image
                    src="/static/images/icon/right.png"
                    width="15px"
                    height="15px"
                    mode="widthFix"
                  ></u--image>
                </view>
              </template>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getAddress } from "@/utils/auth.js";
import { buyReleaseApi } from "@/api/index.js";
export default {
  data() {
    return {
      // 二维码弹窗
      hasQrCode: false,
      // 购买弹窗
      hasBuy: false,
      // 支付密码弹窗
      hasVerification: false,
      // 设置列表
      applyList: [
        // {
        // 	title: '账号管理',
        // 	icon: '/static/images/icon/user.png',
        // },
        {
          title: "安全中心",
          icon: "/static/images/icon/safety.png",
          route: "/subpackages/safety/safety",
        },
        {
          title: "我的团队",
          icon: "/static/images/icon/team.png",
          route: "/subpackages/team/team",
        },
        {
          title: "客服中心",
          icon: "/static/images/icon/service.png",
          event: "handleClickService",
        },
        {
          title: "推荐分享",
          icon: "/static/images/icon/recommend.png",
          route: "/subpackages/recommend/recommend?type=share",
        },
      ],
    };
  },
  methods: {
    ...mapActions("app", ["getUser"]),
    handleMenuClick(item) {
      if (item.route) {
        uni.navigateTo({
          url: item.route,
        });
      } else if (item.event) {
        // 如果存在event字段，则调用相应的方法
        const fn = this.$options.methods[item.event];
        if (fn) {
          // 确保 `this` 指向当前 Vue 实例
          fn.bind(this)();
        } else {
          console.error(`Cannot find method: ${item.event}`);
        }
      }
    },
    handleClickService() {
      this.hasQrCode = true;
    },
    confirmIdentify(val) {
      const params = {
        pay_pass: val,
      };
      buyReleaseApi(params)
        .then((res) => {
          this.getUser();
          this.$showToast(res.msg);
        })
        .finally(() => {
          this.hasVerification = false;
          this.hasBuy = false;
        });
    },
  },
  computed: {
    ...mapState("app", ["user"]),
    /* 钱包地址 带* */
    _defaultAccount() {
      return (
        getAddress().substr(0, 6) +
        "*****" +
        getAddress().substr(-5, getAddress().length)
      );
    },
  },
  onShow() {
    this.getUser();
  },
};
</script>

<style lang="scss">
.section-button {
  width: 450rpx;
  margin: 0 auto;
  .tips-button {
    width: 200rpx;
  }
  .cancel {
    opacity: 0.8;
  }
  .purchase {
    margin-left: 20rpx;
  }
}
.container {
  position: relative;
  .section-background {
    position: absolute;
    width: 100%;
    height: 320rpx;
    background: linear-gradient(180deg, #d7ae73 0%, #dbc395 100%);
    border-radius: 0px 0px 22px 22px;
    opacity: 0.17;
    // z-index: -1;
  }

  .section-userinfo {
    color: #fff;
    padding: 40rpx 30rpx;
    position: relative;
    z-index: 9;

    .image {
      position: relative;

      .level {
        position: absolute;
        padding: 0rpx 10rpx;
        background: linear-gradient(180deg, #d7ae73 0%, #dbc395 100%);
        border-radius: 4px 4px 4px 1px;
        right: -5rpx;
        bottom: -5rpx;
      }
    }

    .item {
      margin-left: 30rpx;
      font-family: AlibabaPuHuiTi_2_65_Medium;
      font-size: 26rpx;

      .title {
        font-weight: bold;
        font-size: 40rpx;
      }
    }
  }

  .section-main {
    margin: 90rpx 30rpx;

    .section-apply {
      color: #fff;

      > .title {
        font-family: AlibabaPuHuiTi_2_65_Medium;
        margin-bottom: 30rpx;
        font-size: 35rpx;
      }

      .content {
        background-color: rgba(80, 79, 85, 0.8);
        padding: 50rpx 30rpx;

        border-radius: 3px 3px 3px 3px;

        .item {
          margin-bottom: 60rpx;

          .title {
            margin-left: 20rpx;
            font-size: 30rpx;
          }

          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
