<template>
  <!-- begin:: Aside -->
  <div class="aside aside-left d-flex aside-fixed" id="kt_aside" ref="kt_aside" v-if="userType !== 3">
    <!--begin::Primary-->
    <div
      class="aside-primary d-flex flex-column align-items-center flex-row-auto"
    >
      <!--begin::Brand-->
      <!-- <KTBrand></KTBrand> -->
      <div
        class="aside-brand d-flex flex-column align-items-center flex-column-auto py-5 py-lg-12"
      >
        <!--begin::Logo-->
        <img
          :src="siteLogo()"
          alt="Logo"
          class="max-h-30px pointer"
          v-on:click="home()"
        />
        <!--end::Logo-->
      </div>
      <!--end::Brand-->
      <!--begin::Nav Wrapper-->
      <div
        class="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull ps"
        style="height: 528px; overflow: hidden"
      >
        <!--begin::Nav-->
        <ul class="nav flex-column" role="tablist">
          <!--begin::Item-->
          <li
            class="nav-item mb-3"
            data-placement="right"
            data-container="body"
            data-boundary="window"
            v-b-tooltip.hover.right="$t('MENU.TITLE')"
          >
            <a
              id="home"
              href="#"
              class="nav-link btn btn-icon btn-clean btn-lg active"
              data-toggle="tab"
              v-on:click="setActiveTab"
              data-tab="0"
            >
              <span class="svg-icon svg-icon-xl">
                <!--begin::Svg Icon-->
                <inline-svg src="media/svg/icons/Layout/Layout-4-blocks.svg" />
                <!--end::Svg Icon-->
              </span>
            </a>
          </li>
          <!--end::Item-->
        </ul>
        <KTQuickUser></KTQuickUser>
        <!--end::Nav-->
      </div>
      <!--end::Nav Wrapper-->
      <!--begin::Footer-->
      <div
        class="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10"
      
        >
        <!--begin::Aside Toggle-->
        <span
          class="aside-toggle btn btn-icon btn-primary btn-hover-primary shadow-sm"
          id="kt_aside_toggle"
          ref="kt_aside_toggle"
          data-placement="right"
          data-container="body"
          data-boundary="window"
        >
          <i class="ki ki-bold-arrow-back icon-sm"></i>
        </span>
        <!--end::Aside Toggle-->
        <!--begin::Quick Actions-->
        <!-- <KTQuickActions></KTQuickActions> -->
        <!--end::Quick Actions-->
        <!--begin::Quick Panel-->
        <!-- <KTQuickPanel></KTQuickPanel> -->
        <!--end::Quick Panel-->
        <!--begin::User-->
        <!-- <KTQuickUser></KTQuickUser> -->
        <!--end::User-->
      </div>
      <!--end::Footer-->
    </div>
    <!--end::Primary-->
    <!--begin::Secondary-->
    <div class="aside-secondary d-flex flex-row-fluid" >
      <!--begin::Workspace-->
      <div
        class="aside-workspace scroll scroll-push my-2 ps"
        style="height: 824px; overflow: hidden"
      >
        <!--begin::Tab Content-->
        <b-tabs class="hide-tabs" v-model="tabIndex" >
          <!--begin::Tab Pane-->
          <b-tab active class="p-3 px-lg-7 py-lg-5">
            <!--begin::Aside Menu-->
            <div
              class="aside-menu-wrapper flex-column-fluid px-10 py-5"
              id="kt_aside_menu_wrapper"
            >
              <!--begin::Menu Container-->
              <div
                ref="kt_aside_menu"
                id="kt_aside_menu"
                class="aside-menu min-h-lg-800px"
                data-menu-vertical="1"
                data-menu-scroll="1"
                v-bind:class="asideMenuClass"
                
              >
                <!-- example static menu here -->
                <!-- <perfect-scrollbar
                  class="aside-menu scroll"
                  style="max-height: 90vh; position: relative"
                > -->
                <KTMenu ></KTMenu>
                <!-- </perfect-scrollbar> -->
              </div>
              <!--end::Menu Container-->
            </div>
            <!--end::Aside Menu-->
          </b-tab>
          <!--end::Tab Pane-->
        </b-tabs>
        <!--end::Tab Content-->
        <!--end::Workspace-->
      </div>
      <!--end::Secondary-->
    </div>
  </div>
  <!-- end:: Aside -->
</template>

<style lang="scss">
/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
}
.pointer {
  cursor: pointer;
}
</style>

<script>
import { mapState, mapGetters } from "vuex";
import KTLayoutAside from "@/assets/js/layout/base/aside.js";
import KTLayoutAsideMenu from "@/assets/js/layout/base/aside-menu.js";
import KTLayoutAsideToggle from "@/assets/js/layout/base/aside-toggle.js";
// import KTBrand from "@/view/layout/brand/Brand.vue";
import KTMenu from "@/view/layout/aside/Menu.vue";
// import KTQuickActions from "@/view/layout/extras/offcanvas/QuickActions.vue";
import KTQuickUser from "@/view/layout/extras/offcanvas/QuickUser.vue";
// import KTQuickPanel from "@/view/layout/extras/offcanvas/QuickPanel.vue";
import objectPath from "object-path";

export default {
  name: "KTAside",
  data() {
    return {
      insideTm: 0,
      outsideTm: 0,
      tabIndex: 0
    };
  },
  components: {
    // KTBrand,
    KTMenu,
    // KTQuickActions,
    KTQuickUser
    // KTQuickPanel,
  },
  mounted() {
    this.$nextTick(() => {
      // Init Aside
      KTLayoutAside.init(this.$refs["kt_aside"]);

      // Init Aside Menu
      KTLayoutAsideMenu.init(this.$refs["kt_aside_menu"]);
      KTLayoutAsideMenu.init(this.$refs["kt_aside_menu_user_management"]);
      KTLayoutAsideMenu.init(this.$refs["kt_aside_menu_project_management"]);

      // Init Aside Toggle
      KTLayoutAsideToggle.init(this.$refs["kt_aside_toggle"]);
    });
  },
  methods: {
    home() {
      document.getElementById("home").click();
      if (this.$route.fullPath !== "/dashboard") {
        this.$router.push("/dashboard");
      }
    },
    siteLogo() {
      const menuAsideLeftSkin = this.layoutConfig("brand.self.theme");
      // set brand logo
      const logoObject = this.layoutConfig("self.logo");

      let logo;
      if (typeof logoObject === "string") {
        logo = logoObject;
      }
      if (typeof logoObject === "object") {
        logo = objectPath.get(logoObject, menuAsideLeftSkin + "");
      }
      if (typeof logo === "undefined") {
        const logos = this.layoutConfig("self.logo");
        logo = logos[Object.keys(logos)[0]];
      }
      return process.env.BASE_URL + logo;
    },
    setActiveTab(event) {
      let target = event.target;
      if (!event.target.classList.contains("nav-link")) {
        target = event.target.closest(".nav-link");
      }

      const tab = target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set clicked tab index to bootstrap tab
      this.tabIndex = parseInt(target.getAttribute("data-tab"));

      // set current active tab
      target.classList.add("active");

      if (KTLayoutAsideToggle.getToggle().state === "on") {
        KTLayoutAsideToggle.getToggle().toggleOff();
      }
    }
  },
  computed: {
    ...mapState({
      userType: state => state.auth.userType
    }),
    ...mapGetters(["layoutConfig", "getClasses"]),

    /**
     * Get extra classes for menu based on the options
     */
    asideMenuClass() {
      const classes = this.getClasses("aside_menu");
      if (typeof classes !== "undefined") {
        return classes.join(" ");
      }
      return null;
    }
  }
};
</script>
