import React, {useEffect, useState} from "react";
import '../index.css';
import {update_status, delete_order} from "../actions/cart";
import {Link} from "react-router-dom";
import store from "../store";
import {SUCCESS_ADD} from "../actions/types";
import {connect} from "react-redux";
import axios from "axios";



const AdminOrderInfo = ({ id, item_id, user_id, status, date_created, date_confirmed, orderer, update_status, delete_order}) => {
    const [goodName, setGoodName] = useState('')
    const [goodPrice, setGoodPrice] = useState('')
    const [goodSsilka, setGoodSsilka] = useState('')
    const [goodDescription, setGoodDescription] = useState('')


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
                setGoodName(json[0].name)
                setGoodPrice(json[0].price)
                setGoodDescription(json[0].description)
                setGoodSsilka(json[0].ssilka)
            })
    }, [])

    const extra = status;
    console.log("extra >", extra, typeof extra)
    const [value, setValue] = useState(status);
    console.log('value >', value)

    const onChange = e => setValue(e.target.value)

    const deleteOrder = () => {
        delete_order(id)
    }


    return(
        <div className='ordersAdminInfo container justify-between'>
            <hr/>
            <img width={133} height={112} src={goodSsilka} alt='исправь картинку даун'/>
            <h5 className='mt-2'>{goodName}</h5>
            <p>{goodDescription}</p>
            <p>Стоимость:<h6>{goodPrice} р.</h6></p>
            <p>Статус: <p className='text-uppercase'> {status}</p></p>
            <p>Дата заказа: {date_created}</p>
            <p>Заказчик: {orderer}</p>

            <div className='statusChanger'>
                <h5>Смена статуса: </h5>
                <select className='dropdown-selector' value={value} onChange={e => onChange(e)}>
                    <option selected value='исходный статус' hidden>{status}</option>
                    {(status === 'В обработке' || status === 'Принят')?<option value="Отменен">Отменен</option>: null}
                    {(status === 'Принят'|| status === 'Отменен')?<option value="В обработке">В обработке</option>: null}
                    {(status === 'В обработке' || status === 'Готов к выдаче')?<option value="Принят">Принят</option>: null}
                    {(status === 'Принят')?<option value="Готов к выдаче">Готов к выдаче</option>: null}
                    {(status === 'Готов к выдаче')?<option value="Выдан">Выдан</option>: null}
                </select>
                <p>
                    Новый статус заказа: {value}
                </p>
                <button className='btn btn-primary visually-hidden' onClick={update_status(value, id)}>Подтвердить</button>
            </div>

            <p>ID заказа: {id}</p>
            <Link to='/catalog'><button className='btn btn-danger' onClick={deleteOrder}>Удалить заказ</button></Link>
        </div>
    )
};
export default connect(null, {update_status, delete_order})(AdminOrderInfo);