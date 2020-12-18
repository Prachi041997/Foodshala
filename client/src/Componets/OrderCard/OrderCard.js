import React from 'react';
import './OrderCard.css';
const OrderCard = ({ order }) => {
    return (
        <div className='ordercard'>
            <div className='ordercard_head'>
                <div className='ordercard_person'>
                    <h4>{order.userInfo.name}</h4>
                    <h6>{order.userInfo.phone}</h6>
                </div>
                <div className='ordercard_price'>
                    <h5>Rs.{order.totalPrice}</h5>
                </div>
            </div>
            <div className='ordercard_body'>
               {order.products.map(product=> {
                   return (
                    <div className='ordercard_body_orders'>
                    <div className='ordercard_body_product'>{product.name}</div>
                    <div className='ordercard_body_quantity'>Quantity-{product.quntity}</div>

                </div>
                   )
               })}

            </div>
        </div>
    )
}
export default OrderCard;