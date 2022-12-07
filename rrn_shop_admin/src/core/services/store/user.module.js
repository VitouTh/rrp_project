import ApiService from "@/core/services/api.service";
// action types
export const PAGINATION_USER_DATA = "paginationUserData";
export const LIST_USER_DATA = "listUserData";
export const GET_USER_DATA = "getUserData";
export const POST_USER_DATA = "postUserData";
export const PUT_USER_DATA = "putUserData";
export const PUT_USER_STATUS_DATA = "putUserStatusData";
export const PUT_USER_PASSWORD_DATA = "putUserPasswordData";
export const DELETE_USER_DATA = "deleteUserData";
export const LIST_CUSTOMER_DATA = "listCustomerData";
export const LIST_ADMIN_DATA = "listAdminData";
export const PAGINATION_CUSTOMER_DATA = "paginationCustomerData"
    // mutation types
export const SET_PAGINATION = "setPagination";
export const SET_IS_CLEAR_PAGINATION = "setIsClearPagination";
export const CLEAR_PAGINATION = "clearPagination";

export default {
    state: {
        path: "user",
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
        [PAGINATION_USER_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/pagination`, {
                params: payload.params
            });
        },
        [PAGINATION_CUSTOMER_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/paginationCustomer`, {
                params: payload.params
            });
        },
        [LIST_USER_DATA](context) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}`);
        },
        [GET_USER_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/${payload.id}`);
        },
        [POST_USER_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.post(`${context.state.path}`, payload.data);
        },
        [PUT_USER_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/${payload.id}`,
                payload.data
            );
        },
        [PUT_USER_STATUS_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/status/${payload.id}`,
                payload.data
            );
        },
        [PUT_USER_PASSWORD_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/password/${payload.id}`,
                payload.data
            );
        },
        [DELETE_USER_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.delete(`${context.state.path}/${payload.id}`);
        },
        [LIST_CUSTOMER_DATA](context) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/listCustomer`);
        },
        [LIST_ADMIN_DATA](context) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/listAdmin`);
        },
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