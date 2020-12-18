import React from 'react';
import { Link } from 'react-router-dom';
import ResturantImage from '../ResturantImage/ResturantImage';
import './ResturantCard.css';
const Card = ({ resturant}) => {
    return (
        <div className="rest_card" >
            <div className='rest_imagediv'>
            <ResturantImage id={resturant._id}/>
             </div>
            
            
            <div className="rest_cardbody">
                <h5>{resturant.name}</h5>
                <h6>{resturant.description}</h6>
                <h6>Rs. {resturant.avgcost} for one</h6>
               <Link to={`/menu/resturant/${resturant._id}`}> <button className='rest_btn rest_menu'>Menu</button></Link>
            </div>
        </div>
    )
}
export default Card;