import React, {useState} from 'react';
import CSRFToken from "../components/CSRFToken";
import {new_item} from "../actions/cart";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const NewItem = ({new_item}) => {
    let counter = 0;
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        price:'',
        ssilka:''
    });
    const {name, description, price, ssilka} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        new_item(name, price, ssilka, description)
        counter++
        return <Navigate to='/catalog'/>
    }



    return (
        <div className='container mt-3'>
            <h1 className='display-4'>Форма добавления нового товара в каталог</h1>
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken/>
                <div className='form-group'>
                    <label className='form-label'>Название:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='название товара'
                        name='name'
                        onChange={e => onChange(e)}
                        value={name}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Описание:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='описание товара'
                        name='description'
                        onChange={e => onChange(e)}
                        value={description}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label'>Цена:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='цена товара'
                        name='price'
                        onChange={e => onChange(e)}
                        value={price}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Изображение:</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='*вставьте в это поле ссылку на изображение'
                        name='ssilka'
                        onChange={e => onChange(e)}
                        value={ssilka}
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Добавить</button>
            </form>
        </div>
    )

};

export default connect(null, {new_item})(NewItem);