import React, { useState } from 'react';
import { addItemToCart, cartEmpty } from '../../API/CartHelper';
import FoodImage from '../FoodImage/FoodImage';
import Modal from '../Modal/Modal';
import './CustomerMenuCard.css'
const CustomerMenuCard = ({ product }) => {

    const [showModal,setShowModal] = useState('');
    const [btnText, setBtnText] = useState({
        flag: true,
        text: "Add to Cart"
    })
    const handleClick = () => {
        if (btnText.flag) {
            handleAddItem(product);
        }
    }
    const displayModal = ()=> {
        if(showModal){
            return <Modal product={product} 
                          handleEmptyCart={handleEmptyCart}
                          closeModal={closeModal}/>
        }
    }
    const handleAddItem = () => {
        addItemToCart(product, (bol) => {
            if (!bol) {
                console.log(bol)
                setShowModal(true);
                handleEmptyCart();
            } else {
                setBtnText({ ...btnText, flag: !btnText.flag, text: 'Added to Cart' })
            }
        })
    }
    const handleEmptyCart = () => {
        cartEmpty();
        handleAddItem();
        closeModal();
    }
    const closeModal = ()=> {
        setShowModal(false);
    }
    return (
       <React.Fragment>
           {displayModal()}
            <div className="rest_card" >
            <div className='rest_imagediv'>
                <FoodImage id={product._id} />
            </div>
            <div className="rest_cardbody">
                <h5>{product.name}</h5>
                <h6>{product.description}</h6>
                <h6>Rs. {product.price} for one</h6>
                <button className='rest_btn rest_addtocart' onClick={handleClick}>{btnText.text}</button>
            </div>
        </div>

       </React.Fragment>
    )
}
export default CustomerMenuCard;