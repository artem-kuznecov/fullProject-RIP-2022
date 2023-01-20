import React, {useEffect, useState} from 'react';
import UserInfo from "../components/UserInfo";

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/accounts/get_users', {
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
                setUsers(json)
            })

    }, [])

    return (
        <div className='container'>
            <h2 className='mb-40 mt-20'>Все пользователи:</h2>
            {users.map((item, index) => {
                return (
                    <div className='d-ib flex m-1 d-flex flex-wrap'>
                        <UserInfo key={index} {...item}/>
                    </div>
                );
            })}
        </div>
    );
};
export default AllUsers;