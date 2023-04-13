<template>
  <view class="wrapper">
    <NavBar title="安全中心"></NavBar>
    <view class="container">
      <view class="section-safety">
        <view
          class="item d-flex align-items-center justify-between"
          v-for="(item, index) in formItems"
          :key="index"
        >
          <view class="label">{{ item.label }}</view>
          <view class="control">
            <u--input
              :placeholder="item.placeholder"
              border="surround"
              inputAlign="right"
              color="#fff"
              placeholderClass="placeholder-color"
              maxlength="6"
              type="password"
              v-model="item.value"
            ></u--input>
          </view>
        </view>
      </view>
      <view class="button">
        <u-button
          text="提交"
          size="large"
          color="linear-gradient(180deg, #D7AE73 0%, #DBC395 100%)"
          @click="changePayPwd"
        >
        </u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { changePayPwdApi } from "@/api/index.js";
export default {
  data() {
    return {
      formItems: [
        // {
        //   label: "原密码",
        //   placeholder: "请输入原密码",
        //   value: "",
        // },
        {
          label: "设置新密码",
          placeholder: "请输入新密码",
          value: "",
        },
        {
          label: "确认密码",
          placeholder: "请输入确认密码",
          value: "",
        },
      ],
    };
  },
  methods: {
    // 修改支付密码
    changePayPwd() {
      for (let element of this.formItems) {
        if (element.value.length < 6) {
          this.$showToast("密码长度不足6位");
          return; // 表单项长度不足6位，立即退出函数
        }
      }
      // 判断两次输入的密码是否一致
      if (this.formItems[0].value !== this.formItems[1].value) {
        this.$showToast("两次输入的密码不一致");
        return;
      }
      let params = {
        pay_pass: this.formItems[0].value,
        confirm_pay_pass: this.formItems[1].value,
      };
      changePayPwdApi(params).then((res) => {
        this.$showToast(res.msg);
      });
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  height: 100%;
}

.container {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  height: 90%;
}

.section-safety {
  flex: 1;

  .item {
    padding: 20rpx 25rpx;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    margin-bottom: 30rpx;

    .label {
      color: #fff;
    }

    .placeholder-color {
      color: #cdcdcd;
    }
  }
}

.button {
  margin-top: auto;
  margin-bottom: 20rpx;
}
</style>
