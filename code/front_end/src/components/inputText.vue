<template>
  <div class="input-text">
    <div v-if="!editing" @click="startEdit">{{value}}</div>
    <el-input v-else v-model="value" size="small" @blur="endEdit"></el-input>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    text: [String, Number, Boolean],
  },
  data() {
    return {
      value: '',
      editing: false
    }
  },
  mounted() {
    this.value = this.text;
  },
  methods: {
    startEdit() {
      this.editing = true;
    },
    endEdit() {
      this.editing = false;
    }
  }
}
</script>

<style lang="less">
.input-text {
  cursor: pointer;
}
</style>
