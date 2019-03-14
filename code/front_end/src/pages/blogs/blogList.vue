<template>
  <div>
    <list-view 
      :title="'博客列表'"
      :tip="'这里是本人日常工作与学习积累的一些web开发知识，可点击查看详情，也可以点击博客标题右边按钮查看原文'"
      :list="blogs"
      :detailPath="'/blogs/blogDetail/'"></list-view>
  </div>
</template>

<script>
import { getBlogs } from '../../api';
import ListView from '../../components/listView';
export default {
  name: 'BlogList',
  components: { ListView },
  data() {
    return {
      blogs: []
    }
  },
  mounted() {
    this.getBlogList();
  },
  methods: {
    async getBlogList() {
      let result = await getBlogs();
      this.blogs = result.data;
    }
  }
}
</script>

<style lang="less">
</style>
