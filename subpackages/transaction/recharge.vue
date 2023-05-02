<template>
	<view>
		<view class="item d-flex align-items-center justify-between">
			<view class="label">充值类型</view>
			<view class="radio d-flex align-items-center">
				<view class="circle"></view>
				<text>USDT</text>
			</view>
		</view>
		<!-- <view class="item d-flex align-items-center justify-between" @click="show = true"> -->
		<view class="item d-flex align-items-center justify-between">
			<view class="label">充值数量</view>
			<view class="control">
				<u--input placeholder="请输入充值数量" border="surround" inputAlign="right" color="#fff"
					disabledColor="transparent" placeholderClass="placeholder-color" :value="amount"
					@input="changAmount" type="number"></u--input>
			</view>
		</view>
		<!-- <u-picker :show="show" :columns="rechargeCol" keyName="amount" @cancel="show = false" @confirm="confirmVal">
		</u-picker> -->
	</view>
</template>

<script>
	export default {
		props: ["amount"],
		data() {
			return {};
		},
		methods: {
			changAmount(value) {
				this.$emit("update:amount", value);
			},
		},
	};
	/* import {
		rechargeOptionApi
	} from "@/api/index.js";
	export default {
		props: {
			rechargeOption: {
				type: Object,
			},
		},
		data() {
			return {
				show: false,
				rechargeCol: [],
				rechargeVal: "",
			};
		},
		methods: {
			getRechargeOption() {
				rechargeOptionApi().then((res) => {
					if (res.code === 0) {
						this.rechargeCol = [res.data];
					}
				});
			},
			confirmVal(item) {
				let {
					value
				} = item;
				let amount = value[0].amount;
				this.rechargeVal = amount;
				this.show = false;
				this.$emit("update:rechargeOption", value[0]);
			},
		},
		mounted() {
			this.getRechargeOption();
		},
	}; */
</script>

<style lang="scss">
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

		.radio {
			padding: 14rpx 20rpx;
			color: $theme-color;

			.circle {
				width: 15px;
				height: 15px;
				margin-right: 10rpx;
				border: 1px solid $theme-color;
				border-radius: 50%;
				position: relative;

				&::after {
					position: absolute;
					content: "";
					left: 50%;
					top: 50%;
					background-color: $theme-color;
					transform: translate(-50%, -50%);
					width: 50%;
					height: 50%;
					border-radius: 50%;
				}
			}
		}
	}

	.content {
		background-color: rgba(255, 255, 255, 0.1);
		padding: 30rpx 25rpx;
		margin-bottom: 30rpx;

		.text {
			margin-bottom: 30upx;

			.label {
				color: #fff;
			}

			.tips {
				color: $theme-color;
				margin-left: 30rpx;
				font-size: 26rpx;
			}
		}
	}
</style>
