<template>
  <div class="row">
    <div class="col-lg-12 col-xxl-12">
      <div class="card card-custom card-stretch gutter-b">
        <div class="card-body pb-10 pt-10">
          <div class="col-lg-11">
            <b-form
              @submit.stop.prevent="onSubmit"
            >
            <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.MEETING.FORM.FIELDS.CUSTOMER") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  
                  <selectize v-model="$v.form.customer_id.$model" 
                    class="mb-3"> 
                    <option
                      v-for="item in customerData"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.fullname }}
                    </option>
                  </selectize>
               

                  <b-form-invalid-feedback id="customer_id-live-feedback">
                    <span v-if="!$v.form.customer_id.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.MEETING.FORM.FIELDS.ADMIN") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  
                  <selectize v-model="$v.form.admin_id.$model" 
                    class="mb-3"> 
                    <option
                      v-for="item in adminData"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.fullname }}
                    </option>
                  </selectize>
               

                  <b-form-invalid-feedback id="admin_id-live-feedback">
                    <span v-if="!$v.form.admin_id.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.MEETING.FORM.FIELDS.DATETIME") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <date-picker
                    v-model="$v.form.datetime.$model"
                    type="datetime"
                    valueType="format"
                  ></date-picker>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.MEETING.FORM.FIELDS.DESCRIPTION") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <ckeditor
                    id="description-input"
                    name="description-input"
                    v-model="$v.form.description.$model"
                    :config="editorConfig"
                  >
                  </ckeditor>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.MEETING.FORM.FIELDS.IMAGE") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <UploadImages
                    v-if="images_path.length > 0"
                    @change="handleImages"
                    :max="15"
                    uploadMsg="upload product images"
                    fileError="images files only accepted"
                    :images_path="images_path"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12">
                  <b-button class="float-right" @click.prevent="cancel()">{{
                    $t("PAGE.DEFAULT.FORM.BTN_CANCEL")
                  }}</b-button>
                  <b-button
                    type="submit"
                    variant="primary"
                    class="float-right mr-3"
                    >{{ $t("PAGE.DEFAULT.FORM.BTN_SUBMIT") }}</b-button
                  >
                </b-col>
              </b-row>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  GET_MEETING_DATA,
  PUT_MEETING_DATA
} from "@/core/services/store/meeting.module";
import Swal from "sweetalert2";
import { SET_IS_CLEAR_PAGINATION } from "@/core/services/store/meeting.module";
import { mapState } from "vuex";
import UploadImages from "@/assets/plugins/vue-upload-multiple-images/vue-upload-multiple-images.vue";
import { LIST_CUSTOMER_DATA, LIST_ADMIN_DATA } from "@/core/services/store/user.module";
import Selectize from 'vue2-selectize'
import { Config } from "@/core/config/variable.config";

import moment from "moment";

export default {
  mixins: [validationMixin],
  components: {
    UploadImages,
    Selectize
  },
  data() {
    return {
      editorConfig: {
        extraPlugins: "emoji"
      },
      form: {
        admin_id: "",
        description: "",
        customer_id: "",
        imageLength:"",
        datetime: "",
        meeting_image: []
      },
      customerData: [],
      adminData: [],
      images_path: []
    };
  },
  validations: {
    form: {
      admin_id: {
        required,
      },
      customer_id: {
        required,
      },
      description: {},
      datetime: {

      },
    }
  },
  computed: {
    ...mapState({
      userType: (state) => state.auth.userType
    })
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getMeeting(this.id);
    this.listUser();
    this.listAdmin();
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit() {
    
      let formData = new FormData();
      formData.append("imageLength", this.form.meeting_image.length);
      formData.append("description", this.form.description);
      formData.append("customer_id", this.form.customer_id);
      formData.append("admin_id", this.form.admin_id);
      formData.append("datetime", this.form.datetime);
      for (let i = 0; i < this.form.meeting_image.length; i++) {
        formData.append("images", this.form.meeting_image[i]);
      }
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        Swal.fire({
                  icon: "error",
                  text: `INPUT DATA`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
        return;
      }
      this.update(this.id, formData);
    },
    getMeeting(id) {
      Swal.fire({
        title: `${this.$t("LOADING")}`,
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 36000,
        onOpen: () => {
          Swal.showLoading();
          this.$store
            .dispatch(GET_MEETING_DATA, { id })
            .then(({ data }) => {
              Swal.close();
              if (data.status === "success" && data.data) {
                for (const formKey of Object.keys(this.form)) {
                  for (const dataKey of Object.keys(data.data)) {
                    if (formKey === dataKey) {
                      this.form[formKey] = data.data[formKey];
                    }
                  }
                }
                for (let i = 0; i < this.form.meeting_image.length; i++) {
                  this.images_path.push(
                    `${Config.ADMIN_IMAGE_URL}${this.form.meeting_image[i].image_path}`
                  );
                }
                this.form.datetime = this.format_date(data.data.datetime);
              } else if (data.status === "error" && data.error) {
                Swal.fire({
                  icon: "error",
                  text: `${this.$t("RESPONSE_MESSAGE." + data.error)}`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
              }
            })
            .catch((error) => {
              Swal.close();
              Swal.fire({
                icon: "error",
                text: `${error}`,
                confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
              });
            });
        }
      });
    },
    update(id, data) {
      Swal.fire({
        title: `${this.$t("LOADING")}`,
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 36000,
        onOpen: () => {
          Swal.showLoading();
          this.$store
            .dispatch(PUT_MEETING_DATA, { id, data })
            .then(({ data }) => {
              Swal.close();
              if (data.status === "success" && data.data) {
                Swal.fire({
                  icon: "success",
                  text: `${this.$t("RESPONSE_MESSAGE." + data.data)}`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
                this.$router.push("../../meeting");
              } else if (data.status === "error" && data.error) {
                this.$v.$reset();
                Swal.fire({
                  icon: "error",
                  text: `${this.$t("RESPONSE_MESSAGE." + data.error)}`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
              }
            })
            .catch((error) => {
              Swal.close();
              Swal.fire({
                icon: "error",
                text: `${error}`,
                confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
              });
            });
        }
      });
    },
    listUser() {
      this.$store
        .dispatch(LIST_CUSTOMER_DATA)
        .then(({ data }) => {
          if (data.status === "success" && data.data) {
            this.customerData = data.data;
          } else if (data.status === "error" && data.error) {
            Swal.fire({
              icon: "error",
              text: `${this.$t("RESPONSE_MESSAGE." + data.error)}`,
              confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
            });
          }
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            text: `${error}`,
            confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
          });
        });
    },
    listAdmin() {
      this.$store
        .dispatch(LIST_ADMIN_DATA)
        .then(({ data }) => {
          console.log(data)
          if (data.status === "success" && data.data) {
            this.adminData = data.data;
          } else if (data.status === "error" && data.error) {
            Swal.fire({
              icon: "error",
              text: `${this.$t("RESPONSE_MESSAGE." + data.error)}`,
              confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
            });
          }
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            text: `${error}`,
            confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
          });
        });
    },
    cancel() {
      this.$store.commit(SET_IS_CLEAR_PAGINATION, { isClearPagination: false });
      this.$router.push("../../meeting");
    },
    handleImages(files) {
      this.form.meeting_image = files;
    },
    
    format_date(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD HH:mm:ss");
      }
    },
  }
};
</script>