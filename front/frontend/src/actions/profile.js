import Cookies from "js-cookie";
import axios from "axios";
import {
    LOAD_USER_PROFILE_FAIL,
    LOAD_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from "./types";


export const load_user = () => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        }
    }


    try {
        const res = await axios.get(`http://localhost:8000/profile/user`, config)

        if (res.data.error) {
            dispatch({
                type: LOAD_USER_PROFILE_FAIL
            })
        } else {
            console.log(res.data)
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: res.data
            })
        }
    } catch (err) {
        dispatch({
            type: LOAD_USER_PROFILE_FAIL
        })
    }
};

export const update_profile = (first_name, last_name, phone, email) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
    const body = JSON.stringify({
        withCredentials: true,
        first_name,
        last_name,
        phone,
        email,
    })

    try {
        const res = await axios.put(`http://localhost:8000/profile/update`, body, config)

        if (res.data.profile && res.data.username) {
            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL
        })
    }

};





export const cartTest = (good) => async dispatch => {

    const response = await fetch('http://127.0.0.1:8000/cart/', {
        method:'POST',
        body: JSON.stringify(good),
        withCredentials: true,
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data;


};


