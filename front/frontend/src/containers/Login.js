import React, {useState} from 'react';
import {login} from "../actions/auth";
import {connect} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import CSRFToken from "../components/CSRFToken";

const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        username:'',
        password:''
    });
    const {username, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        login(username, password)
    }

    if (isAuthenticated)
        return <Navigate to='/catalog'/>

    return (
        <div className='container mt-3'>
            <h1>Форма входа в аккаунт</h1>
            <p>Авторизуйтесь в системе, пожалуйста</p>
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken/>
                <div className='form-group'>
                    <label className='form-label'>Никнейм:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Пароль:</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Войти</button>
            </form>
            <p className='mt-3'>
                Если у Вас нет учетной записи, <Link to='/register'>зарегистрируйтесь</Link>
            </p>
        </div>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {login})(Login);