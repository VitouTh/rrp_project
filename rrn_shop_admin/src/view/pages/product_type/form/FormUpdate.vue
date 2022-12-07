<template>
  <div class="row">
    <div class="col-lg-12 col-xxl-12">
      <div class="card card-custom card-stretch gutter-b">
        <div class="card-body pb-10 pt-10">     
              <KTFormUpdateData></KTFormUpdateData>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import KTFormUpdateData from "@/view/pages/product_type/form/form-update-tabs/FormUpdateData.vue";

export default {
  components: {
    KTFormUpdateData
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      {
        title: `${this.$t("MENU.PRODUCT_TYPE.TITLE")}`,
        route: "../../product_type"
      },
      { title: `${this.$t("PAGE.DEFAULT.FORM.TITLE")}` }
    ]);
  }
};
</script>
