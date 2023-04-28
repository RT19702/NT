
// 引入env.js
import env from '@/utils/env'
import { getToken } from './auth'

// 判断当前环境
const baseUrl = process.env.NODE_ENV === 'development'
    // 如果是开发环境，则使用env.js中的开发环境地址
    ? env.devBaseUrl
    // 如果是生产环境，则使用env.js中的生产环境地址
    : env.prodBaseUrl

/**
 * @description 封装uni.request
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {String} method 请求方式
 * @return {Promise}
 */
function request({ url, data = {}, method = "GET" }) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + url,
            data: data,
            method: method,
            header: {
                'Content-Type': 'application/json; charset=UTF-8',
                'TOKEN': getToken()
            },
            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                uni.hideLoading()
            }
        })
    })
}

export default request