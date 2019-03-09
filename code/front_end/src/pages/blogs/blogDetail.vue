<template>
  <div class="blog-Detail">
    <h3 class="tac">{{blog.name}}</h3>
    <div class="article" v-html="blog.article"></div>
  </div>
</template>

<script>
import { getBlogs } from '../../api';
export default {
  name: 'BlogDetail',
  data() {
    return {
      id: 0,
      blog: {}
    }
  },
  mounted() {
    this.initBlogs();
  },
  methods: {
    async initBlogs() {
      this.id = this.$route.query.id ? +this.$route.query.id : 0;

      if (!this.id) return;

      let result = await getBlogs({id: this.id});

      if (result.data && result.data[0]) this.blog = result.data[0];
    }
  }
}
</script>

<style lang="less">
.blog-Detail {
  margin: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 0 20px #ccc;
}
.article {
  padding: 15px;
}
</style>
