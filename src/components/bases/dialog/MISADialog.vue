<template>
  <!-- Thông báo -->
  <div class="notif-view">
    <div class="notif-window">
      <div class="box-notif-title">
        <div class="notif-title">
          {{ dialogData.dialogTitle }}
        </div>
        <m-icon
          tabindex="4"
          :boxIconType="'box-icon-x_M'"
          :iconType="'icon-x_M'"
          @click="$emit('closeDialog')"
          @keydown.tab.prevent="autoFocusMainButton"
          @keydown.enter="$emit('closeDialog')"
        ></m-icon>
      </div>
      <div class="notif-describe">
        <m-icon :iconType="dialogData.iconType"></m-icon>
        <div class="notif-content" v-html="dialogData.dialogContent"></div>
      </div>
      <div class="notif-btn">
        <m-button
          tabindex="1"
          ref="focusButton"
          class="main-button"
          :title="dialogData.mainButton"
          @click="$emit('mainActionDialog')"
          @keydown.enter="$emit('mainActionDialog')"
        ></m-button>

        <m-button
          tabindex="2"
          v-if="
            dialogData.dialogTitle ===
              this.$MISAResource['VN'].dialogTitle.dataChange &&
            dialogData.dialogTitle !==
              this.$MISAResource['VN'].dialogTitle.dataError
          "
          class="minor-button minor-button_1"
          :title="dialogData.minorButton1"
          @click="$emit('minorActionDialog1')"
          @keydown.enter="$emit('minorActionDialog1')"
        ></m-button>

        <m-button
          tabindex="3"
          v-if="
            dialogData.dialogTitle !==
            this.$MISAResource['VN'].dialogTitle.dataError
          "
          class="minor-button minor-button_2"
          :title="dialogData.minorButton2"
          @click="$emit('closeDialog')"
          @keydown.enter="$emit('closeDialog')"
        ></m-button>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
export default {
  name: "MISADialog",
  props: ["dialogData"],
  methods: {
    autoFocusMainButton() {
      this.$nextTick(() => {
        this.$refs.focusButton.onFocus();
      });
    },
  },

  mounted() {
    this.autoFocusMainButton();
  },
};
</script>

<style>
@import url(./MISADialog.css);
</style>