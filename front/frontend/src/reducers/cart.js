import {
    UPDATE_GOOD_FAIL,
    UPDATE_GOOD_SUCCESS,
    SAVER
} from "../actions/types";

const initialState = {
    cartItems:[],
    orders:[],
    pk_helper: 0
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SAVER:
            return {
                ...state,
                pk_helper: payload
            }
        case UPDATE_GOOD_FAIL:
        case UPDATE_GOOD_SUCCESS:
            return {
                ...state
            }
        default:
            return state;
    }
}