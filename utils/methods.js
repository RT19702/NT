
/**
 * @description: Toast
 * @param {String} title
 * @param {String} icon
 * @param {Number} duration
 * @param {Boolean} mask
 * @return: void
 * @example: this.$showToast('加载中', 'none', 2000, true)
 */
function showToast(title, icon = 'none', duration = 2000, mask = true) {
    uni.showToast({
        title,
        icon,
        duration,
        mask
    });
}

/**
 * @description: Loading
 * @param {String} title
 * @param {Boolean} mask
 * @return: void
 * @example: this.$showLoading('加载中', true)
 */
function showLoading(title = '加载中', mask = true) {
    uni.showLoading({
        title,
        mask
    })
}

/**
 * @description: Hide Loading
 * @return: void
 * @example: this.$hideLoading()
*/
function hideLoading() {
    uni.hideLoading()
}

export {
    showToast,
    showLoading,
    hideLoading
}