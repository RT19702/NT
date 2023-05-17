<template>
	<view>
		<NavBar :title="pageMsg.title"></NavBar>
		<u-popup :show="showPupMsg" mode="bottom" bgColor="#474A4F" @close="closePupMsg" :closeable="true">
			<view class="pup-content">
				<view class="title">
					<slot name="title">确认订单</slot>
				</view>
				<view class="input-box">
					<view class="item d-flex align-items-center justify-between">
						<view>USDT</view>
						<view>
							<u--input :placeholder="`请输入1-${parseInt(
                  pupMsg.max_price
                )}的正整数区间`" border="surround" inputAlign="right" v-model="amoutValue" color="#fff" type="number">
							</u--input>
							<!-- @input="changVal" -->
						</view>
					</view>
					<view class="tips d-flex align-items-center justify-between">
						<view>需消耗NTGAS：{{ (amoutValue * 0.05).toFixed(2) || "-" }}</view>
						<view>NTGAS余额：{{ user.ntgas }}</view>
					</view>
				</view>
				<view class="button">
					<u-button text="提交" color="linear-gradient(270deg, #D7AE73 0%, #DBC395 100%)" size="large"
						@click="participate">
					</u-button>
				</view>
			</view>
		</u-popup>
		<view class="section-main">
			<view class="upcoming">
				<view class="d-flex justify-between title">
					<view class="">{{ pageMsg.title }} 第{{ firstOrder.round }}期</view>
					<view class="">共识金额1~{{ parseInt(firstOrder.max_price || "∞") }} USDT</view>
				</view>
				<view>
					<view class="d-flex align-items-center progress-bar" v-if="
              this.openProgre.openProgressWidth && firstOrder.actual_state === 1
            ">
						<view class="progress">
							<view class="bar" :style="{ width: this.openProgre.openProgressWidth + '%' }"></view>
						</view>
						<view class="text">
							已筹{{ parseInt(this.openProgre.openProgressWidth) }}%
						</view>
					</view>
					<view class="count-down" v-if="openDownTimer.length > 0">
						还剩{{ openDownTimer[1] }}时{{ openDownTimer[2] }}分{{
              openDownTimer[3]
            }}秒</view>
				</view>
				<view class="d-flex justify-end">
					<view class="button text-center" v-if="firstOrder.actual_state === 1" @click="delivery(firstOrder)">
						{{ firstOrder.actual_name }}
					</view>
					<view class="button text-center" v-else>{{ firstOrder.actual_name }}
					</view>
				</view>
			</view>
			<view class="tips text-center"> *如果重生，可参与分配1%的奖励 </view>
			<u-list height="1000rpx">
				<view class="section-list" v-if="storehouseActivityList && storehouseActivityList.length > 1">
					<view class="item" v-for="(item, index) in storehouseActivityList" v-if="index !== 0" :key="index">
						<view class="d-flex justify-between align-items-center">
							<view class="d-flex title">
								<view class="">{{ pageMsg.title }}{{ item.storehouse_name }}</view>
								<view class="round">第{{ item.round }}期</view>
							</view>

							<view class="button" v-if="item.actual_state === 1" @click="delivery(item)">
								{{ item.actual_name }}
							</view>
							<view class="button" v-else>
								{{ item.actual_name }}
							</view>
						</view>
					</view>
				</view>
			</u-list>
		</view>
	</view>
</template>

<script>
	import {
		storeActivityApi,
		crowdFundApi
	} from "@/api/index.js";
	import {
		mapState
	} from "vuex";
	import consensusMix from "./consensus-mix.js";
	export default {
		mixins: [consensusMix],
		data() {
			return {
				pageMsg: {
					title: "NT共识",
					id: "",
				},
				storehouseActivityList: [],
				showPupMsg: false,
				// 当前选中信息
				pupMsg: {},
				amoutValue: null,
				// 开仓倒计时
				openDown: null,
				// 开仓剩余时间
				openDownTimer: [],
				// 进度条
				openProgre: {
					// 开仓计时
					openProgress: null,
					// 开仓进度条
					openProgressWidth: 0,
				},
			};
		},
		methods: {
			// 获取仓库活动
			async getStoreActivity(id) {
				let storehouse_id = id;
				let params = {
					storehouse_id,
				};
				let {
					data
				} = await storeActivityApi(params);
				if (data && data.length) {
					this.storehouseActivityList = data.map((item) => {
						return {
							...item,
							actual_name: this.storeStateMap[item.actual_state],
						};
					});
					// 是否显示进度条
					if (this.storehouseActivityList[0].is_show_bar === 1) {
						// 未开启进度条
						if (!this.openDown) {
							this.openCountDown(this.storehouseActivityList[0].start_time);
						} else {
							this.realProgress(this.storehouseActivityList[0]);
						}
					} else {
						this.realProgress(this.storehouseActivityList[0]);
					}
				}
			},
			// 参加活动
			participate(item) {
				const params = {
					rush_id: this.pupMsg.id,
					amount: this.amoutValue,
				};
				crowdFundApi(params)
					.then((res) => {
						this.$showToast(res.msg);
						this.getStoreActivity(this.pageMsg.id);
					})
					.finally(() => {
						this.amoutValue = null;
						this.showPupMsg = false;
					});
			},
			// 弹窗
			delivery(item) {
				this.pupMsg = item;
				this.showPupMsg = true;
			},
			// 输入框计算
			changVal(newValue) {
				const maxPrice = parseInt(this.pupMsg.max_price);
				if (newValue > maxPrice) {
					this.$nextTick(() => {
						this.amoutValue = maxPrice;
					});
				}
			},
			// 关闭弹窗
			closePupMsg() {
				this.showPupMsg = false;
				this.amoutValue = null;
			},
			// 十分钟倒计时
			openTenMin(time) {
				// 活动开始时间（时间戳，单位为秒）
				const startTime = new Date(time).getTime() / 1000;
				// 活动结束时间（时间戳，单位为秒）
				const endTime = startTime + 300; // 5 分钟
				this.openProgre.openProgress = setInterval(() => {
					// 当前时间
					const currentTime = new Date().getTime() / 1000;
					// 活动持续时间
					const totalTime = endTime - startTime;
					// 活动已持续时间
					const elapsedTime = Math.max(currentTime - startTime, 0);
					// 活动已持续时间占总时长的百分比
					const percentage = Math.min((elapsedTime / totalTime) * 100, 100);
					if (endTime - currentTime > 0) {
						this.openProgre.openProgressWidth = percentage;
						this.storehouseActivityList[0].actual_state = 1;
						this.storehouseActivityList[0].actual_name = this.storeStateMap[1];
					} else {
						clearInterval(this.openProgre.openProgress);
					}
				}, 1000);
			},
			// 获取开仓时间倒计时
			openCountDown(endTime) {
				this.openDown = setInterval(() => {
					//获取当前时间戳并换算为秒做单位
					const current = Date.parse(new Date()) / 1000;
					//时间戳相差多少秒
					let diff = new Date(endTime).getTime() / 1000 - current;
					if (diff > 0) {
						let d = Math.floor(diff / (3600 * 24)); //获取天数
						let h = Math.floor((diff % (3600 * 24)) / (60 * 60)); //获取时
						let m = Math.floor(((diff % (3600 * 24)) % (60 * 60)) / 60); //获取分
						let s = Math.floor(diff % 60); //获取秒
						d = d < 10 ? "0" + d : d;
						h = h < 10 ? "0" + h : h;
						m = m < 10 ? "0" + m : m;
						s = s < 10 ? "0" + s : s;
						let _diffData = [d, h, m, s];
						this.openDownTimer = _diffData;
					} else {
						let _diffData = [];
						// this.getStoreActivity(this.pageMsg.id);
						this.openTenMin(this.storehouseActivityList[0].start_time);
						clearInterval(this.openDown);
						// this.openDown = null;
						this.openDownTimer = _diffData;
					}
				}, 1000);
			},
			// 真实进度条
			realProgress(item) {
				let realProgressValue = (item.ygm_total_money / item.total_quota) * 100 > 100 ? 100 : (item
					.ygm_total_money / item.total_quota) * 100;
				uni.getStorage({
					key: "openProgressWidth",
					success: (res) => {
						const {
							data
						} = res;
						if (
							this.pageMsg.id === data?.id &&
							data.openProgressWidth > this.openProgre.openProgressWidth
						) {
							this.openProgre.openProgressWidth = data.openProgressWidth;
						}
					},
				});
				// 如果虚假进度条小于真实进度条
				if (this.openProgre.openProgressWidth < realProgressValue) {
					this.openProgre.openProgressWidth = realProgressValue;
					// 暂停假进度条
					clearInterval(this.openProgre.openProgress);
				} else {
					uni.setStorage({
						key: "openProgressWidth",
						data: {
							id: this.pageMsg.id,
							openProgressWidth: this.openProgre.openProgressWidth,
						},
					});
				}
			},
		},
		computed: {
			...mapState("app", ["user"]),
			firstOrder() {
				return this.storehouseActivityList[0] || {};
			},
		},
		beforeDestroy() {
			clearInterval(this.openProgre.openProgress);
		},
		onLoad(options) {
			this.pageMsg.title = options.title || "NT共识";
			this.pageMsg.id = options.id || "";
		},
		onShow() {
			this.getStoreActivity(this.pageMsg.id);
		},
		onHide() {
			clearInterval(this.openDown);
			this.openDown = null;
		},
		onPullDownRefresh() {
			this.getStoreActivity(this.pageMsg.id);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
	};
</script>

<style lang="scss">
	.section-main {
		margin: 40rpx;

		.upcoming {
			padding: 40rpx;
			background: linear-gradient(270deg, #d7ae73 0%, #dbc395 100%);
			border-radius: 10px 0 10px 0;

			.title {
				color: #fff;
			}

			.button {
				margin-top: 40rpx;
				padding: 15rpx 20rpx;
				background-color: #fff;
				min-width: 140rpx;
				color: #d831e3;
				font-weight: bold;
			}

			.progress-bar {
				color: #fff;
				margin-top: 30rpx;

				.progress {
					background-color: #fff;
					height: 20rpx;
					flex: 1;
					position: relative;

					.bar {
						position: absolute;
						height: 100%;
						// background: linear-gradient(270deg, #676060 0%, #454246 100%);
						background: linear-gradient(270deg, #23c50f, #8cd587);
					}
				}

				.text {
					margin-left: 10rpx;
				}
			}
		}

		.tips {
			color: #a5a5a8;
			margin: 30rpx 0;
		}

		.section-list {
			padding: 40rpx;
			background-color: rgba(255, 255, 255, 0.1);

			.item {
				background: #040410;
				padding: 30rpx;
				margin-bottom: 30rpx;

				.title {
					color: #fff;

					.round {
						margin-left: 20rpx;
					}
				}

				.button {
					background-color: #fff;
					color: #cb8110;
					padding: 10rpx 20rpx;
				}

				&:last-child {
					margin: 0;
				}
			}
		}
	}

	.pup-content {
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

	.count-down {
		color: #fff;
		color: #d831e3;
		font-size: 40rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}
</style>
