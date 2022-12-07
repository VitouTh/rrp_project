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
                    <h5>{{ $t("PAGE.SELL.FORM.FIELDS.PRODUCT") }}</h5>
                  </label>
                </b-col>
                <b-col sm="5">
                <selectize 
                v-model="product" 
                class="mb-3 selectize"
                id="selectize_product"
                > 
                
                  <option
                      v-for="(item,index) in productData"
                      :key="index"
                      :value="item.id" 
                    >
                    <template v-if="!item.selected">{{ item.product }} (stock: {{item.stock}})</template>
                    </option>
                  </selectize>

                </b-col>
                <b-col sm="1">
                  <label>
                    <h5>{{ $t("PAGE.SELL.FORM.FIELDS.QUANTITY") }}</h5>
                  </label>
                </b-col>
                <b-col sm="2">
                  <b-form-input
                    id="quantity-input"
                    name="quantity-input"
                    type="number"
                    v-model="quantity"
                  ></b-form-input>

                </b-col>
                <b-col sm="1">
                  <button class="btn btn-small btn-primary" @click.prevent="addProductItem()" v-if="!editStatus">Add</button>
                  <button class="btn btn-small btn-primary" @click.prevent="editProductConfirm()" v-else>Edit</button>
                </b-col>
            </b-row>
            <b-row class="mb-5" v-if="form.productSelect.length > 0">
              <b-col sm="2">

              </b-col>
              <b-col sm="10"><table class="table">
                <thead>
                  <tr><th>Product</th>
                  <th>Quantity</th>
                  <!-- <th>Edit</th> -->
                  <th>Delete</th></tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in form.productSelect" :value="item.id" :key="item">
                    <td>{{item.name}}</td>
                    <td>{{item.quantity}}</td>
                    <!-- <td><a
                    href="javascript:"
                    @click.prevent="
                      updateProductData(item.id, index)
                    "
                    class="btn btn-icon btn-light btn-sm"
                    v-b-tooltip.hover
                    :title="$t('PAGE.DEFAULT.TABLE.FIELDS.ACTION.EDIT')"
                  ><span class="svg-icon svg-icon-md svg-icon-success">
                      <inline-svg
                        src="media/svg/icons/General/Edit.svg"
                      ></inline-svg>
                    </span> </a
                  ></td> -->
                    <td> <a
                    href="javascript:"
                    @click.prevent="removeProductData(item.id, index)"
                    class="btn btn-icon btn-light btn-sm"
                    v-b-tooltip.hover
                    :title="$t('PAGE.DEFAULT.TABLE.FIELDS.ACTION.DELETE.TITLE')"
                  >
                    <span class="svg-icon svg-icon-md svg-icon-danger">
                      <inline-svg
                        src="media/svg/icons/General/Trash.svg"
                      ></inline-svg>
                    </span>
                  </a></td>
                  </tr>
                </tbody>
              </table></b-col>
            </b-row>
           

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.SELL.FORM.FIELDS.CUSTOMER") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  
                  <selectize v-model="$v.form.user_id.$model" 
                    class="mb-3"> 
                    <option
                      v-for="item in userData"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.fullname }}
                    </option>
                  </selectize>
               

                  <b-form-invalid-feedback id="user_id-live-feedback">
                    <span v-if="!$v.form.user_id.required" class="error">
                      {{ $t("PAGE.DEFAULT.FORM.VALIDATION.REQUIRED") }}
                    </span>
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <!-- start date -->
              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.SELL.FORM.FIELDS.DATETIME") }}</h5>
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

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.SELL.FORM.FIELDS.LOCATION") }}</h5>
                  </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="location-input"
                    name="location-input"
                    type="text"
                    v-model="$v.form.location.$model"
                    :state="validateState('location')"
                    aria-describedby="location-live-feedback"
                  ></b-form-input>

                  
                </b-col>
              </b-row>

              <b-row class="mb-5">
                <b-col sm="2">
                  <label>
                    <h5>{{ $t("PAGE.SELL.FORM.FIELDS.DESCRIPTION") }}</h5>
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
import { required, maxLength } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import { POST_SELL_DATA } from "@/core/services/store/sell.module";
import { SET_IS_CLEAR_PAGINATION } from "@/core/services/store/sell.module";
import { mapState } from "vuex";
// import UploadImages from "@/assets/plugins/vue-upload-multiple-images/vue-upload-multiple-images.vue";
import { LIST_PRODUCT_DATA } from "@/core/services/store/product.module";
import { LIST_USER_DATA } from "@/core/services/store/user.module";

import { gmaps, gmapsMap, gmapsMarker} from "x5-gmaps";
import Selectize from 'vue2-selectize'

export default {
  mixins: [validationMixin],
  components: {
    // UploadImages
    gmapsMap,
    gmapsMarker,
     Selectize,
    
  },


  data() {
    return {
      editorConfig: {
        extraPlugins: "emoji"
      },
      form: {
        user_id: "",
        datetime: "",
        location: "",
        description: "",
        imageLength:"",
        lat: "",
        lng:"",
        productSelect:[],
        
      },
      product: "",
      quantity:"",
      userData: [],
      productData: [],
      settings: {},
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
    name:"",
    editStatus: false,
		editIndex: ''
    };
  },
  validations: {
    form: {
      user_id: {
        required,
        maxLength: maxLength(256)
      },
     
      description: {},
      
      location:{
        
      },
      datetime:{

      },
      lat:{

      },
      lng:{

      },
      
      
    },
  },
 
  computed: {
    ...mapState({})
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      {
        title: `${this.$t("MENU.SELL.TITLE")}`,
        route: "../sell"
      },
      { title: `${this.$t("PAGE.DEFAULT.FORM.TITLE")}` }
    ]);
    this.listProduct();
    this.listUser();
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit() {
      let formData = new FormData();
      var total = 0
      for(let i in this.form.productSelect){
        var discount = 0
        if(this.form.productSelect[i].name != "" && this.form.productSelect[i].quantity != ""){
          let index = this.productData.findIndex((obj) => obj.id == this.form.productSelect[i].id);
          if(this.productData[index].discount>0){
            
            discount = parseInt(this.productData[index].discount)*parseFloat(this.productData[index].price)*parseInt(this.form.productSelect[i].quantity)/100
          }
          var price = this.productData[index].price*this.form.productSelect[i].quantity - discount
          this.form.productSelect[i].total = price
          total = total + price
        }
      }
      formData.append("user_id", this.form.user_id);
      formData.append("productSelect", JSON.stringify(this.form.productSelect));
      formData.append("total", total)
      formData.append("datetime", this.form.datetime);
      formData.append("location", this.form.location);
      formData.append("description", this.form.description);
      formData.append("lat", this.form.lat);
      formData.append("lng", this.form.lng);
      
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        Swal.fire({
                  icon: "error",
                  text: `INPUT DATA`,
                  confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
                });
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
            .dispatch(POST_SELL_DATA, { data })
            .then(({ data }) => {
              Swal.close();
              if (data.status === "success" && data.data) {
                Swal.fire({
                  icon: "success",
                  text: `สร้างข้อมูลเรียบร้อยแล้ว`
                });
                this.$router.push("../sell");
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
    listProduct() {
      this.$store
        .dispatch(LIST_PRODUCT_DATA)
        .then(({ data }) => {
          if (data.status === "success" && data.data) {
            for(let i in data.data){
              this.productData.push({
                'id': data.data[i].id,
                'product': data.data[i].name_en,
                'stock': data.data[i].stock,
                'selected': false,
                'discount': data.data[i].discount,
                'price': data.data[i].price
              })
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
    listUser() {
      this.$store
        .dispatch(LIST_USER_DATA)
        .then(({ data }) => {
          console.log(data)
          if (data.status === "success" && data.data) {
            this.userData = data.data;
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
      this.$router.push("../sell");
    },

    handleImages(files) {
      this.form.sell_image = files;
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
    addProductItem(){
      let index = this.productData.findIndex((obj) => obj.id == this.product);
      if(this.product == "" || this.quantity == "" || this.quantity < 1){
        Swal.fire({
            icon: "error",
            text: `Please input data`,
            confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
          });
				return 
      }
      if(this.productData[index].stock <  this.quantity){
        Swal.fire({
            icon: "error",
            text: `Stock is not enough`,
            confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
          });
				return 
			}
    
      this.form.productSelect.push({
        name: this.productData[index].product,
        quantity: this.quantity,
        id: this.product,
        selected: false
      }),
      this.productData[index].selected = true;
      this.product = '';
      this.quantity = '';
      document.getElementById('selectize_product').focus();
    },
    removeProductData(product_id, index){
     let product_index = this.productData.findIndex((obj) => obj.id == product_id);
      this.productData[product_index].selected = false;
      // var select = this.form.productSelect[index]; 
      // console.log(select)
      // console.log(this.form.productSelect)
      this.form.productSelect.splice(index, 1);
      // console.log(this.form.productSelect)
      this.quantity = '';
			this.product = ' ';
      
    },
    updateProductData(product_id, index){
      let product_index = this.productData.findIndex((obj) => obj.id == product_id);
      this.productData[product_index].selected = false,
      this.quantity = this.form.productSelect[index].quantity,
      this.product = this.productData[product_index].id,
      this.editStatus = true,
      this.editIndex = index
    },
    editProductConfirm(){
      let index = this.productData.findIndex((obj) => obj.id == this.product);
      if(this.product == "" || this.quantity == "" || this.quantity < 1){
        Swal.fire({
            icon: "error",
            text: `Please input data`,
            confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
          });
				return 
      }
      if(this.productData[index].stock <  this.quantity){
        Swal.fire({
            icon: "error",
            text: `Stock is not enough`,
            confirmButtonText: `${this.$t("PAGE.DEFAULT.FORM.BTN_OK")}`
          });
				return 
			}
      
      this.form.productSelect[this.editIndex].name = this.productData[index].product;
      this.form.productSelect[this.editIndex].quantity = this.quantity;
      this.productData[index].selected = true;
      this.product = "";
      this.quantity = "";
      this.editStatus = false,
      document.getElementById('selectize_product').focus();
    },
    
  },
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
