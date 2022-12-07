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
                    <h5>{{ $t("PAGE.BLOG.FORM.FIELDS.TITLE") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="title-input"
                    name="title-input"
                    type="text"
                    v-model="$v.form.title.$model"
                    :state="validateState('title')"
                    aria-describedby="title-live-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="title-live-feedback">
                    <span v-if="!$v.form.title.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                    <span v-if="!$v.form.title.maxLength" class="error">
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
                    <h5>{{ $t("PAGE.BLOG.FORM.FIELDS.SUBTITLE") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="subtitle-input"
                    name="subtitle-input"
                    type="text"
                    v-model="$v.form.subtitle.$model"
                    :state="validateState('subtitle')"
                    aria-describedby="subtitle-live-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="subtitle-live-feedback">
                    <span v-if="!$v.form.subtitle.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                    <span v-if="!$v.form.subtitle.maxLength" class="error">
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
                    <h5>{{ $t("PAGE.BLOG.FORM.FIELDS.DESCRIPTION") }}</h5>
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
                    <h5>{{ $t("PAGE.BLOG.FORM.FIELDS.IMAGE") }}</h5>
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
  GET_BLOG_DATA,
  PUT_BLOG_DATA
} from "@/core/services/store/blog.module";
import Swal from "sweetalert2";
import { SET_IS_CLEAR_PAGINATION } from "@/core/services/store/blog.module";
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
        blog_image: [],
        title: "",
        subtitle: "",
        description: "",
        imageLength: ""
      },
      images_path: []
    };
  },
  validations: {
    form: {
      title: {
        required,
        maxLength: maxLength(256)
      },
      subtitle: {
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
    this.getBlog(this.id);
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit() {
      let formData = new FormData();
      formData.append("imageLength", this.form.blog_image.length);
      formData.append("title", this.form.title);
      formData.append("subtitle", this.form.subtitle);
      formData.append("description", this.form.description);
      for (let i = 0; i < this.form.blog_image.length; i++) {
        formData.append("images", this.form.blog_image[i]);
      }
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.update(this.id, formData);
    },
    getBlog(id) {
      Swal.fire({
        title: `${this.$t("LOADING")}`,
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 36000,
        onOpen: () => {
          Swal.showLoading();
          this.$store
            .dispatch(GET_BLOG_DATA, { id })
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
                for (let i = 0; i < this.form.blog_image.length; i++) {
                  this.images_path.push(
                    `${Config.ADMIN_IMAGE_URL}${this.form.blog_image[i].image_path}`
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
            .dispatch(PUT_BLOG_DATA, { id, data })
            .then(({ data }) => {
              Swal.close();
              if (data.status === "success" && data.data) {
                Swal.fire({
                  icon: "success",
                  text: `${this.$t("RESPONSE_MESSAGE." + data.data)}`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
                this.$router.push("../../blog");
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
      this.$router.push("../../blog");
    },
    handleImages(files) {
      this.form.blog_image = files;
    }
  }
};
</script>
