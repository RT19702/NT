<template>
  <view>
    <NavBar title="商业"></NavBar>
    <view class="seciton-list">
      <u-list @scrolltolower="scrolltolower">
        <view
          class="item d-flex align-items-center"
          v-for="(item, index) in detailList"
          :key="index"
          @click="handlerClick(item)"
        >
          <view>
            <u--image
              :showLoading="true"
              src="/static/images/section/gold.png"
              width="200rpx"
              height="160rpx"
            ></u--image>
          </view>
          <view class="content">
            <view class="title">{{ item.title }}</view>
            <view class="msg"> {{ item.content | filterHtml }} </view>
            <view class="date">{{ item.addtime | filterTime }}</view>
          </view>
        </view>
      </u-list>
    </view>
  </view>
</template>

<script>
import { articleListApi } from "@/api/index.js";
export default {
  data() {
    return {
      page: 1,
      detailList: [],
    };
  },
  methods: {
    scrolltolower() {
      this.getArticleList();
    },
    async getArticleList() {
      const params = {
        page: this.page,
        type: 0,
      };
      await articleListApi(params).then((res) => {
        if (res.data.list_data && res.data.list_data.length) {
          this.page++;
          this.detailList.push(...res.data.list_data);
        }
      });
    },
    handlerClick(item) {
      uni.navigateTo({
        url: "/subpackages/articles/article?id=" + item.id,
      });
    },
  },
  onLoad() {
    this.getArticleList();
  },
};
</script>

<style lang="scss">
.seciton-list {
  padding: 50rpx 30rpx;

  .item {
    padding: 30rpx 20rpx;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 2px 2px 2px 2px;

    .content {
      margin-left: 30rpx;
      max-width: 60%;

      .title {
        color: #ffffff;
        font-family: AlibabaPuHuiTi_2_65_Medium;
        margin-bottom: 6rpx;
      }

      .msg {
        margin-bottom: 16rpx;
        color: #a3a2a6;
        font-size: 25rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .date {
        color: #a3a2a6;
        font-size: 25rpx;
      }
    }
  }
}
</style>
