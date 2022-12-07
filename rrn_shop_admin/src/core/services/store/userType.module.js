import ApiService from "@/core/services/api.service";
// action types
export const LIST_USER_TYPE_DATA = "listUserTypeData";

export default {
  state: {
    path: "user_type"
  },
  getters: {},
  actions: {
    [LIST_USER_TYPE_DATA](context) {
      ApiService.setHeader();
      return ApiService.getParams(`${context.state.path}`);
    }
  },
  mutations: {}
};
