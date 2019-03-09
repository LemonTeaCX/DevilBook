<template>
  <div class="blog-list">
    <h2>blog-list</h2>
    <el-alert
      title="blogtips"
      type="info"
      show-icon
      :closable="false">
    </el-alert>
    <div class="blogs-list">
      <div class="blogs-item" v-for="(blog, index) in blogs" :key="blog.id">
        <el-button type="text" @click="blogDetail(blog.id)">{{`${index+1}. ${blog.name}`}}</el-button>
        <i class="el-icon-edit source-url" title="查看原文" @click="jumpSource(blog.url)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getBlogs } from '../../api';
export default {
  name: 'BlogList',
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
    },
    blogDetail(id = 1) {
      this.$router.push({
        path: '/blogs/blogDetail/',
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
.blog-list {
  margin: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 0 20px #ccc;
}
.blogs-item {
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
