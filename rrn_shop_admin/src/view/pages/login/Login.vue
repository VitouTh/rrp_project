<template>
  <div class="d-flex flex-column flex-root">
    <div
      class="login login-1 d-flex flex-column flex-lg-row flex-column-fluid bg-white"
      :class="{
        'login-signin-on': this.state == 'signin',
        'login-signup-on': this.state == 'signup',
        'login-forgot-on': this.state == 'forgot',
        'login-update-password-on': this.state == 'update_password'
      }"
      id="kt_login"
    >
      <!--begin::Aside-->
      <div
        class="login-aside d-flex flex-column flex-row-auto"
        style="background-color: #f2c98a"
      >
        <div class="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <a href="#" class="text-center mb-10">
            <img
              src="media/logos/logo-letter-1.png"
              class="max-h-70px"
              alt=""
            />
          </a>
          <h3
            class="font-weight-bolder text-center font-size-h4 font-size-h1-lg"
            style="color: #986923"
          >
            {{ $t("AUTH.TITLE") }}
            <!-- <br />with great build tools -->
          </h3>
        </div>
        <div
          class="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
          :style="{ backgroundImage: `url(${backgroundImage})` }"
        ></div>
      </div>
      <!--end::Aside-->

      <!--begin::Content-->
      <div
        class="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto"
      >
        <div class="d-flex flex-column-fluid flex-center">
          <!--begin::Signin-->
          <div class="login-form login-signin">
            <form
              class="form"
              novalidate="novalidate"
              id="kt_login_signin_form"
              @submit.stop.prevent="onSubmitLogin()"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  {{ $t("AUTH.LOGIN.TITLE") }}
                </h3>
                <!--span class="text-muted font-weight-bold font-size-h4"
                  >{{ $t("AUTH.REGISTER.NEW_USER") }}
                  <a
                    id="kt_login_signup"
                    class="text-primary font-weight-bolder pointer"
                    @click="showForm('signup')"
                    >{{ $t("AUTH.REGISTER.CREATE_ACCOUNT") }}</a
                  ></span
                -->
              </div>
              <div class="pb-13 pt-lg-0 pt-5" v-if="message">
                <span class="font-weight-bolder font-size-h4 text-success">
                  {{ message }}
                </span>
              </div>
              <div class="pb-13 pt-lg-0 pt-5" v-if="errorMessage">
                <span class="font-weight-bolder font-size-h4 text-danger">
                  {{ errorMessage }}
                </span>
              </div>
              <div class="form-group">
                <label class="font-size-h6 font-weight-bolder text-dark">{{
                  $t("AUTH.INPUT.EMAIL")
                }}</label>
                <div
                  id="example-input-group-1"
                  label=""
                  label-for="example-input-1"
                >
                  <input
                    class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                    type="text"
                    name="email"
                    ref="email"
                    v-model="form.email"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="d-flex justify-content-between mt-n5">
                  <label
                    class="font-size-h6 font-weight-bolder text-dark pt-5"
                    >{{ $t("AUTH.INPUT.PASSWORD") }}</label
                  >
                  <a
                    class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5 pointer"
                    id="kt_login_forgot"
                    @click="showForm('forgot')"
                    >{{ $t("AUTH.FORGOT.TITLE") }}</a
                  >
                </div>
                <div
                  id="example-input-group-2"
                  label=""
                  label-for="example-input-2"
                >
                  <input
                    class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                    type="password"
                    name="password"
                    ref="password"
                    v-model="form.password"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="pb-lg-0 pb-5">
                <button
                  ref="kt_login_signin_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-15 py-4 my-3 mr-3"
                >
                  {{ $t("AUTH.INPUT.SUBMIT") }}
                </button>
                <!-- <button
                  type="button"
                  class="btn btn-light-primary font-weight-bolder px-8 py-4 my-3 font-size-lg"
                >
                  <span class="svg-icon svg-icon-md">
                    <inline-svg
                      src="media/svg/social-icons/google.svg"
                    /> </span
                  >Sign in with Google
                </button> -->
              </div>
            </form>
          </div>
          <!--end::Signin-->

          <!--begin::Signup-->
          <div class="login-form login-signup">
            <form
              class="form"
              novalidate="novalidate"
              id="kt_login_signup_form"
              @submit.stop.prevent="onSubmitRegister()"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  {{ $t("AUTH.REGISTER.TITLE") }}
                </h3>
                <p class="text-muted font-weight-bold font-size-h4">
                  {{ $t("AUTH.REGISTER.DESC") }}
                </p>
              </div>
              <div class="pb-13 pt-lg-0 pt-5" v-if="errorMessage">
                <span class="font-weight-bolder font-size-h4 text-danger">
                  {{ errorMessage }}
                </span>
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="text"
                  :placeholder="$t('AUTH.INPUT.FULLNAME')"
                  name="fullname"
                  ref="fullname"
                  v-model="form.fullname"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="email"
                  :placeholder="$t('AUTH.INPUT.EMAIL')"
                  name="email"
                  ref="remail"
                  v-model="form.remail"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="password"
                  :placeholder="$t('AUTH.INPUT.PASSWORD')"
                  name="password"
                  ref="rpassword"
                  v-model="form.rpassword"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="password"
                  :placeholder="$t('AUTH.INPUT.CONFIRM_PASSWORD')"
                  name="cpassword"
                  ref="cpassword"
                  v-model="form.cpassword"
                  autocomplete="off"
                />
              </div>
              <div class="form-group d-flex flex-wrap pb-lg-0 pb-3">
                <button
                  ref="kt_login_signup_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                  style="width: 150px"
                >
                  {{ $t("AUTH.INPUT.SUBMIT") }}
                </button>
                <button
                  type="button"
                  id="kt_login_signup_cancel"
                  class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  @click="showForm('signin')"
                >
                  {{ $t("AUTH.INPUT.CANCEL") }}
                </button>
              </div>
            </form>
          </div>
          <!--end::Signup-->

          <!--begin::Forgot-->
          <div class="login-form login-forgot">
            <!--begin::Form-->
            <form
              class="form"
              novalidate="novalidate"
              id="kt_login_forgot_form"
              ref="kt_login_forgot_form"
              @submit.stop.prevent="onSubmitForgotPassword()"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  {{ $t("AUTH.FORGOT.TITLE") }}
                </h3>
                <p class="text-muted font-weight-bold font-size-h4">
                  {{ $t("AUTH.FORGOT.DESC") }}
                </p>
              </div>
              <div class="pb-13 pt-lg-0 pt-5" v-if="errorMessage">
                <span class="font-weight-bolder font-size-h4 text-danger">
                  {{ errorMessage }}
                </span>
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="email"
                  :placeholder="$t('AUTH.INPUT.EMAIL')"
                  name="email"
                  autocomplete="off"
                  ref="femail"
                  v-model="form.femail"
                />
              </div>
              <div class="form-group d-flex flex-wrap pb-lg-0">
                <button
                  ref="kt_login_forgot_submit"
                  id="kt_login_forgot_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                >
                  {{ $t("AUTH.INPUT.SUBMIT") }}
                </button>
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  @click="showForm('signin')"
                >
                  {{ $t("AUTH.INPUT.CANCEL") }}
                </button>
              </div>
            </form>
          </div>
          <!--end::Forgot-->

          <!--begin::Update password-->
          <div class="login-form login-update-password">
            <form
              class="form"
              novalidate="novalidate"
              id="kt_login_update_password_form"
              @submit.stop.prevent="onSubmitUpdatePassword()"
            >
              <div class="pb-5 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  {{ $t("AUTH.UPDATE_PASSWORD.TITLE") }}
                </h3>
                <p class="text-muted font-weight-bold font-size-h4">
                  {{ $t("AUTH.UPDATE_PASSWORD.DESC") }}
                </p>
                <p
                  class="text-danger font-weight-bold font-size-h4"
                  v-if="codeTime > 0"
                >
                  {{
                    $t("AUTH.UPDATE_PASSWORD.TIME_ALEAT", { second: codeTime })
                  }}
                </p>
                <p
                  class="text-danger font-weight-bold font-size-h4"
                  v-if="codeTime < 1"
                >
                  {{ $t("AUTH.UPDATE_PASSWORD.TIMEOUT") }}
                </p>
              </div>
              <div class="pb-13 pt-lg-0 pt-5" v-if="errorMessage">
                <span class="font-weight-bolder font-size-h4 text-danger">
                  {{ errorMessage }}
                </span>
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="text"
                  :placeholder="$t('AUTH.INPUT.CODE')"
                  name="code"
                  ref="code"
                  v-model="form.code"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="password"
                  :placeholder="$t('AUTH.INPUT.NEW_PASSWORD')"
                  name="new_password"
                  ref="new_password"
                  v-model="form.new_password"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="password"
                  :placeholder="$t('AUTH.INPUT.CONFIRM_NEW_PASSWORD')"
                  name="confirm_new_password"
                  ref="confirm_new_password"
                  v-model="form.confirm_new_password"
                  autocomplete="off"
                />
              </div>
              <div class="form-group d-flex flex-wrap pb-lg-0 pb-3">
                <button
                  ref="kt_login_update_password_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                  style="width: 150px"
                >
                  {{ $t("AUTH.INPUT.SUBMIT") }}
                </button>
                <button
                  type="button"
                  id="kt_login_update_password_cancel"
                  class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  @click="showForm('forgot')"
                >
                  {{ $t("AUTH.INPUT.CANCEL") }}
                </button>
              </div>
            </form>
          </div>
          <!--end::Update password-->
        </div>

        <!--begin::Content footer-->
        <!-- <div
          class="d-flex justify-content-lg-start justify-content-center align-items-end py-7 py-lg-0"
        >
          <a href="#" class="text-primary font-weight-bolder font-size-h5"
            >Terms</a
          >
          <a href="#" class="text-primary ml-10 font-weight-bolder font-size-h5"
            >Plans</a
          >
          <a href="#" class="text-primary ml-10 font-weight-bolder font-size-h5"
            >Contact Us</a
          >
        </div> -->
        <!--end::Content footer-->
      </div>
      <!--end::Content-->
    </div>
  </div>
</template>

<!-- Load login custom page styles -->
<style lang="scss">
@import "@/assets/sass/pages/login/login-1.scss";
.pointer {
  cursor: pointer;
}
</style>

<script>
import formValidation from "@/assets/plugins/formvalidation/dist/es6/core/Core";

// FormValidation plugins
import Trigger from "@/assets/plugins/formvalidation/dist/es6/plugins/Trigger";
import Bootstrap from "@/assets/plugins/formvalidation/dist/es6/plugins/Bootstrap";
import SubmitButton from "@/assets/plugins/formvalidation/dist/es6/plugins/SubmitButton";

import KTUtil from "@/assets/js/components/util";
import { mapGetters } from "vuex";
import {
  LOGIN,
  REGISTER,
  SET_AUTH_DATA,
  SET_ERROR_MESSAGE,
  PURGE_AUTH,
  FORGOT_PASSWORD,
  NEW_PASSWORD
} from "@/core/services/store/auth.module";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      state: "signin",
      form: {
        email: "",
        password: "",
        femail: "",
        code: "",
        new_password: "",
        confirm_new_password: "",
        fullname: "",
        remail: "",
        rpassword: "",
        cpassword: ""
      },
      isLoading: false,
      codeTime: 0,
      message: "",
      errorMessage: ""
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    backgroundImage() {
      return (
        process.env.BASE_URL + "media/svg/illustrations/login-visual-1.svg"
      );
    }
  },
  mounted() {
    const signin_form = KTUtil.getById("kt_login_signin_form");
    const signup_form = KTUtil.getById("kt_login_signup_form");
    const forgot_form = KTUtil.getById("kt_login_forgot_form");
    const update_password_form = KTUtil.getById(
      "kt_login_update_password_form"
    );
    this.fv = formValidation(signin_form, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: `${this.$t("AUTH.VALIDATION.REQUIRED")}`
            },
            emailAddress: {
              message: `${this.$t("AUTH.VALIDATION.INVALID_FIELD")}`
            },
            stringLength: {
              max: 254,
              message: `${this.$t("AUTH.VALIDATION.MAX_LENGTH", {
                max: "254"
              })}`
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: `${this.$t("AUTH.VALIDATION.REQUIRED")}`
            },
            stringLength: {
              min: 6,
              max: 67,
              message: `${this.$t("AUTH.VALIDATION.MIN_MAX_LENGTH", {
                min: "6",
                max: "254"
              })}`
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });
    this.fv1 = formValidation(signup_form, {
      fields: {
        fullname: {
          validators: {
            notEmpty: {
              message: this.$t("AUTH.VALIDATION.REQUIRED")
            }
          }
        },
        email: {
          validators: {
            notEmpty: {
              message: this.$t("AUTH.VALIDATION.REQUIRED")
            },
            emailAddress: {
              message: this.$t("AUTH.VALIDATION.INVALID_FIELD")
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: this.$t("AUTH.VALIDATION.REQUIRED")
            }
          }
        },
        cpassword: {
          validators: {
            notEmpty: {
              message: this.$t("AUTH.VALIDATION.REQUIRED")
            },
            identical: {
              compare: function() {
                return signup_form.querySelector('[name="password"]').value;
              },
              message: `${this.$t("AUTH.VALIDATION.INVALID_FIELD")}`
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });
    this.fv2 = formValidation(forgot_form, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: `${this.$t("AUTH.VALIDATION.REQUIRED")}`
            },
            emailAddress: {
              message: `${this.$t("AUTH.VALIDATION.INVALID_FIELD")}`
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });
    this.fv3 = formValidation(update_password_form, {
      fields: {
        code: {
          validators: {
            notEmpty: {
              message: `${this.$t("AUTH.VALIDATION.REQUIRED")}`
            },
            stringLength: {
              max: 6,
              message: `${this.$t("AUTH.VALIDATION.MAX_LENGTH", { max: "6" })}`
            }
          }
        },
        new_password: {
          validators: {
            notEmpty: {
              message: `${this.$t("AUTH.VALIDATION.REQUIRED")}`
            },
            stringLength: {
              min: 6,
              max: 67,
              message: `${this.$t("AUTH.VALIDATION.MIN_MAX_LENGTH", {
                min: "6",
                max: "254"
              })}`
            }
          }
        },
        confirm_new_password: {
          validators: {
            notEmpty: {
              message: `${this.$t("AUTH.VALIDATION.REQUIRED")}`
            },
            identical: {
              compare: function() {
                return update_password_form.querySelector(
                  `[name="new_password"]`
                ).value;
              },
              message: `${this.$t("AUTH.VALIDATION.INVALID_FIELD")}`
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });
  },
  methods: {
    showForm(form) {
      this.message = "";
      this.errorMessage = "";
      this.state = form;
      var form_name = "kt_login_" + form + "_form";
      KTUtil.animateClass(
        KTUtil.getById(form_name),
        "animate__animated animate__backInUp"
      );
      this.fv.resetForm();
      this.fv1.resetForm();
      this.fv2.resetForm();
      this.fv3.resetForm();
      this.form.email = "";
      this.form.password = "";
      this.form.femail = "";
      this.form.code = "";
      this.form.new_password = "";
      this.form.confirm_new_password = "";
      this.form.fullname = "";
      this.form.remail = "";
      this.form.rpassword = "";
      this.form.cpassword = "";
    },
    onSubmitLogin() {
      this.message = "";
      this.errorMessage = "";
      this.fv.validate();
      this.fv.on("core.form.valid", () => {
        if (!this.isLoading) {
          this.isLoading = true;
          // get form value
          var email = this.form.email;
          var password = this.form.password;
          // clear existing errors
          this.$store.commit(PURGE_AUTH);
          // set spinner to submit button
          const submitButton = this.$refs["kt_login_signin_submit"];
          submitButton.classList.add(
            "spinner",
            "spinner-light",
            "spinner-right"
          );
          this.$store.commit(SET_ERROR_MESSAGE, "");
          this.$store
            .dispatch(LOGIN, { email, password })
            .then(({ data }) => {
              this.isLoading = false;
              submitButton.classList.remove(
                "spinner",
                "spinner-light",
                "spinner-right"
              );
              if (data && data.status === "success" && data.data) {
                this.$store.commit(SET_AUTH_DATA, data.data);
                this.$router.push("/");
              } else if (data.status === "error" && data.error) {
                this.errorMessage = `${this.$t(
                  "RESPONSE_MESSAGE." + data.error
                )}`;
              }
            })
            .catch(error => {
              this.isLoading = false;
              submitButton.classList.remove(
                "spinner",
                "spinner-light",
                "spinner-right"
              );
              this.errorMessage = `${this.$t(
                "RESPONSE_MESSAGE." + error.error
              )}`;
            });
        }
      });
    },
    onSubmitRegister() {
      this.errorMessage = "";
      this.fv1.validate();
      this.fv1.on("core.form.valid", () => {
        if (!this.isLoading) {
          this.isLoading = true;
          // get form value
          const fullname = this.$refs.fullname.value;
          const email = this.$refs.remail.value;
          const password = this.$refs.rpassword.value;
          // set spinner to submit button
          const submitButton = this.$refs["kt_login_signup_submit"];
          submitButton.classList.add(
            "spinner",
            "spinner-light",
            "spinner-right"
          );
          // send request
          this.$store
            .dispatch(REGISTER, { fullname, email, password })
            .then(({ data }) => {
              this.isLoading = false;
              submitButton.classList.remove(
                "spinner",
                "spinner-light",
                "spinner-right"
              );
              if (data && data.status === "success" && data.data) {
                Swal.fire({
                  title: "",
                  icon: "success",
                  text: `${this.$t("RESPONSE_MESSAGE.SAVE_DATA_SUCCESS")}`
                });

                this.$store.commit(SET_AUTH_DATA, data.data);
                this.$router.push("/");
              } else if (data.status === "error" && data.error) {
                this.isLoading = false;
                this.errorMessage = `${this.$t(
                  "RESPONSE_MESSAGE." + data.error
                )}`;
              }
            })
            .catch(error => {
              this.isLoading = false;
              submitButton.classList.remove(
                "spinner",
                "spinner-light",
                "spinner-right"
              );
              this.errorMessage = `${this.$t(
                "RESPONSE_MESSAGE." + error.error
              )}`;
            });
        }
      });
    },
    onSubmitForgotPassword() {
      this.errorMessage = "";
      this.fv2.validate();
      this.fv2.on("core.form.valid", () => {
        if (!this.isLoading) {
          this.isLoading = true;
          // get form value
          const email = this.$refs.femail.value;
          // set spinner to submit button
          const submitButton = this.$refs["kt_login_forgot_submit"];
          submitButton.classList.add(
            "spinner",
            "spinner-light",
            "spinner-right"
          );
          // send request
          this.$store
            .dispatch(FORGOT_PASSWORD, { email })
            .then(({ data }) => {
              this.isLoading = false;
              submitButton.classList.remove(
                "spinner",
                "spinner-light",
                "spinner-right"
              );
              if (data && data.status === "success" && data.data) {
                this.countdownCodeNewPassword();
                this.showForm("update_password");
              } else if (data.status === "error" && data.error) {
                this.isLoading = false;
                this.errorMessage = `${this.$t(
                  "RESPONSE_MESSAGE." + data.error
                )}`;
              }
            })
            .catch(error => {
              this.isLoading = false;
              submitButton.classList.remove(
                "spinner",
                "spinner-light",
                "spinner-right"
              );
              this.errorMessage = `${this.$t(
                "RESPONSE_MESSAGE." + error.error
              )}`;
            });
        }
      });
    },
    onSubmitUpdatePassword() {
      this.errorMessage = "";
      this.fv3.validate();
      this.fv3.on("core.form.valid", () => {
        if (!this.isLoading) {
          this.isLoading = true;
          // get form value
          const code = this.$refs.code.value;
          const new_password = this.$refs.new_password.value;
          // set spinner to submit button
          const submitButton = this.$refs["kt_login_update_password_submit"];
          submitButton.classList.add(
            "spinner",
            "spinner-light",
            "spinner-right"
          );
          // send request
          this.$store
            .dispatch(NEW_PASSWORD, {
              code,
              new_password
            })
            .then(({ data }) => {
              this.isLoading = false;
              submitButton.classList.remove(
                "spinner",
                "spinner-light",
                "spinner-right"
              );
              if (data && data.status === "success" && data.data) {
                this.showForm("signin");
                this.message = `${this.$t("RESPONSE_MESSAGE." + data.data)}`;
              } else if (data.status === "error" && data.error) {
                this.isLoading = false;
                this.errorMessage = `${this.$t(
                  "RESPONSE_MESSAGE." + data.error
                )}`;
              }
            })
            .catch(error => {
              this.isLoading = false;
              submitButton.classList.remove(
                "spinner",
                "spinner-light",
                "spinner-right"
              );
              this.errorMessage = `${this.$t(
                "RESPONSE_MESSAGE." + error.error
              )}`;
            });
        }
      });
    },
    countdownCodeNewPassword() {
      this.codeTime = 360;
      const myVar = setInterval(() => {
        this.codeTime--;
        if (this.codeTime == 0) {
          clearInterval(myVar);
        }
      }, 1000);
    }
  }
};
</script>
