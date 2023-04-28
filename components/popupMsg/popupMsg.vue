<template>
	<view>
		<u-popup :show="showPupMsg" mode="bottom" bgColor="#474A4F" @close="closePupMsg" :closeable="true">
			<view class="content">
				<view class="title">
					<slot name="title">确认订单</slot>
				</view>
				<view class="input-box">
					<view class="item d-flex align-items-center justify-between">
						<view>USDT</view>
						<view>
							<u--input placeholder="请输入1-" +${maxPrice}+"的正整数区间" border="surround" inputAlign="right"
								v-model.sync="item.value" color="#fff" type="number" @input="changVal"></u--input>
						</view>
					</view>
					<view class="tips d-flex align-items-center justify-between">
						<view>需消耗NTGAS：{{ (item.value * 0.05).toFixed(2) || '-'}}</view>
						<view>NTGAS余额：{{user.ntgas}}</view>
					</view>
				</view>
				<view class="button">
					<u-button text="提交" color="linear-gradient(270deg, #D7AE73 0%, #DBC395 100%)" size="large"
						@click="submitMsg">
					</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		props: {
			showPupMsg: {
				type: Boolean,
				default: false
			},
			pupItemList: {
				type: Array,
				default: () => []
			},
			maxPrice: {
				type: Number,
				default: 1
			}
		},
		name: "popupMsg",
		data() {
			return {

			};
		},
		methods: {
			closePupMsg() {
				this.$emit('update:showPupMsg', false)
			},
			submitMsg() {
				this.$emit('submitMsg', this.pupItemList)
			},
			changVal(newValue) {
				// 获取 pupItemList 数组
				const itemList = this.pupItemList;
				// 修改第一项的 value 值
				if (newValue > this.maxPrice) {
					this.$nextTick(() => {
						itemList[0].value = this.maxPrice;
					})
				}
			}
		},
		computed: {
			...mapState("app", ["user"]),
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 40rpx;
		color: #fff;

		.title {
			margin-bottom: 50rpx;
			font-size: 36rpx;
		}

		.input-box {
			margin-bottom: 60rpx;

			.item {
				background: #181818;
				padding: 20rpx 15rpx 20rpx 30rpx;
			}

			.tips {
				margin: 20rpx 0;
				color: #b2b3b5;
				font-size: 25rpx;
			}
		}

	}
</style>
