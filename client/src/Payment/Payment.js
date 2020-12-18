import React from 'react';
import Nav from '../Componets/Nav/Nav';
import image from './confirm.png';
import {Link} from 'react-router-dom'
import './Payment.css';
const OrderSuccess = ()=> {
  return (
    <React.Fragment>
      <Nav/>
      <div className='ordersuccess_container'>
        <img src={image}></img>
        <h1>Order Successfull !</h1>
        <Link to='/'><button>Home</button></Link>
      </div>
    </React.Fragment>
  )
}
export default OrderSuccess;