import ApiService from "@/core/services/api.service";
// action types
export const PAGINATION_PRODUCT_DATA = "paginationProductData";
export const GET_PRODUCT_DATA = "getProductData";
export const POST_PRODUCT_DATA = "postProductData";
export const PUT_PRODUCT_DATA = "putProductData";
export const PUT_PRODUCT_STATUS_DATA = "putProductStatusData";
export const DELETE_PRODUCT_DATA = "deleteProductData";
export const PUT_PRODUCT_BEST_SELLING_DATA = "putProductBestSellingData";
export const LIST_PRODUCT_DATA = "listProductData";
// mutation types
export const SET_PAGINATION = "setPagination";
export const SET_IS_CLEAR_PAGINATION = "setIsClearPagination";
export const CLEAR_PAGINATION = "clearPagination";

export default {
    state: {
        path: "product",
        isClearPagination: true,
        pagination: {
            page: 1,
            perPage: 25,
            orderBy: "id",
            isDesc: true,
            sortDirection: "asc",
            filter: ""
        }
    },
    getters: {},
    actions: {
        [PAGINATION_PRODUCT_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/pagination`, {
                params: payload.params
            });
        },
        [GET_PRODUCT_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/${payload.id}`);
        },
        [POST_PRODUCT_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.post(`${context.state.path}`, payload.data);
        },
        [PUT_PRODUCT_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/${payload.id}`,
                payload.data
            );
        },
        [PUT_PRODUCT_STATUS_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/status/${payload.id}`,
                payload.data
            );
        },
        [PUT_PRODUCT_BEST_SELLING_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/best_selling/${payload.id}`,
                payload.data
            );
        },
        [DELETE_PRODUCT_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.delete(`${context.state.path}/${payload.id}`);
        },
        [LIST_PRODUCT_DATA](context) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}`);
        }
    },
    mutations: {
        [SET_PAGINATION](state, payload) {
            state.pagination = payload.pagination;
        },
        [SET_IS_CLEAR_PAGINATION](state, payload) {
            state.isClearPagination = payload.isClearPagination;
        },
        [CLEAR_PAGINATION](state) {
            state.pagination = {
                page: 1,
                perPage: 25,
                orderBy: "id",
                isDesc: true,
                sortDirection: "asc",
                filter: ""
            };
        }
    }
};