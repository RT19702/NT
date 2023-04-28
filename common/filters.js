export default {
  // 过滤html标签
  filterHtml: function (text) {
    return text.replace(/<[^>]+>/g, "");
  },
  // 过滤表情
  filterEmoji: function (text) {
    return text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
  },
  // 过滤空格
  filterContent: function (text, content) {
    return text.replace(new RegExp(content, "g"), "");
  },
  // 过滤时间戳
  filterTime: function (timestamp) {
    // 将时间戳转换为 JavaScript Date 对象
    const date = new Date(timestamp * 1000);
    // 获取年、月、日、小时、分钟和秒
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    // 拼接成指定格式的字符串
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
}