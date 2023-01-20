import React, {useEffect, useState} from "react";
import '../index.css';

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
                setGoodName(json[0].name)
                setGoodPrice(json[0].price)
                setGoodImage(json[0].ssilka)
            })

    }, [])

    return(
        <div className='itemCard'>
            <img width={133} height={112} src={goodImage} alt='исправь картинку даун'/>
            <h5 className='mt-2'>{goodName}</h5>
            <p>Стоимость:<h6>{goodPrice} р.</h6></p>
            <p>Статус: <p className='text-uppercase'> {status}</p></p>
            <p>Дата заказа: {date_created}</p>
        </div>
    )
};
export default OrderInfo;