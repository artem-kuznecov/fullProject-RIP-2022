import React, {useEffect, useState} from 'react';
import axios from "axios";
// import Cookies from "js-cookie";
import ItemCard from "../components/ItemCard";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Catalog = ({isAuthenticated, is_staff}) => {
    const [searchValue, setSearchValue] = useState('');
    const poisk = 'Микроскоп'
    console.log('is staff > ', is_staff)
    let ttt = false;
    if (!isAuthenticated) {
        ttt = true
    }

    console.log('is staff > ', is_staff)
    const [items, setItems] = useState([]);
    const [userID, setUserID] = useState(0);

    const src = `http://localhost:8000/shop/goodslist`;

    useEffect(() => {
        const config = {
            withCredentials: true,
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                // 'X-CSRFToken': Cookies.get('csrftoken')
            }
        }
        axios.get(src, config)
            .then(data => {
                setItems(data.data);
            });
        fetch('http://localhost:8000/shop/active_user_id', {
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
                setUserID(json)
            })
    }, []);
    console.log('userID >',userID)

    return (
        <div className='container'>
            <h5 className='display-4'>Поиск</h5>
            <input className="searchInput" value={searchValue} onChange={event => setSearchValue(event.target.value)}/>
            {is_staff?<h4 className='clear bttn'>
                <Link to='/new_item'>Добавление товара</Link>
            </h4>: null}
            <h2 className='mb-40 mt-20'>Каталог товаров:</h2>

            {/*{items.map((item, index) => {*/}
            {/*    return (*/}
            {/*        <div className='d-ib flex m-1'>*/}
            {/*            <ItemCard key={index} cartChecker={ttt} userID={userID} is_staff={is_staff}*/}
            {/*                  {...item}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    );*/}
            {/*})}*/}

            {items.filter((obj) => {
                if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
                    return true
                }
                return false
            }).map((item, index) => {
                return (
                    <div className='d-ib flex m-1'>
                        <ItemCard key={index} cartChecker={ttt} userID={userID} is_staff={is_staff}
                                  {...item}
                        />
                    </div>
                );
            })}

        </div>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    is_staff: state.auth.is_staff
})

export default connect(mapStateToProps, {})(Catalog);
// export default Catalog;