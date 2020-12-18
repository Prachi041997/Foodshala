import React, { useEffect } from 'react';
import FoodImage from '../FoodImage/FoodImage';
import './AdminMenuCard.css';
const AdminMenuCard = ({ product }) => {
    return (
        <div className="admin_menucard" >
            <div className='admin_menucard_imagediv'>
                <FoodImage id={product._id} />
            </div>
            <div className="admin_menucard_cardbody">
                <h5>{product.name}</h5>
                <h6>{product.description}</h6>
                <h6><span>Price</span>-Rs. {product.price}</h6>
            </div>
        </div>
        // <div className="admin_menucard">
        //     <div className="row no-gutters">
        //         <div className="col-md-4">
        //             <FoodImage id={product._id}/>
        //         </div>
        //         <div className="col-md-8">
        //             <div className="card-body">
        //                 <h5 className="card-title">{product.name}</h5>
        //                 <p className="card-text">{product.description}</p>
        //                 <p className="card-text">Price<small className="text-muted">{product.price}</small></p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}
export default AdminMenuCard;