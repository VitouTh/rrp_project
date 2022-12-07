import ApiService from "@/core/services/api.service";
// action types
export const PAGINATION_PRODUCT_TYPE_DATA = "paginationProductTypeData";
export const GET_PRODUCT_TYPE_DATA = "getProductTypeData";
export const POST_PRODUCT_TYPE_DATA = "postProductTypeData";
export const PUT_PRODUCT_TYPE_DATA = "putProductTypeData";
export const PUT_PRODUCT_TYPE_STATUS_DATA = "putProductTypeStatusData";
export const DELETE_PRODUCT_TYPE_DATA = "deleteProductTypeData";
export const LIST_PRODUCT_TYPE_DATA = "listProductTypeData";
// mutation types
export const SET_PAGINATION = "setPagination";
export const SET_IS_CLEAR_PAGINATION = "setIsClearPagination";
export const CLEAR_PAGINATION = "clearPagination";

export default {
    state: {
        path: "product_type",
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
        [PAGINATION_PRODUCT_TYPE_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/pagination`, {
                params: payload.params
            });
        },
        [GET_PRODUCT_TYPE_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/${payload.id}`);
        },
        [POST_PRODUCT_TYPE_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.post(`${context.state.path}`, payload.data);
        },
        [PUT_PRODUCT_TYPE_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/${payload.id}`,
                payload.data
            );
        },
        [PUT_PRODUCT_TYPE_STATUS_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/status/${payload.id}`,
                payload.data
            );
        },
        [DELETE_PRODUCT_TYPE_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.delete(`${context.state.path}/${payload.id}`);
        },
        [LIST_PRODUCT_TYPE_DATA](context) {
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