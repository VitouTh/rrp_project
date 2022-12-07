import ApiService from "@/core/services/api.service";
// action types
export const FIND_PROFILE = "getProfileData";
export const UPDATE_PROFILE = "putProfileData";
export const UPDATE_PROFILE_PASSWORD = "putProfilePasswordData";

export default {
  state: {
    path: "profile"
  },
  getters: {},
  actions: {
    [FIND_PROFILE](context) {
      ApiService.setHeader();
      return ApiService.getParams(`${context.state.path}`, null);
    },
    [UPDATE_PROFILE](context, payload) {
      ApiService.setHeader();
      return ApiService.put(`${context.state.path}`, payload.data);
    },
    [UPDATE_PROFILE_PASSWORD](context, payload) {
      ApiService.setHeader();
      return ApiService.put(`${context.state.path}/change_password`, payload.data);
    }
  },
  mutations: {}
};
