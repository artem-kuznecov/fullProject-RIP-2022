import React from "react";
import '../index.css';


const ItemInfoCard = ({name, price, image, description, ssilka}) => {


    return(
        <div className='container'>
            <img className='info' width={200} height={200} src={ssilka} alt='исправь картинку даун'></img>
            <h2>{name}</h2>
            <p>Цена: {price} руб.</p>
            <p>Описание: {description}</p>
        </div>
    )
};
export default ItemInfoCard;