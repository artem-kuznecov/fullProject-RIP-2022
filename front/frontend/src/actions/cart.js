import Cookies from "js-cookie";
import axios from "axios";
import {
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_GOOD_FAIL,
    CREATE_GOOD_SUCCESS,
    UPDATE_GOOD_FAIL,
    UPDATE_GOOD_SUCCESS,
    SAVER
} from "./types";
import {type} from "@testing-library/user-event/dist/type";

export const create_order = (item_id, user_id) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
    const body = {item_id, user_id}

    try {
        const res = await axios.post(`http://localhost:8000/shop/orders`, body, config)

        if (res.data.success) {
            console.log(CREATE_ORDER_SUCCESS)
        } else {
            console.log(CREATE_ORDER_FAIL)
        }
    } catch (err) {
        console.log(CREATE_ORDER_FAIL)
    }
};

export const delete_order = (pk) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }

    try {
        const res = await axios.delete(`http://localhost:8000/shop/orders/${pk}`, config)

        if (res.data.success) {
            console.log('DELETE_ORDER_SUCCESS')

        } else {
            console.log('DELETE_ORDER_FAIL')
        }
    } catch (err) {
        console.log('DELETE_ORDER_FAIL')
    }
};

export const update_status = (status, pk) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
    const body = JSON.stringify({status})

    try {
        const res = await axios.put(`http://localhost:8000/shop/orders/${pk}`, body, config)

        if (res.data.success) {
            console.log('STATUS_UPDATE_SUCCESS')
        } else {
            console.log('STATUS_UPDATE_FAIL')
        }
    } catch (err) {
        console.log('STATUS_UPDATE_SUCCESS')
    }
};


export const new_item = (name, price, ssilka, description) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
    const body = JSON.stringify({name, price, ssilka, description})

    try {
        const res = await axios.post(`http://localhost:8000/shop/goodslist`, body, config)

        if (res.data.created) {
            console.log(CREATE_GOOD_SUCCESS)
        } else {
            console.log(CREATE_GOOD_FAIL)
        }
    } catch (err) {
        console.log(CREATE_GOOD_FAIL)
    }
};


export const update_item = (name, price, image, description, pk) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
    const body = JSON.stringify({name, price, image, description})

    try {
        const res = await axios.put(`http://localhost:8000/shop/goodslist/${pk}`, body, config)

        if (res.data.updated) {
            console.log(UPDATE_GOOD_SUCCESS)
            dispatch({
                type: UPDATE_GOOD_SUCCESS,
                payload: pk
            })
        } else {
            dispatch({
                type: UPDATE_GOOD_FAIL,
            })
            console.log(UPDATE_GOOD_FAIL)
        }
    } catch (err) {
        dispatch({
            type: UPDATE_GOOD_FAIL
        })
        console.log(UPDATE_GOOD_FAIL)
    }
};

export const saver = (pk) => async dispatch => {
    if (pk) {
        dispatch({
            type: SAVER,
            payload: pk
        })
    }
};

