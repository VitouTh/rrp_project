<template>
  <div class="row">
    <div class="col-lg-12 col-xxl-12">
      <div class="card card-custom card-stretch gutter-b">
        <div class="card-body pb-10 pt-10">
          <div class="col-lg-11">
            <b-form @submit.stop.prevent="onSubmit">
              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.PRODUCT_TYPE.FORM.FIELDS.NAME_EN") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="name_en-input"
                    name="name_en-input"
                    type="text"
                    v-model="$v.form.name_en.$model"
                    :state="validateState('name_en')"
                    aria-describedby="name_en-live-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="name_en-live-feedback">
                    <span v-if="!$v.form.name_en.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                    <span v-if="!$v.form.name_en.maxLength" class="error">
                      {{
                        $t("PAGE.DEFAULT.FORM.VALIDATION.MAX_LENGTH", {
                          max: 256
                        })
                      }}
                    </span>
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.PRODUCT_TYPE.FORM.FIELDS.NAME_KH") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="name_kh-input"
                    name="name_kh-input"
                    type="text"
                    v-model="$v.form.name_kh.$model"
                    :state="validateState('name_kh')"
                    aria-describedby="name_en-live-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="name_kh-live-feedback">
                    <span v-if="!$v.form.name_kh.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                    <span v-if="!$v.form.name_kh.maxLength" class="error">
                      {{
                        $t("PAGE.DEFAULT.FORM.VALIDATION.MAX_LENGTH", {
                          max: 256
                        })
                      }}
                    </span>
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.PRODUCT_TYPE.FORM.FIELDS.DESCRIPTION") }}</h5>
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
                    <h5>{{ $t("PAGE.PRODUCT_TYPE.FORM.FIELDS.IMAGE") }}</h5>
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
import { required, maxLength } from "vuelidate/lib/validators";
import {
  GET_PRODUCT_TYPE_DATA,
  PUT_PRODUCT_TYPE_DATA
} from "@/core/services/store/productType.module";
import Swal from "sweetalert2";
import { SET_IS_CLEAR_PAGINATION } from "@/core/services/store/productType.module";
import { mapState } from "vuex";
import UploadImages from "@/assets/plugins/vue-upload-multiple-images/vue-upload-multiple-images.vue";
import { Config } from "@/core/config/variable.config";

export default {
  mixins: [validationMixin],
  components: {
    UploadImages
  },
  data() {
    return {
      editorConfig: {
        extraPlugins: "emoji"
      },
      id: 0,
      form: {
        product_type_image: [],
        name_en: "",
        name_kh: "",
        description: "",
        imageLength: ""
      },
      images_path: []
    };
  },
  validations: {
    form: {
      name_en: {
        required,
        maxLength: maxLength(256)
      },
      name_kh: {
        required,
        maxLength: maxLength(256)
      },
      description: {}
    }
  },
  computed: {
    ...mapState({
      userType: (state) => state.auth.userType
    })
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getProductType(this.id);
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit() {
      let formData = new FormData();
      formData.append("imageLength", this.form.product_type_image.length);
      formData.append("name_en", this.form.name_en);
      formData.append("name_kh", this.form.name_kh);
      formData.append("description", this.form.description);
      for (let i = 0; i < this.form.product_type_image.length; i++) {
        formData.append("images", this.form.product_type_image[i]);
      }
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.update(this.id, formData);
    },
    getProductType(id) {
      Swal.fire({
        title: `${this.$t("LOADING")}`,
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 36000,
        onOpen: () => {
          Swal.showLoading();
          this.$store
            .dispatch(GET_PRODUCT_TYPE_DATA, { id })
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
                for (let i = 0; i < this.form.product_type_image.length; i++) {
                  this.images_path.push(
                    `${Config.ADMIN_IMAGE_URL}${this.form.product_type_image[i].image_path}`
                  );
                }
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
            .dispatch(PUT_PRODUCT_TYPE_DATA, { id, data })
            .then(({ data }) => {
              Swal.close();
              if (data.status === "success" && data.data) {
                Swal.fire({
                  icon: "success",
                  text: `${this.$t("RESPONSE_MESSAGE." + data.data)}`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
                this.$router.push("../../product_type");
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
    cancel() {
      this.$store.commit(SET_IS_CLEAR_PAGINATION, { isClearPagination: false });
      this.$router.push("../../product_type");
    },
    handleImages(files) {
      this.form.product_type_image = files;
    }
  }
};
</script>
