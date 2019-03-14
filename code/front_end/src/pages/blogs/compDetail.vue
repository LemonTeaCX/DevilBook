<template>
  <div>
    <detail-view :detail="comp"></detail-view>
  </div>
</template>

<script>
import { getComps } from '../../api';
import DetailView from '../../components/detailView';

export default {
  name: 'CompDetail',
  components: { DetailView },
  data() {
    return {
      id: 0,
      comp: {}
    }
  },
  mounted() {
    this.initComp();
  },
  methods: {
    async initComp() {
      this.id = this.$route.query.id ? +this.$route.query.id : 0;
      if (!this.id) return;

      let result = await getComps({id: this.id});
      if (result.data && result.data[0]) this.comp = result.data[0];
    }
  }
}
</script>

<style lang="less">
</style>
