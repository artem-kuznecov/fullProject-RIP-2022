import React, {useEffect, useState} from 'react';
import OrderInfo from "../components/OrderInfo";

import AdminOrderInfo from "../components/AdminAllOrdersInfo";

const AllOrders = () => {
    let start = '';
    let end = '';

    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(16733088000000000000);

    const [items, setItems] = useState([]);
    const [orderer, setOrderer] = useState('');
    const [impValue, setImpValue] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/shop/orders', {
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
                console.log('bscicbe >', json[0])
                setItems(json)
            })

    }, [])



    const onChangeStart = e => setStartDate(e.target.value)
    const onChangeEnd = e => setEndDate(e.target.value)

    const onChange = e => setImpValue(e.target.value)

    const getDates = (start, end) => {
        start=document.getElementById("start_date").value;
        end=document.getElementById("end_date").value;
        setStartDate(Date.parse(start))
        setEndDate(Date.parse(end))
        console.log('start >',start, 'end >',end)
    }


    return (
        <div className='container'>
            <h2 className='mb-40 mt-20'>Все заказы пользователей:</h2>
            {/*<h5> Переменная: {Number(startDate)}</h5>*/}
            <h5>Тут делаем фильтрацию</h5>
            <div className='d-flex flex-wrap'>
                {/*<h5>Дата вот этого заказа: {items[0].date_created}</h5>*/}

                <h5 className='mr-10'>Фильтр даты:</h5>
                {/*<input value={startDate} className='mr-10' type='date' id='start_date' onChange={e => onChangeStart(e)}/>*/}
                {/*<input value={endDate} className='mr-10' type='date' id='end_date' onChange={e => onChangeEnd(e)}/>*/}
                <input className='mr-10' type='date' id='start_date'/>
                <input className='mr-10' type='date' id='end_date'/>
                <button className='mr-15' onClick={getDates}>Show</button>

                <h5>Фильтр статуса:</h5>
                <select className='dropdown-selector' value={impValue} onChange={e => onChange(e)}>
                    <option selected value=''>Любой</option>
                    <option value="В обработке">В обработке</option>
                    <option value="Отменен">Отменен</option>
                    <option value="Принят">Принят</option>
                    <option value="Готов к выдаче">Готов к выдаче</option>
                    <option value="Выдан">Выдан</option>
                </select>

            </div>
            <br/>
            {/*{items.map((item, index) => {*/}
            {/*    fetch(`http://localhost:8000/accounts/user_info_by_id/${item.user_id}`, {*/}
            {/*        method: 'GET',*/}
            {/*        credentials: "include",*/}
            {/*        headers: {*/}
            {/*            'Accept': 'application/json',*/}
            {/*            'Content-Type': 'application/json',*/}
            {/*        }*/}
            {/*    })*/}
            {/*        .then(res => {*/}
            {/*            return res.json();*/}
            {/*        })*/}
            {/*        .then(json =>{*/}
            {/*            console.log(json)*/}
            {/*            setOrderer(String(json.username))*/}
            {/*        })*/}
            {/*    return (*/}
            {/*        <div className='d-flex m-1'>*/}
            {/*            <AdminOrderInfo key={index} orderer={orderer}*/}
            {/*                       {...item}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    );*/}
            {/*})}*/}

            {items.filter((obj) => {
                const current = new Date(obj.date_created)
                const cur = Date.parse(current);
                if (obj.status.toLowerCase().includes(impValue.toLowerCase())) {
                    if (current >= startDate && current <= endDate) {
                        return true
                    }
                }
                return false
            }).map((item, index) => {
                fetch(`http://localhost:8000/accounts/user_info_by_id/${item.user_id}`, {
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
                        console.log(json)
                        setOrderer(String(json.username))
                    })
                return (
                    <div className='d-flex m-1'>
                        <AdminOrderInfo key={index} orderer={orderer}
                                        {...item}
                        />
                    </div>
                );
            })}


        </div>
    );
};

export default AllOrders;