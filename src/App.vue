<template>
  <div id="main">
    <TheSideBar></TheSideBar>
    <TheContainer></TheContainer>
  </div>
</template>

<script>
import TheSideBar from "./components/layout/sidebar/TheSidebar.vue";
import TheContainer from "./components/layout/container/TheContainer.vue";

export default {
  name: "App",
  components: {
    TheSideBar,
    TheContainer,
  },
  async created() {
    let userProfile;
    try {
      userProfile = await this.$api.getUserProfileAsync();
      this.$profile.ProfileId = userProfile[0].ProfileId;
      this.$profile.ProfileDateFormat = userProfile[0].ProfileDateFormat;
    } catch (error) {
      this.$helper.showError();
    }
  },
};
</script>

<style>
@import url(./App.css);
</style>
