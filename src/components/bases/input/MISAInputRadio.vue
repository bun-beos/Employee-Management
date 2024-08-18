<template>
  <div
    class="box-radio-select"
    ref="inputRadio"
    @keydown.delete="this.picked = null"
  >
    <div class="radio-select" v-for="(item, index) in items" :key="index">
      <input type="radio" :value="item" v-model="picked" />
      <span class="span-label" @click="onTickRadio(item)">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items", "modelValue"],
  name: "MISAInputRadio",
  data() {
    return {
      picked: null,
    };
  },
  watch: {
    picked(newValue) {
      this.$emit("update:modelValue", newValue);
    },
  },
  methods: {
    onFocus() {
      this.$refs.inputRadio.focus();
    },
    onTickRadio(value) {
      this.picked = value;
    },
  },
  created() {
    this.picked = this.modelValue;
  },
};
</script>

<style scoped>
@import url(./MISAInput.css);

input[type="radio"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  appearance: none;
  outline: 1px solid var(--input-radio-border-color);
  border: 3px solid #fff;
  border-radius: 50%;
}

input[type="radio"]:focus-visible {
  outline-color: var(--primary-btn-background-color);
}

input[type="radio"]:checked {
  background-color: var(--primary-btn-background-color);
  outline-color: var(--primary-btn-background-color);
}

.form-body .radio-select {
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 20px;
}

#interface-option .date-format .radio-select {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
</style>