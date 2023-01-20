import React, {Fragment, useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../actions/auth";
import axios from "axios";

const Navbar = ({isAuthenticated, logout, username, is_staff}) => {
    const staffLinks = (
        <Fragment>
            <li className="nav-item">
                <NavLink className="nav-link" to='all_orders'>Все заказы</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to='/users'>Все пользователи</NavLink>
            </li>
        </Fragment>
    )

    const authLinks = (
        <Fragment>
            <li className="nav-item">
                <NavLink className="nav-link" to='/dashboard'>Профиль</NavLink>
            </li>
            <li className="nav-item">
                <a className="nav-link cu-p" onClick={logout} href='/'>Выйти</a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <NavLink className="nav-link" to='/login'>Войти</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to='/register'>Регистрация</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to='/register_staff'>Регистрация сотрудника</NavLink>
            </li>

        </Fragment>
    )

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand text-uppercase" to='/'>lab equipment</Link>
                {isAuthenticated? <a className="userName navbar-brand"> {username} </a>: null}
                <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/*<li className="nav-item">*/}
                        {/*    <NavLink className="nav-link" to='/'>Домашнаяя страница</NavLink>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <NavLink className="nav-link" to='/test'>TEST</NavLink>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/catalog'>Каталог</NavLink>
                        </li>
                        {!is_staff && isAuthenticated? <li className="nav-item">
                            <NavLink className="nav-link" to='/orders'>Мои Заказы</NavLink>
                        </li>: null}
                        {/*<li className="nav-item">*/}
                        {/*    <NavLink className="nav-link" to='/test'>TEST</NavLink>*/}
                        {/*</li>*/}
                        {isAuthenticated && is_staff? staffLinks: null}
                        {isAuthenticated? authLinks: guestLinks}

                    </ul>
                </div>
            </div>
        </nav>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_staff: state.auth.is_staff,
    username: state.profile.username
})

export default connect(mapStateToProps, {logout})(Navbar);