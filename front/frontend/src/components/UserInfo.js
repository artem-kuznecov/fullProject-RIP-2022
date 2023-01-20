import React, {useEffect, useState} from "react";
import '../index.css';
import {Link} from "react-router-dom";
import store from "../store";
import {SUCCESS_ADD} from "../actions/types";
import {connect} from "react-redux";
import axios from "axios";



const UserInfo = ({ id, username, is_staff}) => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/user_info_by_id/${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                return res.json();
            })
            .then(json =>{
                setFirstname(json.info.first_name)
                setLastname(json.info.last_name)
                setPhone(json.info.phone)
                setEmail(json.info.email)
            })

    }, [])


    return(
        <div className='container'>
            <h4>Никнейм: {username}</h4>
            <h5>Идентификатор: {id}</h5>
            {/*<p>is staff: {String(is_staff)}</p>*/}
            {is_staff?<p>Сотрудник</p>:<p>Пользователь</p>}
            <p>Имя: {firstname}</p>
            <p>Фамилия: {lastname}</p>
            <p>Телефон: {phone}</p>
            <p>Email: {email}</p>
        </div>
    )
};
export default UserInfo;