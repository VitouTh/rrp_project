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
                    <h5>{{ $t("PAGE.USER.FORM.FIELDS.PHONE_NUMBER") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="phone_number-input"
                    name="phone_number-input"
                    type="text"
                    v-model="$v.form.phone_number.$model"
                    :state="validateState('phone_number')"
                    aria-describedby="phone_number-live-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="phone_number-live-feedback">
                    <span v-if="!$v.form.phone_number.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.USER.FORM.FIELDS.PASSWORD") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="password-input"
                    name="password-input"
                    type="password"
                    v-model="$v.form.password.$model"
                    :state="validateState('password')"
                    aria-describedby="password-live-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="password-live-feedback">
                    <span v-if="!$v.form.password.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                    <span v-if="!$v.form.password.minLength" class="error">
                      {{
                        $t("PAGE.DEFAULT.FORM.VALIDATION.MIN_LENGTH", {
                          min: 6
                        })
                      }}
                    </span>
                    <span v-if="!$v.form.password.maxLength" class="error">
                      {{
                        $t("PAGE.DEFAULT.FORM.VALIDATION.MAX_LENGTH", {
                          max: 64
                        })
                      }}
                    </span>
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.USER.FORM.FIELDS.CONFIRM_PASSWORD") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="confirm_password-input"
                    name="confirm_password-input"
                    type="password"
                    v-model="$v.form.confirm_password.$model"
                    :state="validateState('confirm_password')"
                    aria-describedby="confirm_password-live-feedback"
                  ></b-form-input>

                  <b-form-invalid-feedback id="confirm_password-live-feedback">
                    <span
                      v-if="!$v.form.confirm_password.required"
                      class="error"
                    >
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                    <span
                      v-if="!$v.form.confirm_password.minLength"
                      class="error"
                    >
                      {{
                        $t("PAGE.DEFAULT.FORM.VALIDATION.MIN_LENGTH", {
                          min: 6
                        })
                      }}
                    </span>
                    <span
                      v-if="!$v.form.confirm_password.maxLength"
                      class="error"
                    >
                      {{
                        $t("PAGE.DEFAULT.FORM.VALIDATION.MAX_LENGTH", {
                          max: 64
                        })
                      }}
                    </span>
                    <span v-if="!$v.form.confirm_password.sameAs" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.INVALID") }}
                    </span>
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.USER.FORM.FIELDS.FACEBOOK") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="facebook-input"
                    name="facebook-input"
                    type="text"
                    v-model="$v.form.facebook.$model"
                    :state="validateState('facebook')"
                  ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.USER.FORM.FIELDS.LOCATION") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="location-input"
                    name="location-input"
                    type="text"
                    v-model="$v.form.location.$model"
                    :state="validateState('location')"
                  ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.SELL.FORM.FIELDS.LOCATION") }}</h5>
                  </label>
                </b-col>
              
                <b-col sm="10">
                  <input ref="autocomplete" id="autocomplete" placeholder="Search" />
                  <br>
                  <br>
                  <gmaps-map :options="mapOptions" @click="addMarker" id="map" @mounted="ready">
        <gmaps-marker
          v-for="(m, i) in markers"
          :key="i"
          :options="m"
          @click="removeMarker(i)"
        />
      </gmaps-map>
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
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import { POST_USER_DATA } from "@/core/services/store/user.module";
import { SET_IS_CLEAR_PAGINATION } from "@/core/services/store/user.module";
import { mapState } from "vuex";

import { gmaps, gmapsMap, gmapsMarker} from "x5-gmaps";

export default {
  mixins: [validationMixin],
  components: {
    // UploadImages
    gmapsMap,
    gmapsMarker,
    
  },
  data() {
    return {
      form: {
        email: "",
        fullname: "",
        user_type_id: 3,
        password: "",
        confirm_password: "",
        phone_number: "",
        facebook: "",
        location: "",
        lat: "", 
        lng: "",
      },
      userTypeData: [],
      mapOptions: {
      center: {lat: 11.5564, lng: 104.9282},
      fullscreenControl: true,
      mapTypeControl: true,
      rotateControl: true,
      scaleControl: true,
      streetViewControl: true,
      zoomControl: true,
    },
    markers: [],
    map: null,
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
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(64)
      },
      confirm_password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(64),
        sameAsPassword: sameAs("password")
      },
      phone_number: {
        required
      },
      facebook:{

      },
      lat:{

      },
      lng:{

      },
      location:{

      }
    }
  },
  computed: {
    ...mapState({
      userType: state => state.auth.userType
    })
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      {
        title: `${this.$t("MENU.CUSTOMER.TITLE")}`,
        route: "../customer"
      },
      { title: `${this.$t("PAGE.DEFAULT.FORM.TITLE")}` }
    ]);
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
      if (
        this.userType === 1 
      ) {
        this.create(this.form);
      }
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
            .dispatch(POST_USER_DATA, { data })
            .then(({ data }) => {
              Swal.close();
              if (data.status === "success" && data.data) {
                Swal.fire({
                  icon: "success",
                  text: `สร้างข้อมูลเรียบร้อยแล้ว`
                });
                this.$router.push("../customer");
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
      this.$router.push("../customer");
    },
    addMarker($event) {
      // Stop last marker from bouncing
      if (this.markers.length)
        this.markers[this.markers.length - 1].animation = null;
      // Add new marker with a bounce
      const position = $event.latLng.toJSON();
      this.markers.push({ position, animation: 1 });
      if(this.markers.length == 2){
        this.removeMarker( this.markers[this.markers.length - 1])
      }
      this.form.lat = position['lat']
      this.form.lng = position['lng']
    },
    removeMarker(index) {
      this.markers.splice(index, 1);
    },

    ready(map) {
      this.map = map;
      gmaps().then((maps) => {
        // Search
        this.places = new maps.places.PlacesService(map);
        this.autocomplete = new maps.places.Autocomplete(
          this.$refs.autocomplete
        );
        this.autocomplete.addListener("place_changed", this.updateMap);
        
      });
    },
    updateMap() {
      const place = this.autocomplete.getPlace();
      // Set end point to selected address
      if (place.geometry) {
        this.map.panTo(place.geometry.location);
      }
      
    },
  }
};
</script>

<style scoped>
#map {
  height: 500px;
  width: 100%;
}
#autocomplete {
  border: 3px solid rgb(255, 0, 0);
  font-size: 18px;
  height: 40px;
  /* left: 20%; */
  /* padding: 0 10px; */
  /* position: absolute; */
  /* top: 5%; */
  width: 30%;
  z-index: 1;
}
</style>
