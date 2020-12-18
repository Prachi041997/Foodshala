import React from 'react';
import { API } from '../../../src/Backend';

const ResturantImage = ({id})=> {
    console.log(id)
    const imageurl = id? `${API}/resturant/photo/${id}` : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

    return(  
        <img src={imageurl} className="card-img"  style={{width:'100%', height:'100%', objectFit:'cover'}}></img>
    )
}
export default ResturantImage;