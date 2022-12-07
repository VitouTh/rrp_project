import ApiService from "@/core/services/api.service";
// action types
export const PAGINATION_SELL_DATA = "paginationSellData";
export const GET_SELL_DATA = "getSellData";
export const POST_SELL_DATA = "postSellData";
export const PUT_SELL_DATA = "putSellData";
export const PUT_SELL_STATUS_DATA = "putSellStatusData";
export const DELETE_SELL_DATA = "deleteSellData";
// mutation types
export const SET_PAGINATION = "setPagination";
export const SET_IS_CLEAR_PAGINATION = "setIsClearPagination";
export const CLEAR_PAGINATION = "clearPagination";

export default {
    state: {
        path: "sell",
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
        [PAGINATION_SELL_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/pagination`, {
                params: payload.params
            });
        },
        [GET_SELL_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/${payload.id}`);
        },
        [POST_SELL_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.post(`${context.state.path}`, payload.data);
        },
        [PUT_SELL_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/${payload.id}`,
                payload.data
            );
        },
        [PUT_SELL_STATUS_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/status/${payload.id}`,
                payload.data
            );
        },
        [DELETE_SELL_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.delete(`${context.state.path}/${payload.id}`);
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