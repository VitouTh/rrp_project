import ApiService from "@/core/services/api.service";
// action types
export const PAGINATION_POSTER_DATA = "paginationPosterData";
export const GET_POSTER_DATA = "getPosterData";
export const POST_POSTER_DATA = "postPosterData";
export const PUT_POSTER_DATA = "putPosterData";
export const PUT_POSTER_STATUS_DATA = "putPosterStatusData";
export const DELETE_POSTER_DATA = "deletePosterData";
// mutation types
export const SET_PAGINATION = "setPagination";
export const SET_IS_CLEAR_PAGINATION = "setIsClearPagination";
export const CLEAR_PAGINATION = "clearPagination";

export default {
    state: {
        path: "poster",
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
        [PAGINATION_POSTER_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/pagination`, {
                params: payload.params
            });
        },
        [GET_POSTER_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/${payload.id}`);
        },
        [POST_POSTER_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.post(`${context.state.path}`, payload.data);
        },
        [PUT_POSTER_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/${payload.id}`,
                payload.data
            );
        },
        [PUT_POSTER_STATUS_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/status/${payload.id}`,
                payload.data
            );
        },
        [DELETE_POSTER_DATA](context, payload) {
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