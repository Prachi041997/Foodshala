import React, { useEffect, useState } from 'react';
import { loadCart } from '../../API/CartHelper';
import CartCard from '../../Componets/CartCard/CartCard';
import Nav from '../../Componets/Nav/Nav';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated } from '../../API/Auth/Auth';
import './Cart.css';
import { createOrder } from '../../API/Order/Order';
import image from './empty.png'

var items;
const Cart = ({ history }) => {

    const [cartItems, setCartItems] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        items = loadCart();
        if(items){
            setCartItems(items.food)

        }
    }, [reload])
    const { token, customer } = isAuthenticated();
    const getTotal = () => {
        let amount = 0

        cartItems.map(item => {
            amount = (amount + item.price) * item.quantity
        })
        console.log(amount);
        return amount;
    }

    const finalAmount = () => {
        let amount = getTotal();
        return (amount);
    }

    const placeOrder = () => {
        console.log("hii");
        if (!isAuthenticated() || !isAuthenticated().customer) {
            history.push('/login')
        } else if (isAuthenticated().resturant) {
            console.log('Not customer')
        }
        else {
            // console.log(token, customer)
            console.log(items)
            createOrder(token, items.resturantId, customer.id, { totalprice: getTotal(), products: cartItems })
                .then(data => {
                    console.log(data)
                    if (data.errors) {
                        console.log(data.errors)
                    } else {
                        history.push({
                            pathname: `/ordersuccessful/${data._id}`
                        });
                    }

                }).catch(err => console.log(err))

        }
    }

    const loginAlert = () => {
        console.log(isAuthenticated())
        return !isAuthenticated()  && (
            <Link to="/login">
                <div className="alert alert-danger" role="alert">
                    Login to Place Order Successfully!
         </div>
            </Link>
        )
    }

    const loadPricingDetails = () => {
        return (
            <React.Fragment>
                <table className="table table-borderless">
                    <thead className="thead-light">
                        <tr>

                            <th scope="col">Price Details</th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bag Total</td>
                            <td>Rs {getTotal()}</td>
                        </tr>
                        <tr>
                            <td>Bag Discount</td>
                            <td>0%</td>
                        </tr>
                        <tr>
                            <td>Order Total</td>
                            <td>Rs {getTotal()}</td>
                        </tr>
                        <tr>
                            <td>Delievery Charges</td>
                            <td>Rs 0</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>Rs {finalAmount()}</strong></td>
                        </tr>
                    </tbody>
                </table>
                {loginAlert()}
                <button
                    className="cart_placeorder_btn"
                    onClick={placeOrder}
                >
                    PLACE ORDER
        </button>
            </React.Fragment>
        )
    }

    return <React.Fragment>
        <Nav />
        <div className='cart_container'>
            {cartItems.length === 0 ? <div className='empty_img'>
                <img src={image}></img>
                <h4>Hey! your bag feels light</h4>
                <Link to='/'><button>Add Items</button></Link>
            </div> :
                <React.Fragment>
                    <div className='cart_card_container'>

                        {cartItems.map(item => {
                            return <CartCard product={item}
                                reload={reload}
                                setReload={setReload}
                            />
                        })}
                    </div>
                    <div className='cart_order'>
                        <h2>Place Order</h2>
                        {loadPricingDetails()}
                    </div>
                </React.Fragment>}
        </div>
    </React.Fragment>
}
export default withRouter(Cart);