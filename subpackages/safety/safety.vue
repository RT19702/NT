<template>
	<view class="wrapper">
		<NavBar title="安全中心"></NavBar>
		<view class="container">
			<view class="section-safety">
				<view class="item d-flex align-items-center justify-between" v-for="(item, index) in formItems"
					:key="index">
					<view class="label">{{ item.label }}</view>
					<view class="control">
						<u--input :placeholder="item.placeholder" border="surround" inputAlign="right" color="#fff"
							placeholderClass="placeholder-color" :value="item.value"></u--input>
					</view>
				</view>
			</view>
			<view class="button">
				<u-button text="提交" size="large" color="linear-gradient(180deg, #D7AE73 0%, #DBC395 100%)">
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formItems: [{
						label: '原密码',
						placeholder: '请输入原密码',
						value: ''
					},
					{
						label: '设置新密码',
						placeholder: '请输入新密码',
						value: ''
					},
					{
						label: '确认密码',
						placeholder: '请输入确认密码',
						value: ''
					}
				]
			}
		},
		methods: {

		}
	}
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
				color: #CDCDCD;
			}
		}


	}

	.button {
		margin-top: auto;
		margin-bottom: 20rpx;
	}
</style>
