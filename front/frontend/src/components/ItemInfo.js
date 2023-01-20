import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import ItemInfoCard from "./ItemInfoCard";
import {connect} from "react-redux";
import {saver} from "../actions/cart";


const ItemInfo = ({is_staff, pk_helper, saver}) => {
    let {id} = useParams();
    const [items, setItems] = useState([]);
    console.log('id >', id, typeof Number(id))
    const src = `http://localhost:8000/shop/good/${id}`;
    useEffect(() => {

        const config = {
            withCredentials: true,
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
            }
        }
        axios.get(src, config)
            .then(data => {
                setItems(data.data);
            })
    }, []);

    const deleteItem = () => {
        const config = {
            withCredentials: true,
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        }
        axios.delete(`http://localhost:8000/shop/goodslist/${id}`, config)

    }
    const savePk = () => {
        saver(id)
    }

    return (
        <div className='container'>
            <h3>Подробная информация о товаре</h3>
            {items.map((item, index) => {
                return (
                    <div className='d-ib flex m-1 d-inline-block'>
                        <ItemInfoCard key={index} {...item}/>
                        {is_staff? <button className='btn btn-primary' onClick={deleteItem}>Удалить</button>: null}<br/>
                        {is_staff? <Link to='/update_item' className='btn btn-primary mt-10' onClick={savePk}>Править</Link>: null}
                    </div>

                );
            })}
        </div>
    );

};
const mapStateToProps = state => ({
    is_staff: state.auth.is_staff,
    pk_helper: state.cart.pk_helper
})

export default connect(mapStateToProps, {saver})(ItemInfo);