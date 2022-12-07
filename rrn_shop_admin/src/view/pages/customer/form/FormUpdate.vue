<template>
  <div class="row">
    <div class="col-lg-12 col-xxl-12">
      <div class="card card-custom card-stretch gutter-b">
        <div class="card-body pb-10 pt-10">
          <b-tabs pills card>
            <b-tab :title="$t('PAGE.USER.FORM.TABS.DATA')" active>
              <KTFormUpdateData></KTFormUpdateData>
            </b-tab>
            <b-tab :title="$t('PAGE.USER.FORM.TABS.PASSWORD')">
              <KTFormUpdatePassword></KTFormUpdatePassword>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import KTFormUpdateData from "@/view/pages/customer/form/form-update-tabs/FormUpdateData.vue";
import KTFormUpdatePassword from "@/view/pages/customer/form/form-update-tabs/FormUpdatePassword.vue";

export default {
  components: {
    KTFormUpdateData,
    KTFormUpdatePassword
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      {
        title: `${this.$t("MENU.USER_MANAGEMENT.TITLE")}`,
        route: "../../customer"
      },
      { title: `${this.$t("PAGE.DEFAULT.FORM.TITLE")}` }
    ]);
  }
};
</script>
