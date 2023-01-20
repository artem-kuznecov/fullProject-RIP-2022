import React from "react";
import '../index.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {create_order} from "../actions/cart";


const ItemCard = ({ create_order, id, name, price, image, description, cartChecker, userID, is_staff, ssilka}) => {
    let counter = 0;

    const addToCart = () => {
        create_order(id, userID)
    }

    return(
        <div className='itemCard'>
            <Link to={`/catalog/${id}`}><img width={133} height={112} src={ssilka} alt='исправь картинку даун'></img></Link>
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                {!cartChecker && !is_staff? <Link to='/orders'><img width={20}
                      height={20}
                      src="/img/plus512.png" alt="Plus"
                      className="d-flex justify-between align-center cu-p"
                      onClick={addToCart}
                >
                </img></Link>: null}
            </div>
        </div>
    )
};
export default connect(null, {create_order})(ItemCard);