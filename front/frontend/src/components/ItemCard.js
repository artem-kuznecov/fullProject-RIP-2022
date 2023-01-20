import React, {useEffect, useState} from "react";
import '../index.css';
import {Link, Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import {connect} from "react-redux";
import {create_order} from "../actions/cart";


import store from "../store";
import {SUCCESS_ADD} from "../actions/types";

import axios from "axios";


const ItemCard = ({ create_order, id, name, price, image, description, cartChecker, userID, is_staff, ssilka}) => {
    let counter = 0;

    const addToCart = () => {
        create_order(id, userID)
    }





    return(
        <div className='itemCard'>
            <Link to={`/catalog/${id}`}><img width={133} height={112} src={ssilka} alt='исправь картинку даун'></img></Link>
            {/*<Link to={`/catalog/${pk}`}><img width={133} height={112} src={require(`../..public/img/${image}`)} alt='исправь картинку даун'></img></Link>*/}
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                {!cartChecker && !is_staff? <Link to='/orders'><img width={20}
                      height={20}
                      src="/img/plus512.png" alt="Plus"
                      className="d-flex justify-between align-center cu-p"
                      onClick={addToCart}
                >
                </img></Link>: null}
                {/*{!cartChecker? <a*/}
                {/*                    className="d-flex justify-between align-center cu-p clear"*/}
                {/*                    onClick={addToCartHandler}*/}
                {/*>купить*/}
                {/*</a>: null}*/}
            </div>
        </div>
    )
};
export default connect(null, {create_order})(ItemCard);