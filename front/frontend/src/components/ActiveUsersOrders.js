import React, {useEffect, useState} from 'react';
import OrderInfo from "./OrderInfo";


const ActiveUsersOrders = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/shop/active_user_orders', {
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
                setItems(json)
            })

    }, [])

    return (
        <div className='container'>
            <h2 className='mb-40 mt-20'>Мои заказы:</h2>
            {items.map((item, index) => {
                return (
                    <div className='d-ib flex m-1'>
                        <OrderInfo key={index}
                                  {...item}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ActiveUsersOrders;