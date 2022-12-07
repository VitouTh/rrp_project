<template>
  <b-form @submit.stop.prevent="onSubmit()">
    <b-row class="mb-5">
      <b-col sm="2">
        <label>
          <h5>{{ $t("PAGE.PROFILE.FORM.FIELDS.OLD_PASSWORD") }}</h5>
        </label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          id="old_password-input"
          name="old_password-input"
          type="password"
          v-model="$v.form.old_password.$model"
          :state="validateState('old_password')"
          aria-describedby="old_password-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="old_password-live-feedback">
          <span v-if="!$v.form.old_password.required" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
          </span>
          <span v-if="!$v.form.old_password.minLength" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.MIN_LENGTH", { min: 6 }) }}
          </span>
          <span v-if="!$v.form.old_password.maxLength" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.MAX_LENGTH", { max: 64 }) }}
          </span>
        </b-form-invalid-feedback>
      </b-col>
    </b-row>

    <b-row class="mb-5">
      <b-col sm="2">
        <label>
          <h5>{{ $t("PAGE.PROFILE.FORM.FIELDS.NEW_PASSWORD") }}</h5>
        </label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          id="new_password-input"
          name="new_password-input"
          type="password"
          v-model="$v.form.new_password.$model"
          :state="validateState('new_password')"
          aria-describedby="new_password-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="new_password-live-feedback">
          <span v-if="!$v.form.new_password.required" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
          </span>
          <span v-if="!$v.form.new_password.minLength" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.MIN_LENGTH", { min: 6 }) }}
          </span>
          <span v-if="!$v.form.new_password.maxLength" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.MAX_LENGTH", { max: 64 }) }}
          </span>
        </b-form-invalid-feedback>
      </b-col>
    </b-row>

    <b-row class="mb-5">
      <b-col sm="2">
        <label>
          <h5>{{ $t("PAGE.PROFILE.FORM.FIELDS.CONFIRM_NEW_PASSWORD") }}</h5>
        </label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          id="confirm_new_password-input"
          name="confirm_new_password-input"
          type="password"
          v-model="$v.form.confirm_new_password.$model"
          :state="validateState('confirm_new_password')"
          aria-describedby="confirm_new_password-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="confirm_new_password-live-feedback">
          <span v-if="!$v.form.confirm_new_password.required" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
          </span>
          <span v-if="!$v.form.confirm_new_password.minLength" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.MIN_LENGTH", { min: 6 }) }}
          </span>
          <span v-if="!$v.form.confirm_new_password.maxLength" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.MAX_LENGTH", { max: 64 }) }}
          </span>
          <span v-if="!$v.form.confirm_new_password.sameAs" class="error">
            {{ $t("PAGE.DEFAULT.FORM.VALIDATION.INVALID") }}
          </span>
        </b-form-invalid-feedback>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12">
        <b-button class="float-right" type="reset">{{
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
  minLength,
  sameAs
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import { UPDATE_PROFILE_PASSWORD } from "@/core/services/store/profile.module";

export default {
  name: "ProfilePassword",
  mixins: [validationMixin],
  data() {
    return {
      id: 0,
      form: {
        old_password: "",
        new_password: "",
        confirm_new_password: ""
      }
    };
  },
  validations: {
    form: {
      old_password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(64)
      },
      new_password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(64)
      },
      confirm_new_password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(64),
        sameAsPassword: sameAs("new_password")
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onReset() {
      this.$v.$reset();
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.update(this.form);
    },
    update(data) {
      this.$store
        .dispatch(UPDATE_PROFILE_PASSWORD, { data })
        .then(({ data }) => {
          if (data.status === "success" && data.data) {
            Swal.fire({
              icon: "success",
              text: `${this.$t("RESPONSE_MESSAGE." + data.data)}`,
              confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
            });
            this.form = {
              old_password: "",
              new_password: "",
              confirm_new_password: ""
            };
          } else if (data.status === "error" && data.error) {
            Swal.fire({
              icon: "error",
              text: `${this.$t("RESPONSE_MESSAGE." + data.error)}`,
              confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
            });
          }
          this.$v.$reset();
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
