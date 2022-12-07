<template>
  <b-form @submit.stop.prevent="onSubmit">
    <b-row class="mb-5">
      <b-col sm="2">
        <label>
          <h5>{{ $t("PAGE.PROFILE.FORM.FIELDS.EMAIL") }}</h5>
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
          <h5>{{ $t("PAGE.PROFILE.FORM.FIELDS.FULLNAME") }}</h5>
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

    <b-row>
      <b-col sm="12">
        <b-button
          class="float-right"
          @click.prevent="
            $v.$reset();
            get();
          "
        >
          {{ $t("PAGE.DEFAULT.FORM.BTN_CANCEL") }}
        </b-button>
        <b-button type="submit" variant="primary" class="float-right mr-3">{{
          $t("PAGE.DEFAULT.FORM.BTN_SUBMIT")
        }}</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import {
  FIND_PROFILE,
  UPDATE_PROFILE
} from "@/core/services/store/profile.module";
import { SET_CURRENT_USER_DATA } from "@/core/services/store/auth.module";
import Swal from "sweetalert2";

export default {
  name: "ProfileData",
  mixins: [validationMixin],
  data() {
    return {
      id: 0,
      form: {
        email: "",
        fullname: ""
      }
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
      }
    }
  },
  mounted() {
    this.get(this.id);
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
      this.update(this.form);
    },
    get() {
      this.$store
        .dispatch(FIND_PROFILE)
        .then(({ data }) => {
          if (data.status === "success" && data.data) {
            for (const formKey of Object.keys(this.form)) {
              for (const dataKey of Object.keys(data.data)) {
                if (formKey === dataKey) {
                  this.form[formKey] = data.data[formKey];
                }
              }
            }
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
    update(data) {
      this.$store
        .dispatch(UPDATE_PROFILE, { data })
        .then(({ data }) => {
          if (data.status === "success" && data.data) {
            this.$v.$reset();
            Swal.fire({
              icon: "success",
              text: `${this.$t("RESPONSE_MESSAGE.SAVE_DATA_SUCCESS")}`,
              confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
            });
            for (const formKey of Object.keys(this.form)) {
              for (const dataKey of Object.keys(data.data)) {
                if (formKey === dataKey) {
                  this.form[formKey] = data.data[formKey];
                }
              }
            }
            this.$store.commit(SET_CURRENT_USER_DATA, { user: data.data });
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
          Swal.fire({
            icon: "error",
            text: `${error}`,
            confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
          });
        });
    }
  }
};
</script>
