<template>
  <input type="checkbox" v-if="this.checkBoxArray.length === 0" />
  <div class="box-icon box-input-checkbox checkbox-checked" v-else>
    <!-- <div class="div-icon-check"></div> -->
    <div class="div-icon-minus"></div>
  </div>
  <!-- <div class="box-icon box-input-checkbox" v-else :id="id">
    <div class="icon-img icon-check"></div>
    <div class="div-icon-check"></div>
  </div> -->
</template>

<script>
export default {
  name: "MISAInputCheckbox",
  props: ["thead", "modelValue", "length"],
  data() {
    return {
      checkBoxArray: [],
    };
  },
  methods: {},
  watch: {
    // checkBoxArray(newValue) {
    //   this.$emit("update:modelValue", newValue);
    // },
  },
  updated() {
    // this.checkBoxArray = this.modelValue;
  },
};
</script>

<style>
@import url(./MISAInput.css);

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin: 8px 0;
  accent-color: var(--primary-btn-background-color);
  cursor: pointer;
}

.box-icon.box-input-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  margin: 8px 0;
  cursor: pointer;
}

.checkbox-checked {
  border: none;
  background-color: var(--primary-btn-background-color);
}
.div-icon-minus {
  width: 12px;
  height: 3px;
  border-bottom: 3px solid #fff;
}
</style>