<template>
	<view>
		<NavBar title="商业"></NavBar>
		<view class="seciton-list">
			<view class="item d-flex align-items-center" v-for="(item,index) in detailList" :key="index"
				@click="handlerClick">
				<view>
					<u--image :showLoading="true" src="https://cdn.uviewui.com/uview/album/1.jpg" width="200rpx"
						height="160rpx"></u--image>
				</view>
				<view class="content">
					<view class="title">{{item.title}}</view>
					<view class="msg">{{item.msg}}</view>
					<view class="date">{{item.date}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailList: [{
					img: '',
					title: '众赢金融',
					msg: '众赢金融众赢金融众赢金融众赢金融众...',
					date: '2022.12.12  18：20'
				}]
			}
		},
		methods: {
			handlerClick() {
				console.log('click')
				uni.navigateTo({
					url: '/subpackages/articles/article'
				})
			}
		}
	}
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
					color: #FFFFFF;
					font-family: AlibabaPuHuiTi_2_65_Medium;
					margin-bottom: 6rpx;
				}

				.msg {
					margin-bottom: 16rpx;
					color: #a3a2a6;
					font-size: 25rpx;
				}

				.date {
					color: #a3a2a6;
					font-size: 25rpx;
				}
			}

		}
	}
</style>
