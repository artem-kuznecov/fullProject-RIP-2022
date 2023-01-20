import React, {useState} from 'react';
import CSRFToken from "../components/CSRFToken";
import {update_item} from "../actions/cart";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const NewItem = ({update_item, pk_helper}) => {
    console.log('pk >', pk_helper, typeof pk_helper)
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        price:'',
        image:''
    });
    const {name, description, price, image} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        update_item(name, price, image, description, Number(pk_helper))
        return <Navigate to='/catalog'/>
    }

    return (
        <div className='container mt-3'>
            <h1 className='display-4'>Форма редактирования товара:</h1>
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
                        placeholder='*вставьте в это поле полное название файла изображения (без расширения)'
                        name='image'
                        onChange={e => onChange(e)}
                        value={image}
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Изменить</button>
            </form>
        </div>
    )
};
const mapStateToProps = state => ({
    pk_helper: state.cart.pk_helper
})
export default connect(mapStateToProps, {update_item})(NewItem);