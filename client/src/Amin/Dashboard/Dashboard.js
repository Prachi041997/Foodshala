import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../API/Auth/Auth';
import { getProductsOfResturant } from '../../API/Product/Product';
import AdminMenuCard from '../../Componets/AdminMenuCard/AdminMenuCard';
import AdminNav from '../../Componets/AdminNav/AdminNav';
import './Dashboard.css'

const AdminDashBoard = ()=> {

    const [values, setValues] = useState({
        products: [],
        error:''
    })

    const {resturant, token} = isAuthenticated()
    useEffect(()=> {
       getProductsOfResturant(resturant.id)
       .then(data=> {
           console.log(data)
           if(data.error){
               setValues({...values, error: data.error})
           } else{
              
               setValues({...values, products: data.products})
           }
       })
    }, [])
   return(
       <React.Fragment>
           <AdminNav/>
           <div className='admin_menucard_container'>
           {values.products.map(product=> {
             return  <React.Fragment>
                 <AdminMenuCard product={product}/>
             </React.Fragment>
           })}
           </div> 
           
           
       </React.Fragment>
   )
}
export default AdminDashBoard;