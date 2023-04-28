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
}