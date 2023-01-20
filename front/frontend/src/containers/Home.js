import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className='container'>
            <div className='mt-5 p-5 bg-light'>
                {/*<h1 className='display-4'>Главная страница</h1>*/}
                <h1 className='display-4'>
                    LABEquip - поставщик лабораторного оборудования в школы, университеты, научные исследовательские центры
                </h1>
                <p className='lead'>Компания, не первый год доказывающая свою надежность и долгосрочную поддержку своих клиентов</p>
                <hr className='my-4'/>
                <p>Нажмите, чтобы войти в аккаунт</p>
                <Link className='btn btn-primary btn-lg' to='/login'>Авторизоваться</Link>
            </div>
        </div>
    );
};

export default Home;