import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL, CHECK_STAFF_SUCCESS, CHECK_STAFF_FAIL
} from "../actions/types";

const initialState = {
    isAuthenticated: null,
    is_staff: null
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case CHECK_STAFF_SUCCESS:
            return {
                ...state,
                is_staff: payload
            }
        case CHECK_STAFF_FAIL:
            return {
                ...state,
                is_staff: payload
            }
        case AUTHENTICATED_SUCCESS:
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: payload,
                is_staff: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT_SUCCESS:
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
        case DELETE_USER_FAIL:
            return state
        default:
            return state
    }
}

