import request from "@/utils/request";

/* 登录接口 */
const loginUrl = '/dapp/index';
/* 用户信息接口 */
const indexUrl = '/dapp/api';
/* 活动接口 */
const activityUrl = '/dapp/Activity'
/* 用户接口 */
const userUrl = '/dapp/User';
/* 切换语言 */
const languageUrl = '/dapp/Languge';

/* 入口 */
export function checkUserApi(data) {
	return request({
		url: loginUrl + '/checkUser',
		method: 'POST',
		data,
	})
}

/* 新增用户 */
export function addUserApi(data) {
	return request({
		url: loginUrl + '/userInc',
		method: 'POST',
		data,
	})
}

/* 邀请链接 */
export function inviteApi() {
	return request({
		url: indexUrl + '/getInvitedCode',
		method: 'POST'
	})
}

/* 团队列表 */
export function teamListApi(data) {
	return request({
		url: indexUrl + '/getTeam',
		method: 'POST',
		data,
	})
}

/* 修改支付密码 */
export function changePayPwdApi(data) {
	return request({
		url: userUrl + '/up_PaymentPassword',
		method: 'POST',
		data,
	})
}

/* 获取用户信息 */
export function getUserInfoApi() {
	return request({
		url: indexUrl + '/getUserInfo',
		method: 'POST'
	})
}

/* 充值选项 */
export function rechargeOptionApi() {
	return request({
		url: userUrl + '/RechargeOptions',
	})
}

/* 充值 */
export function rechargeApi(data) {
	return request({
		url: userUrl + '/recharge',
		method: 'POST',
		data,
	})
}

/* 充值回调 */
export function rechargeCallbackApi(data) {
	return request({
		url: userUrl + '/RechargeCallback',
		method: 'POST',
		data,
	})
}

/* USDT流水 */
/* export function usdtFlowApi(data) {
    return request({
        url: userUrl + '/USDT_flowWater',
        method: 'POST',
        data,
    })
} */

/* 货币  明细流水 */
export function currencyListApi(data) {
	return request({
		url: userUrl + '/CurrencyDetails',
		method: 'POST',
		data,
	})
}

/* 活动列表 */
export function activityListApi() {
	return request({
		url: activityUrl + '/ActivityList',
		method: 'POST'
	})
}


/* 仓  下 全部活动 */
export function storeActivityApi(data) {
	return request({
		url: activityUrl + '/storehouseActivity',
		method: 'POST',
		data,
	})
}

/* 购买等级列表 */
export function buyLevelListApi() {
	return request({
		url: userUrl + '/buy_levelList',
		method: 'POST'
	})
}

/* 购买等级 */
export function buyLevelApi(data) {
	return request({
		url: userUrl + '/submit_buyLevel',
		method: 'POST',
		data
	})
}

/* 参加活动 */
export function crowdFundApi(data) {
	return request({
		url: activityUrl + '/crowdfund_partake_new',
		method: 'POST',
		data
	})
}

/* 兑换货币 */
export function exchangeCurrencyApi(data) {
	return request({
		url: userUrl + '/exchange_type',
		method: 'POST',
		data
	})
}

/* 首页  最新动态 */
export function newsListApi() {
	return request({
		url: activityUrl + '/GetNewestDynamic',
		method: 'POST'
	})
}

/* 配置U  购买释放权限 */
export function buyReleaseApi(data) {
	return request({
		url: userUrl + '/buy_ReleasePermissions',
		method: 'POST',
		data
	})
}

/* 参与记录 */
export function rushBuyListApi(data) {
	return request({
		url: userUrl + '/rush_buy_list',
		method: 'POST',
		data
	})
}

/* 文章列表 */
export function articleListApi(data) {
	return request({
		url: indexUrl + '/businessArticle_list',
		method: 'POST',
		data
	})
}

/* 文章详情 */
export function articleDetailApi(data) {
	return request({
		url: indexUrl + '/Article_details',
		method: 'POST',
		data
	})
}

/* 提现 */
export function withdrawApi(data) {
	return request({
		url: indexUrl + '/withdrawal',
		method: 'POST',
		data
	})
}

/* 充值——新 */
export function rechargeNewApi(data) {
	return request({
		url: userUrl + '/withdrawal',
		method: 'POST',
		data
	})
}
