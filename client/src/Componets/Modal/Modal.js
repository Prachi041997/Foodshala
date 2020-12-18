import React from 'react';
import './Modal.css'
const Modal = ({product, handleEmptyCart, closeModal})=> {
    return (
        <div className='modal block'>
            
            <div className='utilities'>
            <div className='closeicon' onClick={closeModal}><i class="ri-close-line"></i></div>
                <h4>Your cart has existing items of other resturant? Do you want to clear it and add items of this resturant</h4>
                <div className='flex'>
                <button className='btn1'onClick={closeModal}>Proceed with these items</button>
                <button className='btn2'onClick={handleEmptyCart}>Clear cart</button>
                </div>

            </div>
        </div>
    )
}
export default Modal;