<template>
  <div class="typewriter">
    {{typeText}}
  </div>
</template>

<script>
export default {
  name: 'Typewriter',
  data() {
    return {
      typeText: ''
    }
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 30
    }
  },
  mounted() {
    this.animateText(this.text);
  },
  methods: {
    animateText(value){
      let textArr = value.split('');
      let i = 0;
      let timer = setInterval(() => {
        let curText = textArr[i++];
        if (!curText) {
          clearInterval(timer);
          return;
        }
        this.typeText += curText;
      }, this.time);
    }
  },
  watch: {
    text(value) {
      this.animateText(value);
    }
  }
}
</script>

<style lang="less">

</style>
