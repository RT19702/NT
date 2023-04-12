<template>
	<view class="dialog-content" v-if="hasQrCode">
		<view class="dialog-bg-box">
			<view class="title">客服二维码</view>
			<view class="code-qr">
				<u--image :showLoading="true" :src="src" width="380rpx" height="380rpx"></u--image>
			</view>
			<view class="button">
				<u-button text="好的" color="linear-gradient(294deg, #D7AE73 0%, #DBC395 100%)" shape="circle"
					@click="closeQr"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			hasQrCode: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/album/1.jpg'
			}
		},
		methods: {
			closeQr() {
				this.$emit("update:hasQrCode", false);
			}
		}
	}
</script>

<style lang="scss">
	.dialog-content {
		position: fixed;
		z-index: 1001;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);

		.dialog-bg-box {
			position: absolute;
			top: 50%;
			left: 50%;
			background-color: #464a4f;
			padding: 40rpx;
			transform: translate(-50%, -50%);
			width: 70vw;
			color: #fff;
			text-align: center;

			.title {
				font-size: 38rpx;
				font-family: AlibabaPuHuiTi_2_55_Regular;
			}

			.code-qr {
				margin: 50rpx auto;
				width: 380rpx;
				height: 380rpx;
				background: #696A6C;
			}

			.button {
				width: 200rpx;
				margin: 0 auto;
			}
		}
	}
</style>
