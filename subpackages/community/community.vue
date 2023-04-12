<template>
	<view>
		<NavBar title="社区"></NavBar>
		<view class="section-list">
			<view class="item title d-flex align-items-center justify-between">
				<text>级别</text>
				<text>认购费用</text>
				<text>动态分红比例</text>
				<text>释放权限</text>
			</view>
			<view class="item d-flex align-items-center justify-between">
				<text>1</text>
				<text>不可认购</text>
				<text>1%</text>
				<text>0%</text>
			</view>
			<view class="item d-flex align-items-center justify-between">
				<text>2</text>
				<text>500</text>
				<text>2%</text>
				<text>0%</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.section-list {
		margin: 50rpx 30rpx;
		padding: 40rpx;
		background: rgba(255, 255, 255, 0.1);

		.item {
			text-align: center;
			// margin-bottom: 40rpx;
			color: #fff;
			padding: 30rpx 0;
			&>* {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			&> :nth-child(1) {
				width: 20%;
			}

			&> :nth-child(2) {
				width: 20%;
			}

			&> :nth-child(3) {
				width: 40%;
			}

			&> :last-child {
				width: 20%;
				// text-align: right;
			}

			&:last-child {
				margin: 0;
			}
		}

		.title {
			color: #8f8e94;
		}
	}
</style>
