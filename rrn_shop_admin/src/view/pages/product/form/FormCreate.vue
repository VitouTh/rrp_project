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
                    <h5>{{ $t("PAGE.PRODUCT.FORM.FIELDS.NAME_EN") }}</h5>
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
                    <h5>{{ $t("PAGE.PRODUCT.FORM.FIELDS.NAME_KH") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="name_kh-input"
                    name="name_kh-input"
                    type="text"
                    v-model="$v.form.name_kh.$model"
                    :state="validateState('name_kh')"
                    aria-describedby="name_kh-live-feedback"
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
                    <h5>{{ $t("PAGE.PRODUCT.FORM.FIELDS.PRODUCT_TYPE") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-select
                    v-model="$v.form.product_type_id.$model"
                    class="mb-3"
                    disabled-field="notEnabled"
                    :state="validateState('product_type_id')"
                    aria-describedby="product_type_id-live-feedback"
                  >
                    <option
                      v-for="item in productTypeData"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.name_en }}
                    </option>
                  </b-form-select>

                  <b-form-invalid-feedback id="product_type_id-live-feedback">
                    <span v-if="!$v.form.product_type_id.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.PRODUCT.FORM.FIELDS.SUB_NAME") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="sub_name-input"
                    name="sub_name-input"
                    type="text"
                    v-model="$v.form.sub_name.$model"
                    :state="validateState('sub_name')"
                    aria-describedby="sub_name-live-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="sub_name-live-feedback">
                    <span v-if="!$v.form.sub_name.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                    <span v-if="!$v.form.sub_name.maxLength" class="error">
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
                    <h5>{{ $t("PAGE.PRODUCT.FORM.FIELDS.PRICE") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="price-input"
                    name="price-input"
                    type="number"
                    v-model="$v.form.price.$model"
                    :state="validateState('price')"
                    aria-describedby="price-live-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="price-live-feedback">
                    <span v-if="!$v.form.price.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                    <span v-if="!$v.form.price.maxLength" class="error">
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
                    <h5>{{ $t("PAGE.PRODUCT.FORM.FIELDS.DISCOUNT") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="discount-input"
                    name="discount-input"
                    type="number"
                    v-model="$v.form.discount.$model"
                    :state="validateState('discount')"
                    aria-describedby="discount-live-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="discount-live-feedback">
                    <span v-if="!$v.form.discount.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                    <span v-if="!$v.form.discount.maxLength" class="error">
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
                    <h5>{{ $t("PAGE.PRODUCT.FORM.FIELDS.STOCK") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="stock-input"
                    name="stock-input"
                    type="number"
                    v-model="$v.form.stock.$model"
                    :state="validateState('stock')"
                    aria-describedby="stock-live-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="stock-live-feedback">
                    <span v-if="!$v.form.stock.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                    <span v-if="!$v.form.stock.maxLength" class="error">
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
                    <h5>{{ $t("PAGE.PRODUCT.FORM.FIELDS.DESCRIPTION") }}</h5>
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
                    <h5>{{ $t("PAGE.PRODUCT.FORM.FIELDS.IMAGE") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <UploadImages
                    @change="handleImages"
                    :max="15"
                    uploadMsg="upload images"
                    fileError="images files only accepted"
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
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { validationMixin } from "vuelidate";
import { required, maxLength,between } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import { POST_PRODUCT_DATA } from "@/core/services/store/product.module";
import { SET_IS_CLEAR_PAGINATION } from "@/core/services/store/product.module";
import { mapState } from "vuex";
import UploadImages from "@/assets/plugins/vue-upload-multiple-images/vue-upload-multiple-images.vue";
import { LIST_PRODUCT_TYPE_DATA } from "@/core/services/store/productType.module";

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
      form: {
        name_en: "",
        name_kh: "",
        description: "",
        sub_name: "",
        price: "",
        stock: "",
        discount: "",
        product_type_id: "",
        imageLength:"",
        product_image: []
      },
      productTypeData: []
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
      description: {},
      sub_name: {},
      price: {
        required,
        maxLength: maxLength(10)
      },
      discount: {
        between: between(0,100)
      },
      product_type_id:{
        required
      },
      stock:{
        required
      }
    }
  },
  computed: {
    ...mapState({})
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      {
        title: `${this.$t("MENU.PRODUCT.TITLE")}`,
        route: "../product"
      },
      { title: `${this.$t("PAGE.DEFAULT.FORM.TITLE")}` }
    ]);
    this.listProductType();
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit() {

      let formData = new FormData();
      formData.append("imageLength", this.form.product_image.length);
      formData.append("name_en", this.form.name_en);
      formData.append("name_kh", this.form.name_kh);
      formData.append("sub_name", this.form.sub_name);
      formData.append("description", this.form.description);
      formData.append("product_type_id", this.form.product_type_id);
      formData.append("stock", this.form.stock);
      formData.append("discount", this.form.discount);
      formData.append("price", this.form.price);
      for (let i = 0; i < this.form.product_image.length; i++) {
        formData.append("images", this.form.product_image[i]);
      }
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.create(formData);
    },
    create(data) {
      Swal.fire({
        title: `${this.$t("LOADING")}`,
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 36000,
        onOpen: () => {
          Swal.showLoading();
          this.$store
            .dispatch(POST_PRODUCT_DATA, { data })
            .then(({ data }) => {
              Swal.close();
              if (data.status === "success" && data.data) {
                Swal.fire({
                  icon: "success",
                  text: `สร้างข้อมูลเรียบร้อยแล้ว`
                });
                this.$router.push("../product");
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
    listProductType() {
      this.$store
        .dispatch(LIST_PRODUCT_TYPE_DATA)
        .then(({ data }) => {
          if (data.status === "success" && data.data) {
            console.log(data.data)
            this.productTypeData = data.data;
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
      this.$router.push("../product");
    },

    handleImages(files) {
      this.form.product_image = files;
    }
  }
};
</script>
