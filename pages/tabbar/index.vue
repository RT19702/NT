<template>
  <view class="container">
    <NavBar :showLeft="false" title="Win by all"> </NavBar>
    <view class="section-main">
      <view class="section-banner">
        <u-swiper
          :list="bannerList"
          height="380rpx"
          imgMode="widthFix"
        ></u-swiper>
      </view>
      <!-- <view class="section-announcement d-flex align-items-center">
        <view class="image">
          <u--image
            :showLoading="true"
            src="/static/images/section/article.png"
            width="23px"
            height="28px"
          >
          </u--image>
        </view>
        <view class="text">
          {{text}}
          <u-notice-bar
            :text="text"
            bgColor="transparent"
            color="#b9b8bb"
            icon=""
          ></u-notice-bar>
        </view>
      </view> -->
      <view class="section-icon d-flex justify-around">
        <view
          class="item d-flex flex-cloumn justify-center align-items-center"
          v-for="(item, index) in iconList"
          :key="index"
          @click="handleMenuClick(item)"
        >
          <view class="image">
            <u--image
              :showLoading="true"
              :src="item.icon"
              width="60px"
              height="60px"
            ></u--image>
          </view>
          <view class="name">
            {{ item.name }}
          </view>
        </view>
      </view>
      <!-- 抢购活动 -->
      <view class="section-list">
        <view class="title">
          <!-- <u--image
            :showLoading="true"
            src="/static/images/section/dynamic_headings.png"
            width="380rpx"
            height="95rpx"
          >
          </u--image> -->
          ~ 最新动态
        </view>
        <view class="auction">
          <swiper class="swiper" circular display-multiple-items="2">
            <swiper-item v-if="newestDynamic.activity">
              <view
                class="swiper-item"
                @click="handleMenuClick(newestDynamic.activity)"
              >
                <view class="content">
                  <view class="title">共识专区</view>
                  <view class="">
                    <u--image
                      :showLoading="true"
                      src="/static/images/section/gold.png"
                      width="300rpx"
                      height="160rpx"
                    ></u--image>
                    <view class="msg">{{
                      `${newestDynamic.activity.storehouse_name}${newestDynamic.activity.stateName}`
                    }}</view>
                  </view>
                </view>
              </view>
            </swiper-item>
            <swiper-item>
              <view
                class="swiper-item"
                v-if="newestDynamic.dynamic && newestDynamic.dynamic.content"
                @click="handleMenuClick(newestDynamic.dynamic)"
              >
                <view class="content">
                  <view class="title">资讯专区</view>
                  <view class="">
                    <u--image
                      :showLoading="true"
                      src="/static/images/section/gold.png"
                      width="300rpx"
                      height="160rpx"
                    ></u--image>
                    <view class="msg">{{
                      newestDynamic.dynamic.title | filterHtml
                    }}</view>
                  </view>
                </view>
              </view>
            </swiper-item>
          </swiper>
        </view>
        <!-- <view class="box_100">
          <view class="section_8">
            <image class="title-images-two" :src="titleList.two" mode="widthFix"></image>
            <view class="auction">
              <swiper
                class="swiper"
                :circular="false"
                :indicator-dots="false"
                :autoplay="false"
                :duration="800"
                next-margin="160rpx"
              >
                <block v-for="(res, index) in auctionList" :key="index">
                  <swiper-item>
                    <view class="box_7">
                      <view class="text-wrapper_11">
                        <text class="text_18">第7期 倒计时</text>
                        <view class="time">
                          <view class="time__custom">
                            <text class="time__custom__item">00</text>
                          </view>
                          <text class="time__doc">:</text>
                          <view class="time__custom">
                            <text class="time__custom__item">00</text>
                          </view>
                          <text class="time__doc">:</text>
                          <view class="time__custom">
                            <text class="time__custom__item">00</text>
                          </view>
                        </view>
                      </view>
                      <view class="text-wrapper_12">
                        <text class="text_20">第49轮</text>
                        <text class="text_21">$2874300</text>
                      </view>
                      <view class="text-wrapper_13 flex-row justify-between">
                        <text class="text_22">开始时间</text>
                        <text class="text_23">2023-03-27 10:30:00</text>
                      </view>
                      <view class="count-down"> </view>
                      <view class="join-content">
                        <view class="join"> </view>
                        <view class="text-wrapper_6">
                          <text class="text_25">立即预约</text>
                        </view>
                      </view>
                    </view>
                  </swiper-item>
                </block>
              </swiper>
            </view>
          </view>
        </view> -->
      </view>
    </view>
    <DialogPay
      :hasVerification.sync="hasVerification"
      @confirmIdentify="addUser"
    ></DialogPay>
  </view>
</template>

<script>
import { checkUserApi, addUserApi, newsListApi } from "@/api/index.js";
import { setToken } from "@/utils/auth.js";
import { mapState, mapMutations, mapActions } from "vuex"; // 导入Vuex获取钱包地址
import consensusMix from "@/subpackages/consensus/consensus-mix.js";
import uSwiper from "../../uni_modules/uview-ui/components/u-swiper/u-swiper.vue";
export default {
  mixins: [consensusMix],
  components: {
    uSwiper,
  },
  data() {
    return {
      bannerList: ["/static/images/banner/two.png"],
      text: "关于取消市、区县公司预订政策公告！",
      iconList: [
        {
          name: "NT共识",
          icon: "/static/images/win_all/consensus.png",
          route: "/subpackages/consensus/consensus",
        },
        {
          name: "社区",
          icon: "/static/images/win_all/community.png",
          route: "/subpackages/community/community",
        },
        {
          name: "商业",
          icon: "/static/images/win_all/business.png",
          route: "/subpackages/articles/articles",
        },
        {
          name: "公益",
          icon: "/static/images/win_all/public_benefit.png",
        },
        {
          name: "NFT",
          icon: "/static/images/win_all/nft.png",
        },
        {
          name: "WEB3",
          icon: "/static/images/win_all/web3.png",
        },
        {
          name: "META",
          icon: "/static/images/win_all/meta.png",
        },
        {
          name: "AI",
          icon: "/static/images/win_all/ai.png",
        },
      ],
      // 资讯
      newestDynamic: {},
      invitationCode: "",
      hasVerification: false, // 弹框
      sectionSwiper: [
        {
          id: 1,
          title: "共识专区",
          imageUrl: "/static/images/section/gold.png",
          msg: "2号仓 即将开启",
        },
        {
          id: 2,
          title: "资讯专区",
          imageUrl: "/static/images/section/gold.png",
          msg: "国际旅游研讨会，相约盛宴",
        },
        // 更多数据...
      ],
      /* [{
				    name: "提现",
				    icon: "/static/images/icon/withdraw.png",
				    // route: "/subpackages/transaction/transaction?type=withdraw",
				  },
				  {
				    name: "充值",
				    icon: "/static/images/icon/recharge.png",
				    route: "/subpackages/transaction/transaction?type=recharge",
				  },
				  {
				    name: "转账",
				    icon: "/static/images/icon/transfer.png",
				  },
				  {
				    name: "社区",
				    icon: "/static/images/icon/community.png",
				    // route: "/subpackages/community/community",
				  },
				  {
				    name: "推广",
				    icon: "/static/images/icon/promotion.png",
				    // route: "/subpackages/recommend/recommend?type=promote",
				  },
				  {
				    name: "兑换",
				    icon: "/static/images/icon/conversion.png",
				    // route: "/subpackages/transaction/transaction?type=exchange",
				  },
				  {
				    name: "商业",
				    icon: "/static/images/icon/business.png",
				    route: "/subpackages/articles/articles",
				  },
				  {
				    name: "收益",
				    icon: "/static/images/icon/earnings.png",
				  }, ] */
    };
  },
  methods: {
    ...mapActions("app", ["getUser"]),
    async getStoreNews() {
      try {
        const { data } = await newsListApi();
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            this.$set(this.newestDynamic, key, data[key]);
          }
        }
        this.$set(
          this.newestDynamic.activity,
          "stateName",
          this.storeStateMap[this.newestDynamic.activity.actual_state]
        );
        /* if (activity) {
          this.newestDynamic = activity;
          this.$set(
            this.newestDynamic.storeNew,
            "stateName",
            this.storeStateMap[activity.actual_state]
          );
        } */
      } catch (error) {
        console.error("getStoreNews failed: ", error);
        // this.newestDynamic.storeNew = {};
      }
    },
    // 获取钱包地址
    async getData() {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", () => {
          this.$store.dispatch("web3/init");
        });
        await this.$store.dispatch("web3/init");
        // this.checkUser();
        this.$store
          .dispatch("web3/sign")
          .then((result) => {
						console.log(result,"result");
            this.checkUser();
          })
          .catch((error) => {
						console.log(error,"error");
          });
      }
    },
    handleMenuClick(item) {
      if (item.route) {
        uni.navigateTo({
          url: item.route,
        });
      } else if (item.storehouse_id) {
        uni.navigateTo({
          url: `/subpackages/consensus/consensusDetail?id=${item.storehouse_id}&title=${item.storehouse_name}`,
        });
      } else if (item.id) {
        uni.navigateTo({
          url: "/subpackages/articles/article?id=" + item.id,
        });
      } else {
        this.$showToast("敬请期待");
      }
    },
    checkUser() {
      let params = {
        address: this.defaultAccount,
      };
      checkUserApi(params).then((res) => {
        if (res.code === 0) {
          this.getUser();
          this.getStoreNews();
          setToken(res.data._token);
        } else if (res.code === 404) {
          if (this.invitationCode) {
            this.addUser(this.invitationCode);
          } else {
            this.hasVerification = true;
          }
        }
      });
    },
    addUser(value) {
      let params = {
        invite_code: value,
        address: this.defaultAccount,
      };
      addUserApi(params).then((res) => {
        if (res.code === 0) {
          this.$showToast(res.msg);
          this.getUser();
          this.hasVerification = false;
          setToken(res.data._token);
        } else {
          this.$showToast(res.msg);
          this.hasVerification = true;
        }
      });
    },
  },
  computed: {
    /* 钱包地址 */
    ...mapState({
      defaultAccount: (state) => state.web3.defaultAccount,
    }),
  },
  onLoad() {
    // this.checkUser();
    this.getData();
    if (window.location.search) {
      // 获取页面URL参数中的代码
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      // 在代码中查找数字
      const regex = /\d+/g;
      const numbers = code.match(regex);

      this.invitationCode = numbers[0];
      // 打印数字
      console.log(numbers[0]);
    }
  },
  onShow() {
    // this.getUser();
  },
};
</script>

<style lang="scss">
.container {
  background: url("@/static/images/common/background.png") no-repeat;
  background-size: cover;

  .section-main {
    padding: 0 0 40rpx;

    .section-banner {
      padding: 40rpx 30rpx;
    }

    .section-announcement {
      background-color: rgb(82, 81, 87);
      border-radius: 3px 3px 3px 3px;
      margin: 10rpx 30rpx 50rpx;
      padding: 10rpx 40rpx;

      //
      .image {
        position: relative;

        &::after {
          position: absolute;
          content: "";
          right: -30rpx;
          height: 100%;
          width: 1px;
          background: #02458a;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.15;
        }
      }

      .text {
        margin-left: 40rpx;
      }
    }

    .section-icon {
      .item {
        width: 25%;
        margin-bottom: 30rpx;

        .image {
        }

        .name {
          color: #fff;
          margin-top: 15rpx;
        }
      }
    }

    .section-list {
      margin-top: 5rpx;

      > .title {
        margin: 0 30rpx;
        font-size: 40rpx;
        color: #fff;
        font-family: AlibabaPuHuiTi_2_65_Medium;
        font-weight: bold;
      }

      .auction {
        height: 423rpx;
        padding: 0 20rpx;
        margin-top: 40rpx;

        .swiper {
          height: 100%;

          .swiper-item {
            position: relative;

            .content {
              width: 340rpx;
              height: 290rpx;
              // background: linear-gradient(270deg, #D7AE73 0%, #DBC395 100%);
              background: url("@/static/images/section/coverage.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              // margin-top: 40rpx;
              padding: 70rpx 20rpx 0 20rpx;
              box-sizing: border-box;

              .title {
                position: absolute;
                font-weight: bold;
                top: 6rpx;
                left: 15rpx;
                color: #1a181e;
              }

              .msg {
                margin-top: 10rpx;
                color: #000;
                font-size: 32rpx;
                overflow: hidden;
                /* 隐藏多余文本 */
                white-space: nowrap;
                font-family: AlibabaPuHuiTi_2_55_Regular;
                /* 在一行中显示 */
                text-overflow: ellipsis;
                /* 超过一行显示省略号 */
              }
            }
          }
        }
      }

      /* .box_100 {
        margin: 60rpx 0 0 40rpx;

        .section_8 {
          width: 100%;
          height: auto;

          .auction {
            height: 423rpx;
            margin-top: 40rpx;

            .swiper {
              height: 100%;

              .box_7 {
                width: 528rpx;
                height: 422rpx;
                // background: linear-gradient(270deg, #D7AE73 0%, #DBC395 100%);
                background: url("@/static/images/section/coverage.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                // margin-top: 40rpx;
                padding: 20rpx 20rpx 0 20rpx;
                box-sizing: border-box;

                .text-wrapper_11 {
                  // width: 282rpx;
                  // height: 28rpx;
                  // margin: 16rpx 0 0 24rpx;
                  display: flex;
                  align-items: center;

                  // justify-content: space-between;
                  .time {
                    display: flex;
                    align-items: center;
                    color: rgba(255, 255, 255, 1);
                    font-size: 24rpx;
                    font-family: AlibabaPuHuiTi_2_55_Regular;
                    margin-left: 20rpx;
                  }

                  .text_18 {
                    // width: 156rpx;
                    // height: 28rpx;
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 24rpx;
                    font-family: AlibabaPuHuiTi_2_55_Regular;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 28rpx;
                  }

                  .text_19 {
                    // width: 102rpx;
                    // height: 28rpx;
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 24rpx;
                    font-family: AlibabaPuHuiTi_2_55_Regular;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 28rpx;
                    margin-left: 20rpx;
                  }
                }

                .text-wrapper_12 {
                  // width: 394rpx;
                  // height: 28rpx;
                  // margin: 56rpx 0 0 24rpx;
                  margin: 60rpx 0 0 0;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;

                  .text_20 {
                    // width: 96rpx;
                    // height: 28rpx;
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 34rpx;
                    font-family: AlibabaPuHuiTi_2_65_Medium;
                    text-align: left;
                    white-space: nowrap;
                    // line-height: 28rpx;
                  }

                  .text_21 {
                    // width: 124rpx;
                    // height: 28rpx;
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 34rpx;
                    font-family: AlibabaPuHuiTi_2_75_SemiBold;
                    text-align: left;
                    white-space: nowrap;
                    // line-height: 28rpx;
                  }
                }

                .text-wrapper_13 {
                  // width: 392rpx;
                  // height: 28rpx;
                  margin: 20rpx 0 0 0;

                  .text_22 {
                    width: 80rpx;
                    height: 28rpx;
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 28rpx;
                    font-family: AlibabaPuHuiTi_2_55_Regular;
                    text-align: left;
                    white-space: nowrap;
                    // line-height: 28rpx;
                  }

                  .text_23 {
                    // width: 194rpx;
                    // height: 28rpx;
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 26rpx;
                    font-family: AlibabaPuHuiTi_2_55_Regular;
                    text-align: right;
                    white-space: nowrap;
                    // line-height: 28rpx;
                  }
                }

                .box_22 {
                  // width: 392rpx;
                  // height: 28rpx;
                  margin: 40rpx 0 0 0;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;

                  .block_5 {
                    background-color: rgba(255, 255, 255, 1);
                    border-radius: 3px;
                    // height: 12rpx;
                    // margin-top: 20rpx;
                    width: 320rpx;

                    .box_9 {
                      width: 100%;
                      height: 12rpx;
                      // background: url('~@/static/images/home/SketchPng51a498626c92ab39ae837f3297724788f758c70ccf5ab792d570cde846d5d348.png') 0rpx 0rpx no-repeat;
                      background-size: 100% 100%;
                    }
                  }

                  .text_24 {
                    // width: 92rpx;
                    // height: 28rpx;
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 24rpx;
                    font-family: AlibabaPuHuiTi_2_55_Regular;
                    text-align: left;
                    white-space: nowrap;
                    // line-height: 28rpx;
                  }
                }

                .join-content {
                  margin-top: 30rpx;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;

                  .join {
                    width: 20rpx;
                    color: rgba(255, 255, 255, 1);
                    font-size: 28rpx;
                    font-family: AlibabaPuHuiTi_2_65_Medium;
                  }

                  .text-wrapper_6 {
                    // background: url('~@/static/images/home/SketchPng7225745e2ea7cbe279e664c3273f0d406c1611a363ad8946aa1ba14e4398b183.png') 100% no-repeat;
                    background: #fff;
                    min-width: 168rpx;
                    height: 56rpx;
                    margin: 36rpx 0;
                    // float: right;
                    padding: 0 10rpx;

                    .text_25 {
                      width: 100%;
                      height: 56rpx;
                      overflow-wrap: break-word;
                      color: #000;
                      font-size: 28rpx;
                      font-family: AlibabaPuHuiTi_2_65_Medium;
                      text-align: center;
                      white-space: nowrap;
                      line-height: 56rpx;
                      display: inline-block;
                      // margin: 8rpx 0 0 28rpx;
                    }
                  }
                }
              }
            }
          }
        }
      } */
    }
  }
}
</style>
