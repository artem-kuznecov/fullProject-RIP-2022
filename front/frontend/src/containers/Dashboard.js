import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {update_profile} from "../actions/profile";
import {delete_account} from "../actions/auth";
import {checkAuthenticated} from "../actions/auth";
import {Navigate} from "react-router-dom";
import axios from "axios";


const Dashboard = ({delete_account, update_profile, first_name_global, last_name_global, phone_global, email_global, checkAuthenticated, isAuthenticated}) => {

    const [profileUpdated, setProfileUpdated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    });
    const {first_name, last_name, phone, email} = formData;

    useEffect(() => {
        setFormData({
            first_name: first_name_global,
            last_name: last_name_global,
            phone: phone_global,
            email: email_global
        })
    }, [first_name_global, last_name_global, phone_global, email_global])


    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        update_profile(first_name, last_name, phone, email);
    }

    if (isAuthenticated) {
        return (
            <div className='container'>
                <h1 className='display-4 mt-3'>Ваш профиль:</h1>
                <form onChange={e => onSubmit(e)}>

                    <div className='form-group'>
                        <label className='form-label mt-3' htmlFor='first_name'>Имя:</label>
                        <input
                            className='form-control'
                            type='text'
                            name='first_name'
                            placeholder={`${first_name_global}`}
                            onChange={e => onChange(e)}
                            value={first_name}
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label mt-3' htmlFor='last_name'>Фамилия:</label>
                        <input
                            className='form-control'
                            type='text'
                            name='last_name'
                            placeholder={`${last_name_global}`}
                            onChange={e => onChange(e)}
                            value={last_name}
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label mt-3' htmlFor='phone'>Телефон:</label>
                        <input
                            className='form-control'
                            type='text'
                            name='phone'
                            placeholder={`${phone_global}`}
                            onChange={e => onChange(e)}
                            value={phone}
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label mt-3' htmlFor='email'>Почта:</label>
                        <input
                            className='form-control'
                            type='text'
                            name='email'
                            placeholder={`${email_global}`}
                            onChange={e => onChange(e)}
                            value={email}
                        />
                    </div>

                    <button className='btn btn-primary mt-3' type='submit'>Изменить</button>
                </form>
                <a className='btn btn-danger mt-3' onClick={delete_account}>
                    Удалить аккаунт
                </a>
            </div>
        );
    } else {
        return (
            <Navigate to='/login' />
        )
    }
};
const mapStateToProps = state => ({
    first_name_global: state.profile.first_name,
    last_name_global: state.profile.last_name,
    phone_global: state.profile.phone,
    email_global: state.profile.email,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {update_profile, delete_account, checkAuthenticated})(Dashboard);