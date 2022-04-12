/**
 * getList
 * 商品一覧を返却する処理
 *
 * @returns レスポンス JSON
 */
getListItem = function () {
  return "全商品一覧を返します。";
};

/**
 * getItem
 * 商品情報を１件返却する処理
 *
 * @returns レスポンス JSON
 */
getItem = function (id) {
  return id + "の商品情報です。";
};

exports.getListItem = getListItem;
exports.getItem = getItem;
