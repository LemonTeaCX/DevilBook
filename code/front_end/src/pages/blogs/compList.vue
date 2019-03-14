<template>
  <div>
    <list-view 
      :title="'组件列表'"
      :tip="'这里是本人日常工作与学习开发过的一些前端组件，可点击查看详情。'"
      :list="comps"
      :detailPath="'/blogs/compDetail/'"></list-view>
  </div>
</template>

<script>
import { getComps } from '../../api';
import ListView from '../../components/listView';
export default {
  name: 'CompList',
  components: { ListView },
  data() {
    return {
      comps: []
    }
  },
  mounted() {
    this.getCompList();
  },
  methods: {
    async getCompList() {
      let result = await getComps();
      this.comps = result.data;
    }
  }
}
</script>

<style lang="less">
</style>
