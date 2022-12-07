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
              v-on:click.prevent="$router.push('user/form')"
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
                        pagination.perPage * (pagination.page - 1) + data.index + 1
                      }}
                    </span>
                  </div>
                </template>

                <template #cell(fullname)="data">
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-50 symbol-light mr-4">
                      <span class="symbol-label">
                        <img
                          :src="'media/users/default.jpg'"
                          class="h-75"
                          alt=""
                        />
                      </span>
                    </div>
                    <div>
                      <a
                        href="javascript:"
                        @click.prevent="
                          $router.push(`user/form/${data.item.id}`)
                        "
                        class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                        >{{ data.value }}</a
                      >
                    </div>
                  </div>
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
                    @click.prevent="$router.push(`user/form/${data.item.id}`)"
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
  width: 100px;
  max-width: 100px;
}
.actionField {
  min-width: 100px;
  width: 100px;
  max-width: 100px;
}
.switchField {
  min-width: 100px;
  width: 100px;
  max-width: 100px;
}

</style>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import Swal from "sweetalert2";
import {
  PAGINATION_USER_DATA,
  SET_PAGINATION,
  SET_IS_CLEAR_PAGINATION,
  CLEAR_PAGINATION,
  PUT_USER_STATUS_DATA,
  DELETE_USER_DATA
} from "@/core/services/store/user.module";
import { mapState } from "vuex";

export default {
  data() {
    return {
      fields: [
        {
          key: "id",
          label: `${this.$t("PAGE.DEFAULT.TABLE.FIELDS.INDEX")}`,
          key_table: "user.id",
          sortable: true,
          isFilter: false
        },
        {
          key: "fullname",
          label: `${this.$t("PAGE.USER.TABLE.FIELDS.FULLNAME")}`,
          key_table: "user.fullname",
          sortable: true,
          isFilter: true
        },
        {
          key: "email",
          label: `${this.$t("PAGE.USER.TABLE.FIELDS.EMAIL")}`,
          key_table: "user.email",
          sortable: true,
          isFilter: true
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
      select: [
        "user.id",
        "user.fullname",
        "user.email",
        "user.status_id"
      ],
      paginationOptions: [25, 50, 100, 200],
      isBusy: false,
      items: [],
      total: 0
    };
  },
  computed: {
    ...mapState({
      userType: state => state.auth.userType
    }),
    isClearPagination: {
      get() {
        return this.$store.state.user.isClearPagination;
      },
      set(value) {
        this.$store.commit(SET_IS_CLEAR_PAGINATION, {
          isClearPagination: value
        });
      }
    },
    pagination: {
      get() {
        return this.$store.state.user.pagination;
      },
      set(value) {
        this.$store.commit(SET_PAGINATION, { pagination: value });
      }
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: `${this.$t("MENU.USER_MANAGEMENT.TITLE")}` }
    ]);
    if (this.isClearPagination) {
      this.$store.commit(CLEAR_PAGINATION);
    }
    this.isClearPagination = true;
    this.fetchData();
  },
  methods: {
    sortChange(event){
      this.pagination.isDesc = event.sortDesc;
      this.pagination.orderBy = event.sortBy;
      this.fetchData();
    },
    getParams() {
      const orderByIndex = this.fields.findIndex(
        item => item.key === this.pagination.orderBy.toString()
      );
      return {
        page: this.pagination.page.toString(),
        perPage: this.pagination.perPage.toString(),
        orderBy: orderByIndex ? this.fields[orderByIndex].key_table : "id",
        isDesc: this.pagination.isDesc.toString(),
        filter: this.pagination.filter.toString(),
        filterBy: `${this.fields
          .map(item => {
            if (item.isFilter) return item.key;
          })
          .filter(item => !!item)}`,
        select: `${this.select}`,
      };
    },
    fetchData() {
      this.$store
        .dispatch(PAGINATION_USER_DATA, { params: this.getParams() })
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
        .catch(error => {
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
        .dispatch(PUT_USER_STATUS_DATA, {
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
        .catch(error => {
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
      }).then(result => {
        if (result.isConfirmed) {
          this.$store
            .dispatch(DELETE_USER_DATA, { id })
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
            .catch(error => {
              Swal.fire({
                icon: "error",
                text: `${error.error}`,
                confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
              });
              this.isBusy = false;
            });
        }
      });
    }
  }
};
</script>
