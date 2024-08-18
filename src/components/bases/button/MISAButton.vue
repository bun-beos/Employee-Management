<template>
  <button ref="thisButton">{{ title }}</button>
</template>

<script>
export default {
  name: "MISAButton",
  props: ["title"],
  methods: {
    onFocus() {
      this.$refs.thisButton.focus();
    },
  },
};
</script>

<style scoped>
@import url(./MISAButton.css);
</style>