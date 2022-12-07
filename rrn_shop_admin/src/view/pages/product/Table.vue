<template>
  <div class="row">
    <div class="col-lg-12 col-xxl-12">
      <div class="card card-custom card-stretch gutter-b">
        <div class="card-header border-0 py-5">
          <h3 class="card-title align-items-start flex-column"></h3>
          <div class="card-toolbar">
            <b-button
              variant="primary"
              class="float-right"
              style="padding-top: 6px; padding-bottom: 6px"
              v-on:click.prevent="$router.push('product/form')"
            >
              {{ $t("PAGE.DEFAULT.TABLE.NEW") }}
            </b-button>
          </div>
        </div>

        <div class="card-body pt-0 pb-3">
          <div class="col-lg-6 p-0">
            <b-form-group>
              <b-input-group size="sm">
                <b-form-input
                  v-model="pagination.filter"
                  :placeholder="$t('PAGE.DEFAULT.TABLE.SEARCH')"
                  type="search"
                  id="filterInput"
                  debounce="500"
                  @update="fetchData()"
                ></b-form-input>
                <b-input-group-append>
                  <b-button
                    :disabled="!pagination.filter"
                    @click="
                      pagination.filter = '';
                      fetchData();
                    "
                    >{{ $t("PAGE.DEFAULT.TABLE.CLEAR") }}</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </div>

          <div class="tab-content">
            <div class="table-responsive">
              <b-table
                id="organizations-table"
                :striped="false"
                :items="items"
                :fields="fields"
                :sort-by.sync="pagination.orderBy"
                :sort-desc.sync="pagination.isDesc"
                :no-sort-reset="true"
                :busy.sync="isBusy"
                :loading="false"
                :borderless="true"
                head-variant="light"
                :no-local-sorting="true"
                @sort-changed="sortChange"
              >
                <template #cell(id)="data">
                  <div class="text-right">
                    <span v-if="pagination.isDesc">{{
                      total -
                      (pagination.perPage * (pagination.page - 1) + data.index)
                    }}</span>
                    <span v-if="!pagination.isDesc">
                      {{
                        pagination.perPage * (pagination.page - 1) +
                        data.index +
                        1
                      }}
                    </span>
                  </div>
                </template>

                <template #cell(name_en)="data">
                  <div class="d-flex align-items-center ">
                    <div class="one-line-clamp">
                      <a
                        href="javascript:"
                        @click.prevent="
                          $router.push(`product/form/${data.item.id}`)
                        "
                        class="text-dark-75 text-hover-primary mb-1"
                        >{{ data.value }}</a
                      >
                    </div>
                  </div>
                </template>

                <template #cell(name_kh)="data">
                  <div class="d-flex align-items-center ">
                    <div class="one-line-clamp">
                      <a
                        href="javascript:"
                        @click.prevent="
                          $router.push(`product/form/${data.item.id}`)
                        "
                        class="text-dark-75 text-hover-primary mb-1"
                        >{{ data.value }}</a
                      >
                    </div>
                  </div>
                </template>

                <template #cell(best_selling)="data">
                  <toggle-button
                    :value="data.item.best_selling === 1"
                    :sync="true"
                    color="#1BC5BD"
                    @change="updateBestSelling($event, data.item.id)"
                  ></toggle-button>
                </template>

                <template #cell(switch)="data">
                  <toggle-button
                    :value="data.item.status_id === 1"
                    :sync="true"
                    color="#1BC5BD"
                    @change="updateStatus($event, data.item.id)"
                  ></toggle-button>
                </template>

                <template #cell(action)="data">
                  <a
                    href="javascript:"
                    @click.prevent="
                      $router.push(`product/form/${data.item.id}`)
                    "
                    class="btn btn-icon btn-light btn-sm"
                    v-b-tooltip.hover
                    :title="$t('PAGE.DEFAULT.TABLE.FIELDS.ACTION.EDIT')"
                  >
                    <span class="svg-icon svg-icon-md svg-icon-success">
                      <inline-svg
                        src="media/svg/icons/General/Edit.svg"
                      ></inline-svg>
                    </span> </a
                  >&nbsp;&nbsp;&nbsp;
                  <a
                    href="javascript:"
                    @click.prevent="removeData(data.item.id)"
                    class="btn btn-icon btn-light btn-sm"
                    v-b-tooltip.hover
                    :title="$t('PAGE.DEFAULT.TABLE.FIELDS.ACTION.DELETE.TITLE')"
                  >
                    <span class="svg-icon svg-icon-md svg-icon-danger">
                      <inline-svg
                        src="media/svg/icons/General/Trash.svg"
                      ></inline-svg>
                    </span>
                  </a>
                </template>
              </b-table>
              <p class="text-center pt-3" v-if="items.length < 1">
                {{ $t("PAGE.DEFAULT.TABLE.DATA_NOT_FOUND") }}
              </p>
            </div>
            <div class="row justify-content-between">
              <div div class="col-lg-2">
                <b-form-group
                  id="name-input-group"
                  :label="$t('PAGE.DEFAULT.TABLE.PER_PAGE')"
                  label-for="name-input"
                  label-cols="7"
                  label-align-sm="left"
                  label-size="lg"
                >
                  <b-form-select
                    v-model="pagination.perPage"
                    id="perPageSelect"
                    size="sm"
                    :options="paginationOptions"
                    @change="fetchData()"
                  ></b-form-select>
                </b-form-group>
              </div>
              <div div class="col-lg-2">
                <b-pagination
                  v-model="pagination.page"
                  :total-rows="total"
                  :per-page="pagination.perPage"
                  @input="fetchData()"
                  align="right"
                ></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style>
.idField {
  min-width: 100px;
  width: 10%;
  max-width: 100px;
}
.nameEnField {
  min-width: 100px;
  width: 70%;
  max-width: 100px;
}
.nameKhField {
  min-width: 100px;
  width: 70%;
  max-width: 100px;
}
.actionField {
  min-width: 130px;
  width: 130px;
  max-width: 130px;
}
.switchField {
  min-width: 100px;
  width: 10%;
  max-width: 100px;
}
.one-line-clamp {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.two-line-clamp {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import Swal from "sweetalert2";
import {
  PAGINATION_PRODUCT_DATA,
  SET_PAGINATION,
  SET_IS_CLEAR_PAGINATION,
  CLEAR_PAGINATION,
  PUT_PRODUCT_STATUS_DATA,
  PUT_PRODUCT_BEST_SELLING_DATA,
  DELETE_PRODUCT_DATA
} from "@/core/services/store/product.module";
import { mapState } from "vuex";
import { Config } from "@/core/config/variable.config";

export default {
  data() {
    return {
      fields: [
        {
          key: "id",
          label: `${this.$t("PAGE.DEFAULT.TABLE.FIELDS.INDEX")}`,
          key_table: "product.id",
          sortable: true,
          isFilter: false,
          tdClass: "idField"
        },
        {
          key: "name_en",
          label: `${this.$t("PAGE.PRODUCT.TABLE.FIELDS.NAME_EN")}`,
          key_table: "product.name_en",
          sortable: true,
          isFilter: true,
          tdClass: "nameEnField"
        },
        {
          key: "name_kh",
          label: `${this.$t("PAGE.PRODUCT.TABLE.FIELDS.NAME_KH")}`,
          key_table: "product.name_kh",
          sortable: true,
          isFilter: true,
          tdClass: "nameKhField"
        },
        {
          key: "best_selling",
          label: `${this.$t("PAGE.PRODUCT.TABLE.FIELDS.BEST_SELLING")}`,
          key_table: "product.best_selling",
          sortable: true,
          isFilter: true,
          tdClass: "bestSellingField"
        },
        {
          key: "switch",
          label: `${this.$t("PAGE.DEFAULT.TABLE.FIELDS.SWITCH")}`,
          sortable: false,
          isFilter: false,
          tdClass: "switchField"
        },
        {
          key: "action",
          label: `${this.$t("PAGE.DEFAULT.TABLE.FIELDS.ACTION.TITLE")}`,
          sortable: false,
          isFilter: false,
          tdClass: "actionField"
        }
      ],
      select: ["product.id", "product.name_en", "product.name_kh","product.best_selling","product.status_id"],
      paginationOptions: [25, 50, 100, 200],
      isBusy: false,
      items: [],
      total: 0
    };
  },
  computed: {
    ...mapState(),
    isClearPagination: {
      get() {
        return this.$store.state.product.isClearPagination;
      },
      set(value) {
        this.$store.commit(SET_IS_CLEAR_PAGINATION, {
          isClearPagination: value
        });
      }
    },
    pagination: {
      get() {
        return this.$store.state.product.pagination;
      },
      set(value) {
        this.$store.commit(SET_PAGINATION, { pagination: value });
      }
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: `${this.$t("MENU.PRODUCT.TITLE")}` }
    ]);
    if (this.isClearPagination) {
      this.$store.commit(CLEAR_PAGINATION);
    }
    this.isClearPagination = true;
    this.fetchData();
  },
  methods: {
    sortChange(event) {
      this.pagination.isDesc = event.sortDesc;
      this.pagination.orderBy = event.sortBy;
      this.fetchData();
    },
    getParams() {
      const orderByIndex = this.fields.findIndex(
        (item) => item.key === this.pagination.orderBy.toString()
      );
      return {
        page: this.pagination.page.toString(),
        perPage: this.pagination.perPage.toString(),
        orderBy: orderByIndex ? this.fields[orderByIndex].key_table : "id",
        isDesc: this.pagination.isDesc.toString(),
        filter: this.pagination.filter.toString(),
        filterBy: `${this.fields
          .map((item) => {
            if (item.isFilter) return item.key;
          })
          .filter((item) => !!item)}`,
        select: `${this.select}`
      };
    },
    fetchData() {
      this.$store
        .dispatch(PAGINATION_PRODUCT_DATA, { params: this.getParams() })
        .then(({ data }) => {
          
          if (data.status === "success" && data.data) {
            this.items = data.data.data;
            this.total = data.data.total;
            if (this.total > 0 && this.items.length < 1) {
              this.$store.commit(CLEAR_PAGINATION);
              this.fetchData();
            }
          } else if (data.status === "error" && data.error) {
            Swal.fire({
              icon: "error",
              text: `${this.$t("RESPONSE_MESSAGE." + data.error)}`,
              showConfirmButton: true,
              confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
            });
          }
          this.isBusy = false;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            text: `${error.error}`,
            showConfirmButton: true,
            confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
          });
          this.isBusy = false;
        });
    },
    updateStatus(event, id) {
      this.isBusy = true;
      this.$store
        .dispatch(PUT_PRODUCT_STATUS_DATA, {
          id,
          data: {
            status_id: event.value ? 1 : 2
          }
        })
        .then(({ data }) => {
          if (data.status === "success") {
            Swal.fire({
              icon: "success",
              text: `${this.$t("RESPONSE_MESSAGE." + data.data)}`,
              confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
            });
            setTimeout(() => {
              this.fetchData();
            }, 500);
          } else if (data.status === "error" && data.error) {
            Swal.fire({
              icon: "error",
              text: `${this.$t("RESPONSE_MESSAGE." + data.error)}`,
              confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
            });
          }
          this.isBusy = false;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            text: `${error.error}`,
            confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
          });
          this.isBusy = false;
        });
    },
    updateBestSelling(event, id) {
      this.isBusy = true;
      this.$store
        .dispatch(PUT_PRODUCT_BEST_SELLING_DATA, {
          id,
          data: {
            best_selling: event.value ? 1 : 2
          }
        })
        .then(({ data }) => {
          if (data.status === "success") {
            Swal.fire({
              icon: "success",
              text: `${this.$t("RESPONSE_MESSAGE." + data.data)}`,
              confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
            });
            setTimeout(() => {
              this.fetchData();
            }, 500);
          } else if (data.status === "error" && data.error) {
            Swal.fire({
              icon: "error",
              text: `${this.$t("RESPONSE_MESSAGE." + data.error)}`,
              confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
            });
          }
          this.isBusy = false;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            text: `${error.error}`,
            confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
          });
          this.isBusy = false;
        });
    },
    removeData(id) {
      Swal.fire({
        text: `${this.$t("PAGE.DEFAULT.TABLE.FIELDS.ACTION.DELETE.DESC")}`,
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`,
        cancelButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_CANCEL")}`
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store
            .dispatch(DELETE_PRODUCT_DATA, { id })
            .then(({ data }) => {
              if (data.status === "success") {
                Swal.fire({
                  icon: "success",
                  text: `${this.$t("RESPONSE_MESSAGE." + data.data)}`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
                this.fetchData();
              } else if (data.status === "error" && data.error) {
                Swal.fire({
                  icon: "error",
                  text: `${this.$t("RESPONSE_MESSAGE." + data.error)}`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
              }
              this.isBusy = false;
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                text: `${error.error}`,
                confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
              });
              this.isBusy = false;
            });
        }
      });
    },
        preview(id) {
      window.open(`${Config.PREVIEW_CONTENT_URL}/product?id=${id}`);
    }
  }
};
</script>
