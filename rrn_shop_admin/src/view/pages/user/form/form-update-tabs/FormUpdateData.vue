<template>
  <b-form @submit.stop.prevent="onSubmit">
    <b-row class="mb-5">
      <b-col sm="2">
        <label>
          <h5>{{ $t("PAGE.USER.FORM.FIELDS.EMAIL") }}</h5>
        </label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          id="email-input"
          name="email-input"
          type="email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          :disabled="true"
          aria-describedby="email-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="email-live-feedback">
          <span v-if="!$v.form.email.required" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
          </span>
          <span v-if="!$v.form.email.maxLength" class="error">
            {{
              $t("PAGE.DEFAULT.FORM.VALIDATION.MAX_LENGTH", {
                max: 254
              })
            }}
          </span>
          <span v-if="!$v.form.email.email" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.INVALID") }}
          </span>
        </b-form-invalid-feedback>
      </b-col>
    </b-row>

    <b-row class="mb-5">
      <b-col sm="2">
        <label>
          <h5>{{ $t("PAGE.USER.FORM.FIELDS.FULLNAME") }}</h5>
        </label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          id="fullname-input"
          name="fullname-input"
          type="text"
          v-model="$v.form.fullname.$model"
          :state="validateState('fullname')"
          aria-describedby="fullname-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="fullname-live-feedback">
          <span v-if="!$v.form.fullname.required" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
          </span>
          <span v-if="!$v.form.fullname.maxLength" class="error">
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
          <h5>{{ $t("PAGE.USER.FORM.FIELDS.USER_TYPE") }}</h5>
        </label>
      </b-col>
      <b-col sm="10">
        <b-form-select
          v-model="$v.form.user_type_id.$model"
          class="mb-3"
          disabled-field="notEnabled"
          :disabled="true"
          :state="validateState('user_type_id')"
          aria-describedby="user_type_id-live-feedback"
        >
          <option v-for="item in userTypeData" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </b-form-select>

        <b-form-invalid-feedback id="user_type_id-live-feedback">
          <span v-if="!$v.form.user_type_id.required" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
          </span>
        </b-form-invalid-feedback>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12">
        <b-button class="float-right" @click.prevent="cancel()">{{
          $t("PAGE.DEFAULT.FORM.BTN_CANCEL")
        }}</b-button>
        <b-button type="submit" variant="primary" class="float-right mr-3">{{
          $t("PAGE.DEFAULT.FORM.BTN_SUBMIT")
        }}</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import {
  GET_USER_DATA,
  PUT_USER_DATA
} from "@/core/services/store/user.module";
import { LIST_USER_TYPE_DATA } from "@/core/services/store/userType.module";
import Swal from "sweetalert2";
import { SET_IS_CLEAR_PAGINATION } from "@/core/services/store/user.module";
import { mapState } from "vuex";

export default {
  mixins: [validationMixin],
  data() {
    return {
      id: 0,
      form: {
        email: "",
        fullname: "",
        user_type_id: null,
      },
      userTypeData: []
    };
  },
  validations: {
    form: {
      email: {
        required,
        maxLength: maxLength(245),
        email
      },
      fullname: {
        required,
        maxLength: maxLength(256)
      },
      user_type_id: {
        required
      },
    }
  },
  computed: {
    ...mapState({
      userType: state => state.auth.userType
    })
  },
  mounted() {
    this.id = this.$route.params.id;
    this.listUserType();
    this.getUser(this.id);
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.update(this.id, this.form);
    },
    listUserType() {
      this.$store
        .dispatch(LIST_USER_TYPE_DATA)
        .then(({ data }) => {
          if (data.status === "success" && data.data) {
            this.userTypeData = data.data;
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
          this.isBusy = false;
        });
    },
    getUser(id) {
      Swal.fire({
        title: `${this.$t("LOADING")}`,
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 36000,
        onOpen: () => {
          Swal.showLoading();
          this.$store
            .dispatch(GET_USER_DATA, { id })
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
                this.form["user_type_id"] = data.data.user_user_type["user_type_id"];
              } else if (data.status === "error" && data.error) {
                Swal.fire({
                  icon: "error",
                  text: `${this.$t("RESPONSE_MESSAGE." + data.error)}`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
              }
            })
            .catch(error => {
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
            .dispatch(PUT_USER_DATA, { id, data })
            .then(({ data }) => {
              Swal.close();
              if (data.status === "success" && data.data) {
                Swal.fire({
                  icon: "success",
                  text: `${this.$t("RESPONSE_MESSAGE." + data.data)}`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
                this.$router.push("../../user");
              } else if (data.status === "error" && data.error) {
                this.$v.$reset();
                Swal.fire({
                  icon: "error",
                  text: `${this.$t("RESPONSE_MESSAGE." + data.error)}`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
              }
            })
            .catch(error => {
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
      this.$router.push("../../user");
    }
  }
};
</script>
