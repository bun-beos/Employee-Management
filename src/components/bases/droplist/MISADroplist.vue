<template>
  <div
    :class="`droplist ${droplistType}`"
    v-show="showDropList === id"
    :style="{
      top: `${this.top}px`,
      left: `${this.right}px`,
    }"
  >
    <div
      v-for="(item, index) in items"
      class="droplist-item"
      :class="{ checked: item.split(' ')[0] === pageSizeValue }"
      :key="index"
      @click="$emit('droplistItemEvent', item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADroplist",
  props: [
    "droplistType",
    "items",
    "id",
    "showDropList",
    "pageSizeValue",
    "droplistStyle",
  ],
  data() {
    return {
      top: null,
      right: null,
    };
  },
  watch: {
    droplistStyle(newValue) {
      this.top = newValue.top - 84 - 56 + 8;
      this.right = newValue.right - 200 - 24 - 110 + 6;
    },
  },
};
</script>

<style scoped>
@import url(./MISADroplist.css);
</style>