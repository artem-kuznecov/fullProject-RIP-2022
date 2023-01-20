import axios from "axios";
import Cookies from 'js-cookie';
import {load_user} from "./profile";
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    CHECK_STAFF_FAIL,
    CHECK_STAFF_SUCCESS
} from "./types";

export const is_user_staff = () => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            // 'X-CSRFToken': Cookies.get('csrftoken')
        }
    }

    try {
        const res = await axios.get(`http://localhost:8000/shop/is_active_user_staff`, config)

        if (res.data.is_staff === false) {
            console.log(CHECK_STAFF_FAIL, res.data.is_staff)
            dispatch({
                type: CHECK_STAFF_FAIL,
                payload: false
            })
        }
        else if (res.data.is_staff === true) {
            console.log(CHECK_STAFF_SUCCESS)
            dispatch({
                type: CHECK_STAFF_SUCCESS,
                payload: true
            })
        }
        else {
            console.log(CHECK_STAFF_FAIL, res.data.is_staff)
            dispatch({
                type: CHECK_STAFF_FAIL,
                payload: false
            })
        }
    } catch (err) {
        console.log(CHECK_STAFF_FAIL, 'на catch')
        dispatch({
            type: CHECK_STAFF_FAIL,
            payload: false
        })
    }

};



export const checkAuthenticated = () => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }

    try {
        const res = await axios.get(`http://localhost:8000/accounts/authenticated`, config)

        if (res.data.error || res.data.isAuthenticated === 'error') {
            console.log(AUTHENTICATED_FAIL)
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            })
        }
        else if (res.data.isAuthenticated === 'success') {
            console.log(AUTHENTICATED_SUCCESS)
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            })
        }
        else {
            console.log(AUTHENTICATED_FAIL)
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            })
        }
    } catch (err) {
        console.log(AUTHENTICATED_FAIL)
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        })
    }
};


export const login = (username, password) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
    const body = JSON.stringify({username, password})

    try {
        // const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/login`, body, config)
        const res = await axios.post(`http://localhost:8000/accounts/login`, body, config)

        if (res.data.success) {
            console.log(LOGIN_SUCCESS)
            dispatch({
                type: LOGIN_SUCCESS,
                // payload: res.data.username
            })

            dispatch(load_user());

        } else {
            console.log(LOGIN_FAIL)
            dispatch({
                type: LOGIN_FAIL,
            })
        }
    } catch (err) {
        console.log(LOGIN_FAIL)
        dispatch({
            type: LOGIN_FAIL,
        })
    }

};

export const register = (username, password, re_password) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
    const body = JSON.stringify({username, password, re_password})

    try {
        const res = await axios.post(`http://localhost:8000/accounts/register`, body, config)

        if (res.data.error) {
            console.log(REGISTER_FAIL)
            dispatch({
                type: REGISTER_FAIL
            })
        } else {
            console.log(REGISTER_SUCCESS)
            dispatch({
                type: REGISTER_SUCCESS
            })
        }
    } catch (err) {
        console.log(REGISTER_FAIL)
        dispatch({
            type: REGISTER_FAIL
        })
    }
};

export const logout = () => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
    const body = JSON.stringify({
        withCredentials: true
    })

    try {
        const res = await axios.post(`http://localhost:8000/accounts/logout`, body, config)

        if (res.data.success) {
            console.log(LOGOUT_SUCCESS)
            dispatch({
                type: LOGOUT_SUCCESS
            })
        } else {
            console.log(LOGOUT_FAIL)
            dispatch({
                type: LOGOUT_FAIL,
            })
        }
    } catch (err) {
        console.log(LOGOUT_FAIL)
        dispatch({
            type: LOGOUT_FAIL,
        })
    }

};


export const delete_account = () => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }

    try {
        const res = await axios.delete(`http://localhost:8000/accounts/delete`, config)

        if (res.data.success) {
            dispatch({
                type: DELETE_USER_SUCCESS
            })
        } else {
            dispatch({
                type: DELETE_USER_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: DELETE_USER_FAIL
        })
    }
}




