<template>
  <div class="box-toast-message" v-if="toastMsgData.isShowToastMsg">
    <div class="toast-mess-content">
      <m-icon
        :boxIconType="toastMsgData.boxIconType"
        :iconType="toastMsgData.iconType"
      ></m-icon>
      <div>
        <span
          v-if="toastMsgData.boxIconType === 'box-icon-success'"
          class="success"
        >
          {{ this.$MISAResource["VN"].toastMessage.success }}</span
        >
        <span
          v-else-if="toastMsgData.boxIconType === 'box-icon-error'"
          class="error"
          >{{ this.$MISAResource["VN"].toastMessage.error }}</span
        >
        <span
          v-else-if="toastMsgData.boxIconType === 'box-icon-warning'"
          class="warning"
          >{{ this.$MISAResource["VN"].toastMessage.warning }}</span
        >
        <span
          v-else-if="toastMsgData.boxIconType === 'box-icon-info'"
          class="info"
          >{{ this.$MISAResource["VN"].toastMessage.information }}</span
        >
        {{ toastMsgData.toastMsgContent }}
      </div>
    </div>
    <div class="toast-mess-action">
      <div
        class="action-undo"
        v-if="toastMsgData.boxIconType === 'box-icon-success'"
      >
        {{ this.$MISAResource["VN"].toastMessage.undo }}
      </div>
      <m-icon
        :boxIconType="'box-icon-x_M'"
        :iconType="'icon-x_M'"
        @click="$emit('onHide', toastMsgData.id)"
      ></m-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAToastMessage",
  props: ["toastMsgData"],
  data() {
    return {};
  },
  methods: {},
  created() {
    /**
     * author: ttkien (10/09/2023)
     * tự động ẩn toast message sau 5s
     */
    setTimeout(() => {
      this.$emit("onHide", this.toastMsgData.id);
    }, 5000);
  },
};
</script>

<style>
@import url(./MISAToastMessage.css);
</style>