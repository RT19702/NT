<script>
	export default {
		onLaunch: function() {},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/static/css/font.css";
	@import "static/css/theme.css";

	page {
		background: url('@/static/images/common/background.png') no-repeat;
		background-size: cover;
		height: 100%;
	}

	uni-swiper .uni-swiper-dot {
		width: 30rpx;
		height: 8rpx;
		border-radius: unset;
	}
</style>
