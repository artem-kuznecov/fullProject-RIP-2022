import React, {useState} from 'react';
import {register} from "../actions/auth";
import {connect} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import CSRFToken from "../components/CSRFToken";

const Register = ({register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username:'',
        password:'',
        re_password:'',
        secret_key:''
    });
    const [accountCreated, setAccountCreated] = useState(false);

    const {username, password, re_password, secret_key} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        if (password === re_password && secret_key === 'secret') {
            register(username, password, re_password)
            setAccountCreated(true)
        }
    }

    if (isAuthenticated)
        return <Navigate to='/dashboard'/>
    else if (accountCreated)
        return <Navigate to='/login'/>

    return (
        <div className='container mt-3'>
            <h1 className='display-4'>Форма регистрации нового <br/>пользователя-администратора</h1>
            <p>Создайте учетную запись, используя секретный ключ, выданный Вам работодателем</p>
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken/>
                <div className='form-group'>
                    <label className='form-label'>Придумайте никнейм:</label>
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
                    <label className='form-label mt-3'>Придумайте пароль:</label>
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
                <div className='form-group'>
                    <label className='form-label mt-3'>Подтвердите пароль:</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        onChange={e => onChange(e)}
                        value={re_password}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Введите секретный ключ:</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='секретный ключ*'
                        name='secret_key'
                        onChange={e => onChange(e)}
                        value={secret_key}
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Зарегистрироваться</button>
            </form>
            <p className='mt-3'>
                Если у вас есть аккаунт, <Link to='/login'>авторизуйтесь</Link>
            </p>
        </div>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {register})(Register);