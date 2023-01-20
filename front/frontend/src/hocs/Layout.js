import React, {Fragment, useEffect} from 'react';
import Navbar from "../components/Navbar";
import {connect} from "react-redux";
import {checkAuthenticated} from "../actions/auth";
import {load_user} from "../actions/profile";
import {is_user_staff} from "../actions/auth";

const Layout = ({children, checkAuthenticated, load_user, is_user_staff}) => {
    useEffect(() => {
        checkAuthenticated();
        is_user_staff();
        load_user();
    }, [])

    useEffect(() => {
        is_user_staff();
    }, [])

    return (
        <div>
            <Navbar/>
            {children}
        </div>
    );
};

export default connect(null, {checkAuthenticated, load_user, is_user_staff})(Layout);