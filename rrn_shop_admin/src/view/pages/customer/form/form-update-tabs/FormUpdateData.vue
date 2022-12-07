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
import Swal from "sweetalert2";
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
      id: 0,
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
      mapOptions: {
      center: {lat: 11.5564, lng: 104.9282},
      fullscreenControl: true,
      mapTypeControl: true,
      rotateControl: true,
      scaleControl: true,
      streetViewControl: true,
      zoomControl: true,
    },
    markers: [{
      position: {
        lat : 0,
        lng: 0
      },
      animation: 0
    }],
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
    this.id = this.$route.params.id;
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
                      this.mapOptions.center.lat = parseFloat(data.data['lat']);
                this.mapOptions.center.lng = parseFloat(data.data['lng']);
                this.markers[0].position['lat'] = this.mapOptions.center.lat
                this.markers[0].position['lng'] = this.mapOptions.center.lng
                this.markers[0].animation = 1
                      this.form[formKey] = data.data[formKey];
                    }
                  }
                }
                this.form["user_type_id"] = 3;
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
                this.$router.push("../../customer");
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
      this.$router.push("../../customer");
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
