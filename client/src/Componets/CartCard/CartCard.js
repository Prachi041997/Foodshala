import React, { useState } from 'react';
import { removeItemFromCart, updateQuantity } from '../../API/CartHelper';
import FoodImage from '../FoodImage/FoodImage';
import './CartCard.css';


const CartCard = ({product, reload, setReload})=> {
    const [quantity, setQuantity] = useState(product.quantity);
    const increaseQuantity = ()=> {
        updateQuantity(product.quantity + 1, product._id);
       setReload(!reload);
        
    }
    const decreaseQuantity = ()=> {
       updateQuantity(product.quantity - 1, product._id);
    setReload(!reload);
        

    }

    const handleRemoveItem = ()=> {
       removeItemFromCart(product._id);
       setReload(!reload)
    }
    return(
        <div className="cart_card">
            <div className='cart_image'>
                <FoodImage id={product._id} />
            </div>
            <div className='cart_card_body'>
                <h5>{product.name}</h5>
                <h6>{product.description}</h6>
                <div className='cart_quantity_btn'>
                    <button className='btn' id='btn1' onClick={increaseQuantity}>+</button>
                    <button className='btn' id='btn2'onClick={decreaseQuantity}>-</button>
                     <button className='btn'>{product.quantity}</button>
                </div>
                <button className='cart_remove_btn' onClick={handleRemoveItem}>Remove From Cart</button>
            </div>
            <div className='cart_card_price'>
                <h5>Rs.{product.price}</h5>
            </div>

            
            {/* <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <p className="card-text">{product.description}</p>
                 <p className="card-text">Rs.{product.price}</p>
                </div>
                <div style={{display:'flex'}}>
                    <button className='btn' onClick={increaseQuantity}>+</button>
                    <button className='btn' onClick={decreaseQuantity}>-</button>
                     {product.quantity}
                </div>
                <button className='btn btn-danger' onClick={handleRemoveItem}>Remove From Cart</button>
            </div> */}
        </div>
    )
}
export default CartCard;