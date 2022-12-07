import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "@/core/services/store";
import JwtService from "@/core/services/jwt.service";
import { SET_TOKEN, PURGE_AUTH } from "@/core/services/store/auth.module";
import router from "../../router";

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = "http://localhost:3333/api/v1";
    this.createAxiosResponseInterceptor();
  },

  /**
   * refesh token
   */
  createAxiosResponseInterceptor() {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        const status = error.response ? error.response.status : null;
        // Reject promise if usual error
        if (status !== 401) {
          return Promise.reject(error);
        }

        /**
         * When response code is 401, try to refresh the token.
         * Eject the interceptor so it doesn't loop in case
         * token refresh causes the 401 response
         */
        axios.interceptors.response.eject(interceptor);

        return axios
          .post("/refresh_token", {
            refreshToken: `${JwtService.getRefeshToken()}`
          })
          .then(response => {
            if (
              response &&
              response.status === 200 &&
              response.data &&
              response.data.status === "success"
            ) {
              store.commit(SET_TOKEN, response.data.data);
              error.response.config.headers[
                "Authorization"
              ] = `${response.data.data.accessToken.type} ${response.data.data.accessToken.token}`;
              return axios(error.response.config);
            } else {
              store.commit(PURGE_AUTH);
              router.push("/login");
              return Promise.reject(response);
            }
          })
          .catch(error => {
            store.commit(PURGE_AUTH);
            router.push("/login");
            return Promise.reject(error);
          })
          .finally(this.createAxiosResponseInterceptor());
      }
    );
  },

  /**
   * Set the default HTTP request headers
   */
  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `${store.state.auth.token}`;
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[KT] ApiService ${error}`);
    });
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  getParams(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      // console.log(error);
      throw new Error(`[KT] ApiService ${error}`);
    });
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      // console.log(error);
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;
