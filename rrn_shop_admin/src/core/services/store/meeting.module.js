import ApiService from "@/core/services/api.service";
// action types
export const PAGINATION_MEETING_DATA = "paginationMeetingData";
export const GET_MEETING_DATA = "getMeetingData";
export const POST_MEETING_DATA = "postMeetingData";
export const PUT_MEETING_DATA = "putMeetingData";
export const PUT_MEETING_STATUS_DATA = "putMeetingStatusData";
export const DELETE_MEETING_DATA = "deleteMeetingData";
export const LIST_MEETING_DATA = "listMeetingData";
// mutation types
export const SET_PAGINATION = "setPagination";
export const SET_IS_CLEAR_PAGINATION = "setIsClearPagination";
export const CLEAR_PAGINATION = "clearPagination";

export default {
    state: {
        path: "meeting",
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
        [PAGINATION_MEETING_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/pagination`, {
                params: payload.params
            });
        },
        [GET_MEETING_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.getParams(`${context.state.path}/${payload.id}`);
        },
        [POST_MEETING_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.post(`${context.state.path}`, payload.data);
        },
        [PUT_MEETING_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/${payload.id}`,
                payload.data
            );
        },
        [PUT_MEETING_STATUS_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.put(
                `${context.state.path}/status/${payload.id}`,
                payload.data
            );
        },
        [DELETE_MEETING_DATA](context, payload) {
            ApiService.setHeader();
            return ApiService.delete(`${context.state.path}/${payload.id}`);
        },
        [LIST_MEETING_DATA](context) {
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