<template>
  <div class="list-view">
    <h2>{{title}}</h2>
    <div class="list-tip">
      <el-alert
        v-if="tip"
        :title="tip"
        type="info"
        show-icon
        :closable="false">
      </el-alert>
    </div>
    <div>
      <div class="item" v-for="(item, index) in list" :key="item.id || index">
        <el-button type="text" @click="itemDetail(item.id)">{{`${index+1}. ${item.name}`}}</el-button>
        <i v-if="item.url" class="el-icon-document source-url" title="查看原文" @click="jumpSource(item.url)"></i>
      </div>
      <div v-if="!list[0]">
        <el-alert
          title="暂无数据..."
          type="warning"
          center
          :closable="false">
        </el-alert>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  data() {
    return {}
  },
  props: {
    title: String,
    tip: String,
    list: Array,
    detailPath: String
  },
  methods: {
    itemDetail(id = 1) {
      this.$router.push({
        path: this.detailPath,
        query: { id }
      });
    },
    jumpSource(url = '') {
      window.top.open && window.top.open(url);
    }
  }
}
</script>

<style lang="less">
.list-view {
  margin: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 0 20px #ccc;
}
.list-tip {
  margin: 15px 0;
}
.item {
  .source-url {
    display: none;
    margin-left: 10px;
    cursor: pointer;
  }
  &:hover {
    .source-url {
      display: inline-block;
    }
  }
}

</style>
