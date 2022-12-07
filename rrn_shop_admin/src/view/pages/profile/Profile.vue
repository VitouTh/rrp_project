<template>
  <div class="row">
    <div class="col-lg-12 col-xxl-12">
      <div class="card card-custom card-stretch gutter-b">
        <div class="card-body pb-10 pt-10">
          <b-tabs pills card>
            <b-tab :title="$t('PAGE.PROFILE.FORM.TABS.DATA')" active>
              <ProfileData></ProfileData>
            </b-tab>
            <b-tab :title="$t('PAGE.PROFILE.FORM.TABS.PASSWORD')">
              <ProfilePassword></ProfilePassword>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import ProfileData from "@/view/pages/profile/components/ProfileData.vue";
import ProfilePassword from "@/view/pages/profile/components/ProfilePassword.vue";

export default {
  name: "Profile",
  components: {
    ProfileData,
    ProfilePassword
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: `${this.$t("MENU.PROFILE.TITLE")}`, route: "/profile" }
    ]);
  }
};
</script>
