import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../API/Auth/Auth';

import { getOrders } from '../../API/Order/Order';
import AdminNav from '../../Componets/AdminNav/AdminNav';
import OrderCard from '../../Componets/OrderCard/OrderCard';
import './Order.css'
const Orders = ()=> {

    const [orders, setOrders] = useState([]);
    const {token, resturant} =isAuthenticated();
    useEffect(()=> {
        getOrders(resturant.id, token)
        .then(data=> {
            console.log(data);
            var objarr = [];
            data.orders.forEach(order=> {
                
                let obj = {
                    products: order.products,
                    totalPrice: order.totalprice,
                    userInfo: {
                        name: order.user_info.name,
                        phone:order.user_info.phone
                    }
                }
                
                objarr.push(obj);
                console.log(objarr)
                
            })
            setOrders(objarr); 
        })
    }, [])
    return (
        <React.Fragment>
            <AdminNav/>
            <div className='admin_order'>
            <h4>Hey, you got these orders pending</h4>
            <h2>Prepare the meal & deliver it to the clients.</h2>
            {orders.map(order=> {
                   return <OrderCard key={order._id} order={order}/>
               })}
            </div>
            
        </React.Fragment>
    )
}
export default Orders;