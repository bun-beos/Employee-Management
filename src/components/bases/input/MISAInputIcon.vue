<template>
  <div class="box-input">
    <input
      type="text"
      :class="{ 'input-icon': true, 'input-error': inputError }"
      :placeholder="placeholder"
      v-model="valueOutput"
      ref="inputIcon"
      @focus="selectText"
    />
    <m-icon
      :boxIconType="boxIconType"
      :iconType="iconType"
      :tooltip="tooltip"
      @click="$emit('onClickIcon')"
    ></m-icon>
  </div>
</template>

<script>
export default {
  name: "MISAInputIcon",
  props: [
    "placeholder",
    "boxIconType",
    "iconType",
    "tooltip",
    "modelValue",
    "isUpdateData",
    "inputError",
  ],
  data() {
    return {
      valueOutput: null,
    };
  },
  watch: {
    valueOutput(newValue) {
      this.$emit("update:modelValue", newValue);
    },
  },
  methods: {
    /**
     * author: ttkien (21/09/2023)
     * focus vào thẻ input
     */
    onFocus() {
      this.$refs.inputIcon.focus();
    },
    selectText(e) {
      e.target.select();
    },
  },
  created() {
    this.valueOutput = this.modelValue;
  },
  updated() {},
};
</script>

<style>
@import url(./MISAInput.css);

input[type="text"]:focus + .box-icon {
  border-color: var(--primary-btn-background-color);
}

.input-error + .box-icon {
  border-color: var(--input-border-color-error) !important;
}

.input-error:focus + .box-icon {
  border-color: var(--input-border-color-error) !important;
}
</style>