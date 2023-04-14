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
export function usdtFlowApi(data) {
    return request({
        url: userUrl + '/USDT_flowWater',
        method: 'POST',
        data,
    })
}