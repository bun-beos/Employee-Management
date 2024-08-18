<template>
  <div class="box-input" @keydown.esc="isShowBoxCombobox = false">
    <input
      type="text"
      class="input-icon"
      :class="{ 'input-error': inputError }"
      ref="inputCombobox"
      @focus="selectText"
      v-model="valueOutput"
      @keydown.down.prevent="onKeyDownDown"
      @keydown.up.prevent="onKeyDownUp"
      @keydown.enter="
        if (isShowBoxCombobox) valueOutput = items[selectedIndex];
        isShowBoxCombobox = false;
      "
    />
    <m-icon
      :boxIconType="boxIconType"
      :iconType="iconType"
      @click.stop="onShowBoxCombobox"
    ></m-icon>
    <div class="box-combobox" v-if="isShowBoxCombobox">
      <div
        v-for="(item, index) in items"
        :key="index"
        :id="index"
        :class="{
          'combobox-item': true,
          checked: valueOutput == item,
          focused: index == selectedIndex,
        }"
        @click.stop="onSelectValue"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAInputComboBox",
  props: [
    "boxIconType",
    "iconType",
    "items",
    "modelValue",
    "isUpdateData",
    "inputError",
    "isHideCombobox",
  ],
  data() {
    return {
      isShowBoxCombobox: false,
      valueOutput: "",
      selectedIndex: 0,
    };
  },
  watch: {
    isHideCombobox(newValue) {
      if (newValue) {
        this.isShowBoxCombobox = !newValue;
      }
    },
    isShowBoxCombobox(newValue) {
      this.$refs.inputCombobox.focus();
      if (newValue) {
        this.$emit("update:isHideCombobox", !newValue);
        if (this.valueOutput == "" || this.valueOutput === null) {
          this.valueOutput = this.items[0];
        } else {
          this.selectedIndex = this.items.indexOf(this.valueOutput);
        }
      }
    },
    valueOutput(newValue) {
      this.$emit("update:modelValue", newValue);
    },
  },
  methods: {
    /**
     * author: ttkien (19/09/2023)
     * ẩn hiện danh sách lựa chọn
     */
    onShowBoxCombobox() {
      this.isShowBoxCombobox = !this.isShowBoxCombobox;
    },
    /**
     * author: ttkien (19/09/2023)
     * lựa chọn giá trị
     */
    onSelectValue(e) {
      this.valueOutput = e.target.textContent;
      this.isShowBoxCombobox = false;
    },

    onFocus() {
      this.$refs.inputCombobox.focus();
    },

    selectText(e) {
      e.target.select();
    },

    onKeyDownDown() {
      if (this.isShowBoxCombobox) {
        this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
      } else {
        this.isShowBoxCombobox = true;
        if (this.valueOutput == "" || this.valueOutput === null) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex = this.items.indexOf(this.valueOutput);
        }
      }
    },

    onKeyDownUp() {
      if (this.isShowBoxCombobox) {
        if (this.selectedIndex > 0) {
          this.selectedIndex = (this.selectedIndex - 1) % this.items.length;
        } else {
          this.selectedIndex = this.items.length - 1;
        }
      }
    },
  },
  created() {
    this.valueOutput = this.modelValue;
  },
  updated() {},
};
</script>

<style scoped>
@import url(./MISAInput.css);

.box-combobox {
  position: absolute;
  top: 40px;
  width: 100%;
  max-height: 200px;
  padding: 8px 6px;
  border: 1px solid var(--input-border-color);
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 3px 6px #7d7878ab;
  cursor: pointer;
  overflow-y: auto;
  z-index: 1;
}

.box-combobox .combobox-item {
  height: 36px;
  line-height: 36px;
  margin: 2px 0;
  padding: 0 6px;
  border-radius: 4px;
  text-align: left;
}

.box-combobox .combobox-item:hover {
  background-color: var(--combobox-item-background-color_hover);
}

.box-combobox .combobox-item.checked {
  background-color: var(--combobox-item-background-color_hover);
  color: var(--primary-btn-background-color);
}

.box-combobox .combobox-item.focused {
  outline: 1px solid var(--primary-btn-background-color);
}
</style>