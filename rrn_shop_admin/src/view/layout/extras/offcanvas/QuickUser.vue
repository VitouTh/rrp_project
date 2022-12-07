<template>
  <div>
    <a
      href="#"
      class="btn btn-icon btn-clean btn-lg w-40px h-40px"
      id="kt_quick_user_toggle"
      data-toggle="tooltip"
      data-placement="right"
      data-container="body"
      data-boundary="window"
      title=""
      data-original-title="User Profile"
      v-b-tooltip.hover.right="$t('MENU.PROFILE.TITLE')"
    >
      <span class="symbol symbol-30 symbol-lg-40">
        <span class="svg-icon svg-icon-xl">
          <!--begin::Svg Icon-->
          <inline-svg src="media/svg/icons/General/User.svg" />
          <!--end::Svg Icon-->
        </span>
        <!--<span class="symbol-label font-size-h5 font-weight-bold">S</span>-->
      </span>
    </a>

    <div
      id="kt_quick_user"
      ref="kt_quick_user"
      class="offcanvas offcanvas-left p-10"
    >
      <!--begin::Header-->
      <div
        class="offcanvas-header d-flex align-items-center justify-content-between pb-5"
      >
        <h3 class="font-weight-bold m-0">
          {{ $t("MENU.PROFILE.TITLE") }}
          <!-- <small class="text-muted font-size-sm ml-2">12 messages</small> -->
        </h3>
        <a
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>

      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar
        class="offcanvas-content pr-5 mr-n5 scroll"
        style="max-height: 90vh; position: relative;"
      >
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">
          <div class="symbol symbol-100 mr-5" @click.prevent="openProfile()">
            <img class="symbol-label" :src="picture" alt="" />
            <i class="symbol-badge bg-success"></i>
          </div>
          <div class="d-flex flex-column">
            <a
              href="javascript:"
              @click.prevent="openProfile()"
              class="font-weight-bold  text-dark-75 text-hover-primary"
            >
              {{ currentUserData.fullname }}
            </a>
            <div class="text-muted mt-1">
              {{ currentUserData.userType.name }}
            </div>
            <div class="navi mt-2">
              <a
                href="javascript:"
                @click.prevent="openProfile()"
                class="navi-item"
              >
                <span class="navi-link p-0 pb-2">
                  <span class="navi-icon mr-1">
                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                      <!--begin::Svg Icon-->
                      <inline-svg
                        src="media/svg/icons/Communication/Mail-notification.svg"
                      />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <span class="navi-text text-muted text-hover-primary">
                    {{ currentUserData.email }}
                  </span>
                </span>
              </a>
            </div>
            <button class="btn btn-light-primary btn-bold" @click="onLogout">
              {{ $t("MENU.LOGOUT.TITLE") }}
            </button>
          </div>
        </div>
        <!--end::Header-->
        <div class="separator separator-dashed my-7"></div>
        <!--begin::Notifications-->
        <div>
          <!--begin:Heading-->
          <!-- <h5 class="mb-5">Recent Notifications</h5> -->
          <!--end:Heading-->
          <template v-for="(item, i) in list">
            <!--begin::Item -->
            <div
              class="d-flex align-items-center rounded p-5 gutter-b"
              v-bind:class="`bg-light-${item.type}`"
              v-bind:key="i"
            >
              <span
                class="svg-icon mr-5"
                v-bind:class="`svg-icon-${item.type}`"
              >
                <span class="svg-icon svg-icon-lg">
                  <!--begin::Svg Icon-->
                  <inline-svg :src="item.svg" />
                  <!--end::Svg Icon-->
                </span>
              </span>
              <div class="d-flex flex-column flex-grow-1 mr-2">
                <a
                  href="#"
                  class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
                >
                  {{ item.title }}
                </a>
                <span class="text-muted font-size-sm">
                  {{ item.desc }}
                </span>
              </div>
              <span
                class="font-weight-bolder py-1 font-size-lg"
                v-bind:class="`text-${item.type}`"
              >
                {{ item.alt }}
              </span>
            </div>
            <!--end::Item -->
          </template>
        </div>
        <!--end::Notifications-->
      </perfect-scrollbar>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import { LOGOUT, PURGE_AUTH } from "@/core/services/store/auth.module";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";
import Swal from "sweetalert2";
import { mapState } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "KTQuickUser",
  data() {
    return {
      list: [
        // {
        //   title: "Another purpose persuade",
        //   desc: "Due in 2 Days",
        //   alt: "+28%",
        //   svg: "media/svg/icons/Home/Library.svg",
        //   type: "warning"
        // },
        // {
        //   title: "Would be to people",
        //   desc: "Due in 2 Days",
        //   alt: "+50%",
        //   svg: "media/svg/icons/Communication/Write.svg",
        //   type: "success"
        // },
        // {
        //   title: "Purpose would be to persuade",
        //   desc: "Due in 2 Days",
        //   alt: "-27%",
        //   svg: "media/svg/icons/Communication/Group-chat.svg",
        //   type: "danger"
        // },
        // {
        //   title: "The best product",
        //   desc: "Due in 2 Days",
        //   alt: "+8%",
        //   svg: "media/svg/icons/General/Attachment2.svg",
        //   type: "info"
        // }
      ]
    };
  },
  computed: {
    ...mapState({
      currentUserData: state => state.auth.currentUserData
    }),
    picture() {
      return "media/users/default.jpg";
    }
  },
  mounted() {
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
  },
  methods: {
    openProfile() {
      if (this.$route.fullPath !== "/profile") {
        this.$store.dispatch(SET_BREADCRUMB, [{ title: "Profile" }]);
        this.$router.push(`/profile`);
      }
      document.getElementById("kt_quick_user_close").click();
    },
    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(({ data }) => {
          if (data && data.status === "success") {
            this.$store.commit(PURGE_AUTH);
            this.$router.push("/login");
          } else if (data && data.status === "error") {
            Swal.fire({
              title: "",
              icon: "error",
              text: `${data.error}`
            });
            this.$store.commit(PURGE_AUTH);
            this.$router.push("/login");
          }
        })
        .catch(error => {
          Swal.fire({
            title: "",
            icon: "error",
            text: `${error.error}`
          });
        });
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    }
  }
};
</script>
