import React, { useEffect, useState } from 'react';
import { getProductsOfResturant } from '../../API/Product/Product';
import {useParams} from 'react-router-dom'
import Nav from '../../Componets/Nav/Nav';
import Card from '../../Componets/ResturantCard/ResturantCard';
import CustomerMenuCard from '../../Componets/CustomerMenuCard/CustomerMenuCard';
import Modal from '../../Componets/Modal/Modal';
import { addItemToCart, cartEmpty } from '../../API/CartHelper';
const ResturantMenu = ()=> {
    let {resturantId} = useParams();
    const [values, setValues] = useState({
        products:[],
        error: ''
    })
   
  
    useEffect(()=> {
       getProductsOfResturant(resturantId)
       .then(data=> {
           console.log(data)
           if(data.error){
               setValues({...values, error: data.error})
           } else{
               setValues({...values, products: data.products})
           }
       }).catch(err=> console.log(err))
    },[])
  
   
   return (
       <React.Fragment>
           <Nav/>
            <div className='home_card_container'>
           {values.products.map((product)=> {
              return <CustomerMenuCard key={product._id} product={product}
                            />
           }, [])}
           </div>
           
       </React.Fragment>
   )
}
export default ResturantMenu;