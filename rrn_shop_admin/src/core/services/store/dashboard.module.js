import ApiService from "@/core/services/api.service";
// action types
export const CONTENT_VIEW = "contentView";
export const CONTENT_VIEW_CLICK_BANNER = "contentViewClickBanner";

export default {
  state: {
    path_content_view: "content_view",
    path_content_view_click_banner: "content_view_click_banner"
  },
  getters: {},
  actions: {
    [CONTENT_VIEW](context) {
      ApiService.setHeader();
      return ApiService.get(`${context.state.path_content_view}`);
    },

    [CONTENT_VIEW_CLICK_BANNER](context) {
      ApiService.setHeader();
      return ApiService.get(`${context.state.path_content_view_click_banner}`);
    }
  },
  mutations: {}
};
