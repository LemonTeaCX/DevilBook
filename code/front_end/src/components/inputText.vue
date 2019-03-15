<template>
  <div class="input-text">
    <div class="text" v-if="!editing" @click="startEdit">{{value}}</div>
    <el-input v-else v-model="value" size="small" ref="inputRef" @blur="endEdit"></el-input>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    text: [String, Number],
  },
  data() {
    return {
      value: null,
      editing: false
    }
  },
  mounted() {
    this.value = this.text;
  },
  methods: {
    startEdit() {
      this.editing = true;
      this.$nextTick(() => {
        this.$refs.inputRef.focus();
      });
    },
    endEdit() {
      this.editing = false;
      this.$emit('changeText', this.value);
    }
  },
  watch: {
    text(newValue, value) {
      this.value = newValue;
    }
  }
}
</script>

<style lang="less" scoped>
.input-text {
  cursor: pointer;
  .text {
    min-height: 30px;
  }
}
</style>
