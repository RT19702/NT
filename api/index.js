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