import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
import ApiService from "@/core/services/api.service";
// import MockService from "@/core/mock/mock.service";
import {
    VERIFY
} from "@/core/services/store/auth.module";
import {
    RESET_LAYOUT_CONFIG
} from "@/core/services/store/config.module";

Vue.config.productionTip = false;

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import ClipboardJS from "clipboard";
window.ClipboardJS = ClipboardJS;

// Vue 3rd party plugins
import i18n from "@/core/plugins/vue-i18n";
import vuetify from "@/core/plugins/vuetify";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/metronic";
import "@/core/plugins/treeselect";
import "@mdi/font/css/materialdesignicons.css";
import "@/core/plugins/vuelidate";
import "@/core/plugins/vue-js-toggle";
import VueCkeditor from 'ckeditor4-vue';


// ckeditor
Vue.use(VueCkeditor);

//mutli-select
import multiSelect from "vue-weblineindia-multiselect";
import "vue-weblineindia-multiselect/lib/vue-select.css";

Vue.component("v-multiselect", multiSelect);

// import * as VueGoogleMaps from 'vue2-google-maps'
import x5GMaps from 'x5-gmaps'
Vue.use(x5GMaps, { key: 'AIzaSyDK0FyyoMnX4qqdIYB1mwpuFlcIpyLIoX8', libraries: ['places', 'geometry', 'formatted_address', 'address_components'] })

// Vue.use(VueGoogleMaps, {
//     load: {
//         key: 'AIzaSyDK0FyyoMnX4qqdIYB1mwpuFlcIpyLIoX8',
//         libraries: ['places', 'geometry', 'formatted_address', 'address_components'],
//     },
//     installComponents: true,
// });

//date-picker
import DatePicker from 'vue2-datepicker';
import "vue2-datepicker/index.css";
Vue.use(DatePicker);
// API service init
ApiService.init();

// Remove this to disable mock API
// MockService.init();

router.beforeEach(async(to, from, next) => {
    // Ensure we checked auth before each page load.
    await Promise.all([store.dispatch(VERIFY)]).then(next);
    // next();

    // reset config to initial state
    store.dispatch(RESET_LAYOUT_CONFIG);

    // Scroll page to top on every route change
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});


new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
}).$mount("#app");