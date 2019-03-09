module.exports = {
  copyJson(json) {
    return JSON.parse(JSON.stringify(json));
  },
  treeMenu(arr = []) {
    if (!arr.length || arr.length === 0) return;
    // 删除 所有 nodes,以防止多次调用
    arr.forEach(function (item) {
      delete item.nodes;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    let map = {};
    arr.forEach(function (item) {
      map[item.id] = item;
    });

    let val = [];
    arr.forEach(function (item) {
      // 以当前遍历项，的pid,去map对象中找到索引的id
      let parent = map[item.parent_id];
      // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        (parent.nodes || ( parent.nodes = [] )).push(item);
      } else {
        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item);
      }
    });
    return val;
  }
}
