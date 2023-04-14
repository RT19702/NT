<template>
  <view>
    <DialogTips :hasQrCode.sync="hasQrCode"></DialogTips>
    <DialogPay
      :hasVerification.sync="hasVerification"
      @confirmIdentify="confirmIdentify"
    >
      <view slot="title">支付密码</view>
      <view slot="main-title">请输入支付密码进行认购</view>
    </DialogPay>
    <view class="container">
      <view class="section-background"></view>
      <NavBar :showLeft="false" title="MINE"> </NavBar>
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
            <view class="level">v1</view>
          </view>
          <view class="item">
            <view class="title">Luckin</view>
            <view class="address">地址：DSTBHKNFA...13BK1BQ</view>
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
          src="/static/images/section/mine_banner.png"
          width="100%"
          height="100px"
          mode="widthFix"
          @click="hasVerification = true"
        >
        </u--image>
        <view class="section-apply">
          <view class="title"> 基础设置 </view>
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
export default {
  data() {
    return {
      hasQrCode: false,
      hasVerification: false,
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
    confirmIdentify() {
      console.log(123);
    },
  },
  computed: {
    ...mapState("app", ["user"]),
  },
  onShow() {
    this.getUser();
  },
};
</script>

<style lang="scss">
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
      }

      .content {
        background-color: rgba(80, 79, 85, 0.8);
        padding: 50rpx 30rpx;

        border-radius: 3px 3px 3px 3px;

        .item {
          margin-bottom: 60rpx;

          .title {
            margin-left: 20rpx;
            font-size: 26rpx;
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
