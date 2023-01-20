import React, {useEffect, useState} from "react";
import '../index.css';
import {Link} from "react-router-dom";
import store from "../store";
import {SUCCESS_ADD} from "../actions/types";
import {connect} from "react-redux";
import axios from "axios";



const OrderInfo = ({ id, item_id, user_id, status, date_created, date_confirmed, ssilka}) => {
    const [good, setGood] = useState({
        ssilka:'',
        name:'',
        price:'',
        description:''
    });
    const {image, name, price, description} = good;

    const [goodName, setGoodName] = useState('')
    const [goodPrice, setGoodPrice] = useState('')
    const [goodImage, setGoodImage] = useState('')
    const [goodDescription, setGoodDescription] = useState('')

    const src = `http://localhost:8000/shop/good/${item_id}`;

    useEffect(() => {
        fetch(`http://localhost:8000/shop/good/${item_id}`, {
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
                // setGood(json)
                setGoodName(json[0].name)
                setGoodPrice(json[0].price)
                setGoodImage(json[0].ssilka)
                setGoodDescription(json[0].description)

                // console.log('items в юзэффекте >',items)
            })

    }, [])

    // console.log('good name >',goodName)

    return(
        <div className='itemCard'>
            <img width={133} height={112} src={goodImage} alt='исправь картинку даун'/>
            {/*<h5 className='mt-2'>{good[0].name}</h5>*/}
            <h5 className='mt-2'>{goodName}</h5>
            {/*<p>Стоимость: {good[0].price} руб.</p>*/}
            <p>Стоимость:<h6>{goodPrice} р.</h6></p>
            <p>Статус: <p className='text-uppercase'> {status}</p></p>
            <p>Дата заказа: {date_created}</p>
            {/*<p>ID заказа: {id}</p>*/}
            {/*<p>user id: {user_id}</p>*/}
            {/*<p>item id: {item_id}</p>*/}
            {/*<p>date confirmed: {date_confirmed}</p>*/}
        </div>
    )
};
export default OrderInfo;