<template>
  <router-view></router-view>
</template>

<style lang="scss">
  // 3rd party plugins css
  @import "~bootstrap-vue/dist/bootstrap-vue.css";
  @import "~perfect-scrollbar/css/perfect-scrollbar.css";
  @import "~socicon/css/socicon.css";
  @import "~animate.css";
  @import "~@fortawesome/fontawesome-free/css/all.css";
  @import "~line-awesome/dist/line-awesome/css/line-awesome.css";
  @import "assets/plugins/flaticon/flaticon.css";
  @import "assets/plugins/flaticon2/flaticon.css";
  @import "assets/plugins/keenthemes-icons/font/ki.css";
  @import "vue-weblineindia-multiselect/src/scss/vue-select.scss";

  // Main demo style scss
  @import "assets/sass/style.vue";
  @import "~selectize/dist/css/selectize.bootstrap3.css";

  // Check documentation for RTL css
  // Update HTML with RTL attribute at public/index.html
  /*@import "assets/css/style.vue.rtl";*/

  @font-face {
    font-family: SukhumvitSet;
    font-weight: 400;
    src: url("~@/assets/fonts/SukhumvitSet-Medium.ttf");
  }

  @font-face {
    font-family: SukhumvitSet;
    font-weight: 700;
    src: url("~@/assets/fonts/SukhumvitSet-Bold.ttf");
  }

  * {
    font-family: SukhumvitSet, sans-serif !important;
  }
</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDK0FyyoMnX4qqdIYB1mwpuFlcIpyLIoX8&callback=initMap"></script>
<script>
  import { OVERRIDE_LAYOUT_CONFIG } from "@/core/services/store/config.module";

  export default {
    name: "MetronicVue",
    mounted() {
      /**
       * this is to override the layout config using saved data from localStorage
       * remove this to use config only from static json (@/core/config/layout.config.json)
       */
      this.$store.dispatch(OVERRIDE_LAYOUT_CONFIG);
    }
  };
</script>
