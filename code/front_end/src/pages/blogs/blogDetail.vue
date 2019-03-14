<template>
  <div>
    <detail-view :detail="blog"></detail-view>
  </div>
</template>

<script>
import { getBlogs } from '../../api';
import DetailView from '../../components/detailView';

export default {
  name: 'BlogDetail',
  components: { DetailView },
  data() {
    return {
      id: 0,
      blog: {}
    }
  },
  mounted() {
    this.initBlog();
  },
  methods: {
    async initBlog() {
      this.id = this.$route.query.id ? +this.$route.query.id : 0;
      if (!this.id) return;

      let result = await getBlogs({id: this.id});
      if (result.data && result.data[0]) this.blog = result.data[0];
    }
  }
}
</script>

<style lang="less">
</style>
