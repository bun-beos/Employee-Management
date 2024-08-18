<template>
  <div class="box-spinner">
    <div :class="`spinner_${spinnerType}`"></div>
  </div>
</template>

<script>
export default {
  name: "MISALoading",
  props: ["spinnerType"],
};
</script>

<style scoped>
@import url(./MISALoading.css);
</style>