import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
// action types
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const VERIFY = "verify";
export const UPDATE_PASSWORD = "changePassword";
export const FORGOT_PASSWORD = "forgotPassword";
export const NEW_PASSWORD = "newPassword";
// mutation types
export const SET_AUTH_DATA = "setAuthData";
export const SET_CURRENT_USER_DATA = "setCurrentUserData";
export const SET_TOKEN = "setToken";
export const SET_ERROR_MESSAGE = "setErrorMEssage";
export const PURGE_AUTH = "purgeAuth";

export default {
  state: {
    isAuthenticated: !!JwtService.getRefeshToken(),
    currentUserData: {},
    userType: "",
    token: "",
    errorMessage: ""
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isVerify(state) {
      return (
        Object.keys(state.currentUserData).length === 0 &&
        state.userType === "" &&
        state.token === ""
      );
    }
  },
  actions: {
    [LOGIN](context, payload) {
      return ApiService.post("login", payload);
    },
    [LOGOUT]() {
      ApiService.setHeader();
      return ApiService.post("logout");
    },
    [REGISTER](context, payload) {
      return ApiService.post("register", payload);
    },
    [VERIFY](context) {
      return new Promise(resolve => {
        if (context.getters.isVerify) {
          const refreshToken = JwtService.getRefeshToken();
          if (refreshToken) {
            ApiService.post("verify", { refreshToken })
              .then(({ data }) => {
                if (data && data.status === "success" && data.data) {
                  context.commit(SET_AUTH_DATA, data.data);
                  resolve(null);
                } else {
                  context.commit(PURGE_AUTH);
                  resolve(null);
                }
              })
              .catch(() => {
                context.commit(PURGE_AUTH);
                resolve(null);
              });
          } else {
            context.commit(PURGE_AUTH);
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    },
    [UPDATE_PASSWORD](context, payload) {
      ApiService.setHeader();
      return ApiService.post(`change_password`, payload.data);
    },
    [FORGOT_PASSWORD](context, payload) {
      return ApiService.post("forgot_password", payload);
    },
    [NEW_PASSWORD](context, payload) {
      return ApiService.post("new_password", payload);
    }
  },
  mutations: {
    [SET_AUTH_DATA](state, payload) {
      state.errorMessage = "";
      state.isAuthenticated = true;
      state.currentUserData = payload.user;
      state.userType = payload.user.user_type_id;
      state.token = `${payload.accessToken.type} ${payload.accessToken.token}`;
      JwtService.saveRefeshToken(`${payload.accessToken.refreshToken}`);
    },
    [SET_CURRENT_USER_DATA](state, payload) {
      state.currentUserData.fullname = payload.user.fullname;
    },
    [SET_TOKEN](state, payload) {
      state.token = `${payload.accessToken.type} ${payload.accessToken.token}`;
      JwtService.saveRefeshToken(`${payload.accessToken.refreshToken}`);
    },
    [SET_ERROR_MESSAGE](state, payload) {
      state.errorMessage = payload.errorMessage;
    },
    [PURGE_AUTH](state) {
      state.isAuthenticated = false;
      state.currentUserData = {};
      state.userType = "";
      state.token = "";
      state.errorMessage = "";
      JwtService.destroyRefeshToken();
    }
  }
};
