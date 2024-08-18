<template>
  <div id="interface-option">
    <div class="header">
      <div class="title">Tùy chọn hiển thị giao diện</div>
    </div>
    <div class="body">
      <div class="body-content">
        <div class="date-format">
          <div class="date-format_header">Chọn định dạng ngày tháng năm</div>
          <div class="date_format_container">
            <m-input-radio :items="dateFormat" v-model="picked"></m-input-radio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InterfaceOptional",
  data() {
    return {
      dateFormat: [
        this.$MISAResource.dateFormat.dayMonthYear,
        this.$MISAResource.dateFormat.monthDayYear,
        this.$MISAResource.dateFormat.yearDayMonth,
        this.$MISAResource.dateFormat.yearMonthDay,
        this.$MISAResource.dateFormat.yearOnly,
      ],
      picked: this.$helper.convertDateFormatToResource(
        this.$profile.ProfileDateFormat
      ),
    };
  },
  watch: {
    picked(newValue) {
      this.$profile.ProfileDateFormat =
        this.$helper.convertDateFormatToEnum(newValue);
    },
  },
  methods: {
    async updateUserProfile(id, userProfile) {
      try {
        await this.$api.updateUserProfileAsync(id, userProfile);
      } catch (error) {
        this.$helper.showError();
      }
    },
  },
  beforeUnmount() {
    this.updateUserProfile(this.$profile.ProfileId, this.$profile);
  },
};
</script>

<style scoped>
@import url(./InterfaceOptional.css);
</style>